import { UseToastOptions } from '@chakra-ui/core';

import { TCoorTuple } from './models';

export const latLngDescription = (val: TCoorTuple): string =>
  `${val[0].toFixed(5)}, ${val[1].toFixed(5)}`;

export const simpleCoorToast = (val: TCoorTuple): UseToastOptions => ({
  description: latLngDescription(val),
  duration: 5000,
  status: 'info',
  isClosable: true,
});
