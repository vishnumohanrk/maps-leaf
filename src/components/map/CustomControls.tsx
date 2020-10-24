import { Divider, Flex } from '@chakra-ui/core';
import React from 'react';

interface CustomControlsCompProps {
  currLoc: React.ReactNode;
  zoomBtns: React.ReactNode;
}

const CustomControls: React.FC<CustomControlsCompProps> = props => {
  const { currLoc: userLocationComp, zoomBtns } = props;

  return (
    <Flex
      direction="column"
      position="absolute"
      bottom="22px"
      right={3}
      zIndex={9999}
    >
      {userLocationComp}
      <Divider h="2px" />
      {zoomBtns}
    </Flex>
  );
};

export default CustomControls;
