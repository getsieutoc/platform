import { Box, Heading, Stack, Tag, TagCloseButton, TagLabel } from '@/components/chakra';
import { SettingCard } from '../SettingCard';

export const Settings = () => {
  return (
    <Stack borderTop="none" borderWidth="1px" borderColor="whiteAlpha.200" padding={2}>
      <Heading size="sm">Settings</Heading>

      <Box>
        <Heading size="xs">Selected</Heading>

        <Tag size="sm" borderRadius="full" variant="solid" colorScheme="green">
          <TagLabel>Green</TagLabel>
          <TagCloseButton />
        </Tag>
      </Box>

      <SettingCard title="Component 1" />
    </Stack>
  );
};
