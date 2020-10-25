import { TooltipProps } from '@chakra-ui/core';

import { TCoorTuple } from './models';

export const defaultCoor: TCoorTuple = [12.962496, 80.197296];

export const toolTipProps: Omit<TooltipProps, 'children'> = {
  placement: 'left-start',
  zIndex: 9999,
};
