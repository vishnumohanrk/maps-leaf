import { IconButton, Tooltip, useToast } from '@chakra-ui/core';
import React from 'react';
import { MdGpsFixed } from 'react-icons/md';

import { toolTipProps } from '../../utils/constants';
import { TCoorTuple } from '../../utils/models';
import { TDispatch } from '../../utils/myReducer';

interface CurrentLocationCompProps {
  dispatch: TDispatch;
  moveMapTo: (val: TCoorTuple) => void;
}

const CurrentLocation: React.FC<CurrentLocationCompProps> = props => {
  const { dispatch, moveMapTo } = props;
  const toast = useToast();

  const handleClick = () => {
    toast.closeAll();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          dispatch({
            type: 'setUserLocation',
            payload: [lat, lng],
          }),
            moveMapTo([lat, lng]);
        },
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
