import { Icon, IconButton, useToast } from '@chakra-ui/core';
import React from 'react';
import { MdGpsFixed } from 'react-icons/md';

import { TCoorTuple, TSubmit } from '../utils/models';

interface UserLocationCompProps {
  setLoc: TSubmit;
}

const UserLocation: React.FC<UserLocationCompProps> = ({ setLoc }) => {
  const toast = useToast();

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) =>
          setLoc([latitude, longitude] as TCoorTuple, 'coor'),
        error =>
          toast({
            title: 'An error occurred.',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          }),
      );
    }
  };

  return (
    <IconButton
      variant="ghost"
      icon={<Icon as={MdGpsFixed} color={'gray.700'} />}
      aria-label="Show My Location"
      title="Show My Location"
      onClick={handleClick}
    />
  );
};

export default UserLocation;
