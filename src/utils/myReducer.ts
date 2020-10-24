import { defaultCoor } from './constants';
import { TCoorTuple } from './models';

export interface IMyState {
  userLocation: TCoorTuple | null;
  markerLocation: TCoorTuple;
}

type TActionType =
  | { type: 'updateMarkerLocation'; payload: TCoorTuple }
  | { type: 'setUserLocation'; payload: TCoorTuple };

export type TDispatch = (val: TActionType) => void;

export const initialState: IMyState = {
  userLocation: null,
  markerLocation: defaultCoor,
};

export const myReducer = (state: IMyState, action: TActionType): IMyState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        markerLocation: action.payload,
        userLocation: action.payload,
      };
    case 'updateMarkerLocation':
      return { ...state, markerLocation: action.payload };
    default:
      throw new Error();
  }
};
