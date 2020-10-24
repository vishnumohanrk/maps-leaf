import { useToast } from '@chakra-ui/core';
import dynamic from 'next/dynamic';
import React, { useEffect, useReducer } from 'react';

import MetaHead from '../src/components/MetaHead';
import { defaultCoor } from '../src/utils/constants';
import { simpleCoorToast } from '../src/utils/helperFns';
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
      toast(simpleCoorToast(state.markerLocation));
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
