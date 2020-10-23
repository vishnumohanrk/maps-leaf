import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { MdGpsFixed, MdSearch } from 'react-icons/md';

import { TSubmit } from '../utils/models';

interface InputFormCompProps {
  handleSubmit: TSubmit;
}

const InputForm: React.FC<InputFormCompProps> = ({ handleSubmit }) => {
  const [value, setValue] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);

  const onSubmit = () => {
    if (value) {
      const splitted = value.split(',').map(Number).slice(0, 2);

      if (splitted.every(i => typeof i === 'number')) {
        handleSubmit(splitted as [number, number], 'coor');
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
        <IconButton
          variant="ghost"
          icon={<Icon as={MdGpsFixed} color={'gray.700'} />}
          aria-label="Show My Location"
          title="Show My Location"
          onClick={console.log}
        />
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
