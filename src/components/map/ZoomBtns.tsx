import { Flex, IconButton, Tooltip } from '@chakra-ui/core';
import React from 'react';
import { MdAdd, MdRemove } from 'react-icons/md';

import { toolTipProps } from '../../utils/constants';
import { TZoom } from '../../utils/models';

interface ZoomBtnsCompProps {
  zoom: TZoom;
}

const ZoomBtns: React.FC<ZoomBtnsCompProps> = ({ zoom }) => (
  <Tooltip label="Zoom" {...toolTipProps}>
    <Flex direction="column">
      <IconButton
        aria-label="Zoom In"
        size="sm"
        icon={<MdAdd color={'gray.700'} />}
        roundedBottom={0}
        borderBottomWidth="2px"
        borderColor="#CBD5E0"
        onClick={() => zoom('in')}
      />

      <IconButton
        aria-label="Zoom Out"
        size="sm"
        icon={<MdRemove color={'gray.700'} />}
        roundedTop={0}
        onClick={() => zoom('out')}
      />
    </Flex>
  </Tooltip>
);

// TODO: Vertical Zoom slider

export default ZoomBtns;
