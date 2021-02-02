import { Portal } from '@react-md/portal';
import { NextRouter } from 'next/router';
import { useMapEvents } from 'react-leaflet';

import MyMapControls from './MyMapControls';

interface MyMapEventsProps {
  router: NextRouter;
}

const MyMapEvents = ({ router }: MyMapEventsProps) => {
  const { replace } = router;
  const map = useMapEvents({
    zoom() {
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

  return (
    <Portal intoId="__next">
      <MyMapControls zoomLevel={map.getZoom()} zoomIn={zoomIn} zoomOut={zoomOut} />
    </Portal>
  );
};

export default MyMapEvents;
