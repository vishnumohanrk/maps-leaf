import { Box, Button, Portal, useToast } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

import { TCoor, TCtxMenu } from '../utils/types';
import MyMapControls from './MyMapControls';

interface MyMapEventsProps {
  router: NextRouter;
}

const MyMapEvents = ({ router }: MyMapEventsProps) => {
  const { replace } = router;

  const toast = useToast();
  const [markerPos, setMarkerPos] = useState<TCoor | null>(null);
  const [ctxMenu, setCtxMenu] = useState<TCtxMenu | null>(null);
  const map = useMapEvents({
    zoomend() {
      updateDets();
    },
    moveend() {
      updateDets();
    },
    movestart() {
      if (markerPos) setMarkerPos(null);
      if (ctxMenu) setCtxMenu(null);
    },
    contextmenu({ originalEvent, latlng: { lat, lng } }) {
      originalEvent.preventDefault();

      const { pageX, pageY } = originalEvent;
      const x = pageX > document.body.clientWidth - 131.75 ? pageX - 131.75 : pageX;
      const y = pageY > document.body.clientHeight - 48 ? pageY - 48 : pageY;

      setCtxMenu({ x, y, coor: [lat, lng] });
    },
    click() {
      if (ctxMenu) setCtxMenu(null);
    },
    resize() {
      if (ctxMenu) setCtxMenu(null);
    },
  });

  useEffect(() => {
    toast.closeAll();
    if (markerPos) {
      toast({ description: `Lat: ${markerPos[0]}, Lon: ${markerPos[1]}`, status: 'info', isClosable: true });
    }
  }, [markerPos]);

  const updateDets = () => {
    const newZoomLevel = map.getZoom();
    const { lat, lng } = map.getCenter();
    replace({ query: { lat, lng, zoom: newZoomLevel } });
  };

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  const z = (n: number) => map.flyTo(map.getCenter(), n);

  const moveToUserLoc = () => {
    if (!navigator.geolocation) {
      toast({ description: 'Geolocation Not supported', status: 'error' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        map.flyTo({ lat, lng }, 16);
        setMarkerPos([lat, lng]);
      },
      ({ message }) => toast({ description: message, status: 'error' }),
    );
  };

  const handleCtxMenu = () => {
    if (ctxMenu) {
      setMarkerPos(ctxMenu.coor);
      setCtxMenu(null);
    }
  };

  return (
    <>
      {markerPos && (
        <Marker position={markerPos}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      <Portal>
        <MyMapControls
          userLoc={moveToUserLoc}
          mapZoom={z}
          zoomLevel={map.getZoom()}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        />
        {ctxMenu && (
          <Box
            boxShadow="lg"
            borderRadius="lg"
            py={1}
            top={ctxMenu.y}
            left={ctxMenu.x}
            bgColor="white"
            position="absolute"
            zIndex={999}
          >
            <Button onClick={handleCtxMenu} variant="ghost" borderRadius={0}>
              {`What's`} Here ?
            </Button>
          </Box>
        )}
      </Portal>
    </>
  );
};

export default MyMapEvents;
