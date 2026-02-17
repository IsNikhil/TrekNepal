import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Trek Nepal — Discover Your Next Adventure',
  description: 'The most accurate, reliable, and intelligent trekking companion for Nepal. Explore Everest Base Camp, Annapurna Circuit, Manaslu, and 100+ routes.',
  keywords: 'Nepal trekking, Everest Base Camp, Annapurna Circuit, Himalaya hiking, trek guide Nepal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
