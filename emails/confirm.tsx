import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { BASE_URL } from '@/lib/constants';
import * as React from 'react';

type ConfirmationEmailProps = {
  confirmCode: string;
  email: string;
};

export const ConfirmationEmail = ({ email, confirmCode }: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Xác nhận địa chỉ email</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Xác nhận địa chỉ email</Heading>
        <Link
          href={`${BASE_URL}/confirm?email=${email}&confirm-code=${confirmCode}`}
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Nhấn vào đây để xác thực địa chỉ email của bạn
        </Link>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Or, copy and paste this temporary login code:
        </Text>
        <code style={code}>{confirmCode}</code>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          If you didn&apos;t try to login, you can safely ignore this email.
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }}
        >
          Hint: You can set a permanent password in Settings & members → My account.
        </Text>
        <Img
          src={`${BASE_URL}/static/lvvai-logo.png`}
          width="32"
          height="32"
          alt="LamViecVoiAI Logo"
        />
        <Text style={footer}>
          <Link
            href="https://lamviecvoiai.com"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            LamViecVoiAI.com
          </Link>
          <br />
          for your notes, tasks, wikis, and databases.
        </Text>
      </Container>
    </Body>
  </Html>
);

ConfirmationEmail.PreviewProps = {
  email: 'test@example.com',
  confirmCode: '6n1s5zc3cyppvear2j6twy3scbeqgtfv',
} as ConfirmationEmailProps;

export default ConfirmationEmail;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

const code = {
  display: 'inline-block',
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};
