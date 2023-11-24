import { Providers } from '@/components/client';
import { Metadata } from 'next';

const title = 'Website Sieutoc – Thiet ke website sieu toc';
const description = 'Create modern website in minutes!';
const image = 'https://vercel.pub/thumbnail.png';

export const metadata: Metadata = {
  title,
  description,
  icons: ['https://vercel.pub/favicon.ico'],
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
