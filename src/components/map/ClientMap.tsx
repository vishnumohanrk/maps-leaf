import React, { useRef } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { TZoom } from '../../utils/models';
import { IMyState, TDispatch } from '../../utils/myReducer';
import CurrentLocation from './CurrentLocation';
import CustomControls from './CustomControls';
import ZoomBtns from './ZoomBtns';

interface ClientMapCompProps {
  state: IMyState;
  dispatch: TDispatch;
}

const ClientMap: React.FC<ClientMapCompProps> = props => {
  const { state, dispatch } = props;
  const markerRef = useRef<Marker>(null);
  const mapRef = useRef<Map>(null);

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
    <Map
      ref={mapRef}
      center={state.markerLocation}
      zoom={12}
      zoomControl={false}
      style={{ width: '100vw', height: '100vh' }}
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
      <CustomControls
        currLoc={<CurrentLocation dispatch={dispatch} />}
        zoomBtns={<ZoomBtns zoom={zoom} />}
      />
    </Map>
  );
};

export default ClientMap;
