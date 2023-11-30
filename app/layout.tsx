import { Metadata } from 'next';

import { Providers } from './components';

const title = 'Sieutoc';
const description = 'Create modern apps in minutes!';
const image = '';

export const metadata: Metadata = {
  title,
  description,
  icons: [''],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@vercel',
  },
  metadataBase: new URL('https://vercel.pub'),
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
