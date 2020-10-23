import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import InputForm from '../src/components/InputForm';
import MetaHead from '../src/components/MetaHead';
import { defaultCoor } from '../src/utils/constants';
import { TCoorTuple, TSubmit } from '../src/utils/models';

const ClientSideMap = dynamic(() => import('../src/components/BaseMap'), {
  ssr: false,
});

const AppHome: React.FC = () => {
  const [position, setPosition] = useState<TCoorTuple>(defaultCoor);

  const handleSubmit: TSubmit = (value, model) => {
    if (model === 'coor') {
      setPosition(value as TCoorTuple);
    }
  };

  return (
    <>
      <MetaHead />

      <InputForm handleSubmit={handleSubmit} />
      <ClientSideMap position={position} updatePosition={setPosition} />
    </>
  );
};

export default AppHome;
