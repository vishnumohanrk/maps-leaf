import { LatLngTuple } from 'leaflet';

export type TSubmit = (
  val: LatLngTuple | string,
  model: 'coor' | 'normal',
) => void;
