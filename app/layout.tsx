import { LAYOUT_METADATA } from '@/lib/metadata';
import SEO from './seo';
import '@/stylesheets/globals.css';
import type { Metadata } from 'next';
import { MontserratFont } from '@/lib/font';
import Navbar from '@/components/layout/navbar';
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

export const metadata: Metadata = LAYOUT_METADATA;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      <body className={`${MontserratFont} antialiased`}>
        <SEO />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
