import { Box, Button, useToast } from '@chakra-ui/core';
import { LeafletMouseEvent } from 'leaflet';
import React from 'react';

interface ContextMenuCompProps {
  event: LeafletMouseEvent | undefined;
  isVisible: boolean;
}

const ContextMenu: React.FC<ContextMenuCompProps> = props => {
  const { event, isVisible } = props;

  const toast = useToast();

  const description = `Latitude: ${event?.latlng.lat}, Longitude: ${event?.latlng.lng}`;

  const triggerToast = () => {
    toast.closeAll();
    toast({
      isClosable: true,
      status: 'info',
      duration: null,
      description,
    });
  };

  return (
    <Box
      rounded={'lg'}
      d={isVisible && event ? 'inline-block' : 'none'}
      position="absolute"
      bgColor="white"
      top={event?.originalEvent.pageY}
      left={event?.originalEvent.pageX}
      zIndex={9999}
      py={1}
    >
      <Button variant="ghost" size="sm" onClick={triggerToast}>
        {"What's"} Here ?
      </Button>
    </Box>
  );
};

export default ContextMenu;
