import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { queryParamToNum } from '../utils';
import { TCoor } from '../utils/types';
import MyMapEvents from './MyMapEvents';

const MyMap = () => {
  const router = useRouter();
  const { zoom, lat, lng } = router.query;

  const coordinates: TCoor = [queryParamToNum(lat), queryParamToNum(lng)];
  const zoomLevel = queryParamToNum(zoom);

  useEffect(() => {
    router.replace({ query: { lat: coordinates[0], lng: coordinates[1], zoom: zoomLevel } });
  }, []);

  return (
    <MapContainer style={{ width: '100vw', height: '100vh' }} center={coordinates} zoomControl={false} zoom={zoomLevel}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMapEvents router={router} />
    </MapContainer>
  );
};

export default MyMap;
