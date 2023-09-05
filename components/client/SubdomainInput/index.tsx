'use client';

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  type InputProps,
} from '@chakra-ui/react';

export type SubdomainInputProps = Partial<InputProps> & {
  label?: string;
  isOK?: boolean;
};

export const SubdomainInput = ({
  isDisabled,
  label = 'Subdomain',
  value,
  onChange,
  isOK = false,
  ...rest
}: SubdomainInputProps) => {
  return (
    <FormControl isDisabled={isDisabled}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftAddon color="gray">
          <Text>https://</Text>
        </InputLeftAddon>
        <Input {...rest} placeholder="Your subdomain" value={value} onChange={onChange} />
        <InputRightAddon color="gray">
          <Text>.sieutoc.website</Text>
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  );
};
