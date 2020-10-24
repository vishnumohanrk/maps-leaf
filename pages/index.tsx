import { useToast } from '@chakra-ui/core';
import dynamic from 'next/dynamic';
import React, { useEffect, useReducer } from 'react';

import MetaHead from '../src/components/MetaHead';
import { defaultCoor } from '../src/utils/constants';
import { latLngDescription } from '../src/utils/helperFns';
import { initialState, myReducer } from '../src/utils/myReducer';

const MapComp = dynamic(() => import('../src/components/map/ClientMap'), {
  ssr: false,
});

const AppHome: React.FC = () => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  const toast = useToast();

  useEffect(() => {
    if (state.markerLocation !== defaultCoor) {
      toast.closeAll();
      toast({
        description: latLngDescription(state.markerLocation),
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast, state.markerLocation]);

  return (
    <>
      <MetaHead />
      <MapComp dispatch={dispatch} state={state} />
    </>
  );
};

export default AppHome;
