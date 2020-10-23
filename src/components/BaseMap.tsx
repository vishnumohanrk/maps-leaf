import { LatLngTuple } from 'leaflet';
import React, { useRef } from 'react';
import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';

interface BaseMapCompProps {
  position: LatLngTuple;
  updatePosition: (val: LatLngTuple) => void;
}

const BaseMap: React.FC<BaseMapCompProps> = ({ position, updatePosition }) => {
  const markerRef = useRef<Marker>(null);

  const updatePositionFromMarker = () => {
    const map = markerRef.current;

    if (map) {
      const coordinates = map.leafletElement.getLatLng();
      updatePosition([coordinates.lat, coordinates.lng]);
    }
  };

  return (
    <Map
      center={position}
      zoom={8}
      zoomControl={false}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      <Marker
        draggable
        ref={markerRef}
        position={position}
        ondragend={updatePositionFromMarker}
      >
        <Tooltip>{position.toString()}</Tooltip>
      </Marker>
    </Map>
  );
};

export default BaseMap;
