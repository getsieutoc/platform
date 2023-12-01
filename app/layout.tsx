import { Metadata } from 'next';
import { Providers } from './components';

export const metadata: Metadata = {
  title: 'Sieutoc',
  description: 'Create modern apps in minutes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
