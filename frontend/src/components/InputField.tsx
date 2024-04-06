import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', value, onChange, isRequired = false }) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} value={value} onChange={onChange} />
    </FormControl>
  );
};

export default InputField;