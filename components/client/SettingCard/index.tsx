import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@/components/chakra';

export type SettingCardProps = {
  title?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  onRemove?: () => void;
};

export const SettingCard = ({ title, value, onChange, onRemove }: SettingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">{title}</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>Props name:</FormLabel>
          <Input value={value} onChange={(e) => onChange && onChange(e.target.value)} />
        </FormControl>
      </CardBody>
      <CardFooter paddingTop={0} justify="end">
        <Button size="sm" onClick={onRemove}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
