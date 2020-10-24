import { IconButton, Tooltip, useToast } from '@chakra-ui/core';
import React from 'react';
import { MdGpsFixed } from 'react-icons/md';

import { toolTipProps } from '../../utils/constants';
import { TDispatch } from '../../utils/myReducer';

interface CurrentLocationCompProps {
  dispatch: TDispatch;
}

const CurrentLocation: React.FC<CurrentLocationCompProps> = props => {
  const { dispatch } = props;
  const toast = useToast();

  const handleClick = () => {
    toast.closeAll();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) =>
          dispatch({
            type: 'setUserLocation',
            payload: [lat, lng],
          }),
        ({ message: description }) =>
          toast({
            status: 'error',
            isClosable: true,
            duration: 5000,
            description,
          }),
      );
    }
  };

  return (
    <Tooltip label="Your Location" {...toolTipProps}>
      <IconButton
        aria-label="Your Location"
        size="sm"
        icon={<MdGpsFixed color={'gray.700'} />}
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default CurrentLocation;
