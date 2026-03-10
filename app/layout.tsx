import SEO from './seo';
import '@/stylesheets/globals.css';
import type { Metadata } from 'next';
import { InterClassName } from '@/lib/font';
import { LAYOUT_METADATA } from '@/lib/metadata';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ClientLayout from '@/components/common/ClientLayout';

export const metadata: Metadata = LAYOUT_METADATA;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${InterClassName} antialiased`}>
        <SEO />
        <ClientLayout>
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
