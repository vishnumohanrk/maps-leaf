import { TCoorTuple } from './models';

export const latLngDescription = (val: TCoorTuple): string =>
  `${val[0].toFixed(5)}, ${val[1].toFixed(5)}`;
