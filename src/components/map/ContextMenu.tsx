import { Box, Button } from '@chakra-ui/core';
import { LeafletMouseEvent } from 'leaflet';
import React from 'react';

interface ContextMenuCompProps {
  eventObj: LeafletMouseEvent;
  trigger: (e: LeafletMouseEvent) => void;
}

const ContextMenu: React.FC<ContextMenuCompProps> = ({ eventObj, trigger }) => (
  <Box
    rounded={'lg'}
    d="inline-block"
    position="absolute"
    bgColor="white"
    top={eventObj.originalEvent.pageY}
    left={eventObj.originalEvent.pageX}
    zIndex={9999}
    py={1}
  >
    <Button
      rounded={0}
      variant="ghost"
      size="sm"
      onClick={() => trigger(eventObj)}
    >
      {"What's"} Here?
    </Button>
  </Box>
);

export default ContextMenu;
