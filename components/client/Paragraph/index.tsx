import { Text, TextProps } from '@/components/chakra';

export type ParagraphProps = TextProps;

export const Paragraph = (p: ParagraphProps) => (
  <Text as="p" marginTop={4} marginBottom={2} {...p} />
);
