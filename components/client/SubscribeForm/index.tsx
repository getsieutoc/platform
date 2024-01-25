'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@/components/chakra';
import { useColorModeValue, useState, useToast } from '@/hooks';
import { HttpMethod, SubscribeResponse } from '@/types';
import { NextLink } from '@/components/client';
import { fetcher } from '@/lib/fetcher';

export type SubscribeFormProps = {
  lists: { id: number; uuid: string }[];
  heading?: string;
  rich?: boolean;
};

export const SubscribeForm = ({
  heading = 'Subscribe for updates',
  lists,
  rich = false,
}: SubscribeFormProps) => {
  const inputBgColor = useColorModeValue('gray.100', 'gray.800');

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!email || !name) return;

    const response = await fetcher<SubscribeResponse>('/api/mailinglist/subscribers', {
      method: HttpMethod.POST,
      body: JSON.stringify({
        lists: lists.map(({ id }) => id),
        name: name ? name : 'no-name',
        status: 'enabled',
        email,
      }),
    });

    if (response.data) {
      toast({ description: 'Successfully subscribed! Please check your mailbox' });
    } else {
      toast({ description: 'Something wrong, please contact support', status: 'error' });
    }
  };

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      alignItems="center"
      maxW="container.xl"
      gap={6}
      my={8}
    >
      <Stack spacing={0} textAlign="center">
        <Heading fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" as="h3">
          {heading}
        </Heading>

        <Text fontSize="sm">
          We will not spam, we promise. Read our{' '}
          <Button as={NextLink} size="sm" variant="link" href="/privacy">
            Privacy Policy.
          </Button>
        </Text>
      </Stack>

      <Stack
        direction={{ base: 'column', ...(rich ? { lg: 'row' } : { sm: 'row' }) }}
        width={{ base: '100%', md: 'auto' }}
      >
        {rich && (
          <FormControl maxWidth={{ base: '100%', lg: '240px' }}>
            <FormLabel>Name</FormLabel>
            <Input
              onChange={(e) => setName(e.target.value)}
              focusBorderColor="brand.500"
              bgColor={inputBgColor}
              value={name}
              name="name"
              size="lg"
            />
          </FormControl>
        )}

        <FormControl maxWidth={{ base: '100%', lg: '240px' }}>
          <FormLabel hidden={!rich}>Subscribe</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="brand.500"
            bgColor={inputBgColor}
            value={email}
            type="email"
            size="lg"
          />
        </FormControl>

        <Button
          alignSelf={{ base: 'auto', lg: rich ? 'end' : 'center' }}
          mt={{ base: 4, ...(rich ? { lg: 0 } : { sm: 0 }) }}
          data-ph-capture-attribute-subscribe-form={email}
          width={{ base: '100%', sm: 'auto' }}
          onClick={handleSubscribe}
          colorScheme="brand"
          size="lg"
        >
          Subscribe
        </Button>
      </Stack>
    </Flex>
  );
};
