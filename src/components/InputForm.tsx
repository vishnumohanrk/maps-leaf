import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

import { TCoorTuple, TSubmit } from '../utils/models';
import UserLocation from './UserLocation';

interface InputFormCompProps {
  handleSubmit: TSubmit;
}

const InputForm: React.FC<InputFormCompProps> = ({ handleSubmit }) => {
  const [value, setValue] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const onSubmit = () => {
    if (value) {
      const splitted = value.split(/,/g).map(Number).slice(0, 2);

      if (splitted.every(i => !isNaN(i))) {
        handleSubmit(splitted as TCoorTuple, 'coor');
        return;
      }

      handleSubmit(value, 'normal');
      return;
    }
  };

  return (
    <InputGroup
      w={{ sm: 2 / 3, md: 2 / 5, xl: 1 / 4 }}
      position="absolute"
      boxShadow={'xl'}
      top={4}
      left={4}
      zIndex={9999}
    >
      <InputLeftElement>
        <UserLocation setLoc={handleSubmit} />
      </InputLeftElement>
      <Input
        bgColor="white"
        placeholder="Search..."
        value={value}
        onChange={handleInput}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          type="submit"
          icon={<Icon as={MdSearch} color={'gray.700'} />}
          aria-label="Search"
          title="Search"
          onClick={onSubmit}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputForm;
