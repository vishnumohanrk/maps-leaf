import { useToast } from '@chakra-ui/core';
import { LeafletMouseEvent } from 'leaflet';
import React, { useRef, useState } from 'react';
import { CircleMarker, Map, Marker, TileLayer } from 'react-leaflet';

import { simpleCoorToast } from '../../utils/helperFns';
import { TCoorTuple, TZoom } from '../../utils/models';
import { IMyState, TDispatch } from '../../utils/myReducer';
import ContextMenu from './ContextMenu';
import CurrentLocation from './CurrentLocation';
import CustomControls from './CustomControls';
import ZoomBtns from './ZoomBtns';

interface ClientMapCompProps {
  state: IMyState;
  dispatch: TDispatch;
}

const ClientMap: React.FC<ClientMapCompProps> = props => {
  const [miniMarker, setMiniMarker] = useState<TCoorTuple | null>(null);
  const [mapE, setMapE] = useState<LeafletMouseEvent | null>(null);
  const toast = useToast();

  const { state, dispatch } = props;
  const markerRef = useRef<Marker>(null);
  const mapRef = useRef<Map>(null);

  const reset = () => {
    toast.closeAll();
    setMapE(null);
    setMiniMarker(null);
  };

  const updateMiniMarker = (e: LeafletMouseEvent) => {
    if (miniMarker && !mapE) {
      reset();
      return;
    }
    reset();
    const { lat, lng } = e.latlng;
    toast({ ...simpleCoorToast([lat, lng]), duration: null });
    setMiniMarker([lat, lng]);
    return;
  };

  const updateMarker = () => {
    const pos = markerRef.current;
    if (pos) {
      const { lat, lng } = pos.leafletElement.getLatLng();
      dispatch({ type: 'updateMarkerLocation', payload: [lat, lng] });
    }
  };

  const zoom: TZoom = val => {
    const mapElem = mapRef.current;
    if (mapElem) {
      val === 'in'
        ? mapElem.leafletElement.zoomIn()
        : mapElem.leafletElement.zoomOut();
    }
  };

  return (
    <>
      <Map
        useFlyTo
        ref={mapRef}
        center={state.markerLocation}
        zoom={12}
        zoomControl={false}
        style={{ width: '100vw', height: '100vh' }}
        onmovestart={reset}
        onclick={updateMiniMarker}
        oncontextmenu={setMapE}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          draggable
          alt="Draggable Map Marker"
          ref={markerRef}
          position={state.markerLocation}
          ondragend={updateMarker}
        />
        {miniMarker && <CircleMarker center={miniMarker} radius={8} />}
      </Map>

      <CustomControls
        currLoc={<CurrentLocation dispatch={dispatch} />}
        zoomBtns={<ZoomBtns zoom={zoom} />}
      />
      {mapE && <ContextMenu eventObj={mapE} trigger={updateMiniMarker} />}
    </>
  );
};

export default ClientMap;
