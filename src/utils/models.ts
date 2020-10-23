export type TCoorTuple = [number, number];

export type TSubmit = (
  val: TCoorTuple | string,
  model: 'coor' | 'normal',
) => void;
