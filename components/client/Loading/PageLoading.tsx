import { Center, Spinner } from '@/components/chakra';

export const PageLoading = () => {
  return (
    <Center width="100%" height="100%">
      <Spinner emptyColor="white" color="brand.500" speed="0.3s" size="xl" />
    </Center>
  );
};
