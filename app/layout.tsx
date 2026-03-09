import { LAYOUT_METADATA } from '@/lib/metadata';
import SEO from './seo';
import '@/stylesheets/globals.css';
import type { Metadata } from 'next';
import { MontserratFont } from '@/lib/font';
import Navbar from '@/components/layout/navbar';

export const metadata: Metadata = LAYOUT_METADATA;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${MontserratFont} antialiased`}>
        <SEO />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
