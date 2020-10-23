import { LeafletMouseEvent } from 'leaflet';
import React, { useRef, useState } from 'react';
import { Map, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';

import { TCoorTuple } from '../utils/models';
import ContextMenu from './ContextMenu';

interface BaseMapCompProps {
  position: TCoorTuple;
  updatePosition: (val: TCoorTuple) => void;
}

const BaseMap: React.FC<BaseMapCompProps> = ({ position, updatePosition }) => {
  const [isCtxMenuVisible, setIsCtxMenuVisible] = useState<boolean>(false);
  const [mapE, setMapE] = useState<LeafletMouseEvent | undefined>();

  const markerRef = useRef<Marker>(null);

  const updatePositionFromMarker = () => {
    const mapp = markerRef.current;

    if (mapp) {
      const { lat, lng } = mapp.leafletElement.getLatLng();
      updatePosition([lat, lng]);
    }
  };

  const triggerCtxMenu = (e: LeafletMouseEvent) => {
    setIsCtxMenuVisible(true);
    setMapE(e);
  };

  const turnOffCtxMenu = () => {
    if (isCtxMenuVisible) {
      setIsCtxMenuVisible(false);
    }
  };

  return (
    <Map
      center={position}
      zoom={12}
      zoomControl={false}
      oncontextmenu={triggerCtxMenu}
      onclick={turnOffCtxMenu}
      onmovestart={turnOffCtxMenu}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ContextMenu event={mapE} isVisible={isCtxMenuVisible} />
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
