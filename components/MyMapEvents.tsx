import { Portal } from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import { useMapEvents } from 'react-leaflet';

import MyMapControls from './MyMapControls';

interface MyMapEventsProps {
  router: NextRouter;
}

const MyMapEvents = ({ router }: MyMapEventsProps) => {
  const { replace } = router;
  const map = useMapEvents({
    zoomend() {
      updateDets();
    },
    moveend() {
      updateDets();
    },
  });

  const updateDets = () => {
    const newZoomLevel = map.getZoom();
    const { lat, lng } = map.getCenter();
    replace({ query: { lat, lng, zoom: newZoomLevel } });
  };

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  const z = (n: number) => map.flyTo(map.getCenter(), n);

  return (
    <Portal>
      <MyMapControls mapZoom={z} zoomLevel={map.getZoom()} zoomIn={zoomIn} zoomOut={zoomOut} />
    </Portal>
  );
};

export default MyMapEvents;
