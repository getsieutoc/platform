import {
  Button,
  Box,
  Center,
  FormControl,
  FormControlProps,
  FormLabel,
  Image,
  InputProps,
  Stack,
  CloseButton,
  Text,
  VisuallyHiddenInput,
  Wrap,
  WrapItem,
} from '@/components/chakra';
import { useColorModeValue, useId } from '@/hooks';
import { AddIcon, CheckIcon, DeleteIcon } from '@/icons';

import { useDropInput } from './use-drop-input';

export const compareFiles = (current: File, target: File) => {
  return (
    current.name === target.name &&
    current.type === target.type &&
    current.size === target.size
  );
};

export type DropInputProps = {
  height?: FormControlProps['height'];
  width?: FormControlProps['width'];
  label?: string;
  onFiles: (files: File[]) => void;
  files: File[];
  uploaded?: string[];
  fileTypes?: string[];
} & Omit<InputProps, 'onChange'>;

export const DropInput = ({
  multiple = true,
  width = '100%',
  height,
  label,
  files,
  onFiles,
  uploaded,
  fileTypes,
  ...rest
}: DropInputProps) => {
  const { isOver, inputRef, ...bond } = useDropInput({
    onFiles: (fileList) => {
      const selectedFiles = fileList ? Array.from(fileList) : [];
      onFiles(selectedFiles);
    },
  });

  // We need this to avoid onDragLeave happens on children elements
  const pointerEvents = isOver ? 'none' : 'auto';

  const colors = useColorModeValue(
    {
      borderNormal: 'gray.200',
      borderDrag: 'green.200',
      bgColor: 'blackAlpha.50',
      bgButton: 'gray.200',
    },
    {
      borderNormal: 'gray.600',
      borderDrag: 'green.600',
      bgColor: 'whiteAlpha.50',
      bgButton: 'gray.800',
    }
  );

  const fieldId = useId();

  return (
    <FormControl id={`${fieldId}-drop-input`}>
      {label && <FormLabel pointerEvents="none">{label}</FormLabel>}

      <VisuallyHiddenInput
        id={`${fieldId}-drop-input`}
        multiple={multiple}
        ref={inputRef}
        type="file"
        {...rest}
      />

      <Center
        {...bond}
        as={FormControl}
        minHeight="200px"
        width={width}
        height={height}
        padding={4}
        flexDirection="column"
        borderWidth="2px"
        borderStyle="dashed"
        borderRadius="md"
        borderColor={isOver ? colors.borderDrag : colors.borderNormal}
        bg={colors.bgColor}
        gap={2}
      >
        {files.length === 0 && (
          <>
            <Text fontSize="sm" pointerEvents={pointerEvents}>
              {isOver ? 'Drop it!' : 'Select or drag files here to upload'}
            </Text>

            {fileTypes && (
              <Text fontSize="sm" pointerEvents={pointerEvents}>
                {`Accept file types: ${fileTypes.join(', ')}`}
              </Text>
            )}
          </>
        )}

        <Wrap justify="center" spacing={4} pointerEvents={pointerEvents}>
          {files.map((file, index) => (
            <WrapItem key={`${file.name}-${index}`}>
              <Box maxW={28} position="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  objectFit="cover"
                  alt={file.name}
                  boxSize={28}
                />
                {uploaded?.includes(file.name) ? (
                  <CheckIcon
                    bg={colors.bgButton}
                    position="absolute"
                    borderRadius="md"
                    color="green.500"
                    boxSize={6}
                    padding={1}
                    right={1}
                    top={1}
                  />
                ) : (
                  <CloseButton
                    onClick={() => {
                      const remainedFiles = files.filter((o) => !compareFiles(o, file));
                      onFiles(remainedFiles);
                    }}
                    bg={colors.bgButton}
                    position="absolute"
                    size="sm"
                    right={1}
                    top={1}
                  />
                )}

                <Text fontSize="xs" noOfLines={1}>
                  {file.name}
                </Text>
              </Box>
            </WrapItem>
          ))}
        </Wrap>

        <Stack direction="row" marginY={2} pointerEvents={pointerEvents}>
          <Button
            onClick={() => {
              if (inputRef && inputRef.current) {
                inputRef.current.click();
              }
            }}
            pointerEvents={pointerEvents}
            leftIcon={<AddIcon />}
            colorScheme="green"
          >
            Select Files
          </Button>

          {files.length > 0 && (
            <Button
              pointerEvents={pointerEvents}
              onClick={() => onFiles([])}
              leftIcon={<DeleteIcon />}
              colorScheme="red"
            >
              Discard All
            </Button>
          )}
        </Stack>
      </Center>
    </FormControl>
  );
};
