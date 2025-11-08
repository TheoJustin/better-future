import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from '@/components/garden/providers';
import './globals.css';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Better Future - Web3 Payment System',
  description: 'Secure IDR stablecoin payments with QR codes and NFT receipts on Lisk blockchain',
  keywords: ['web3', 'payment', 'blockchain', 'IDR', 'stablecoin', 'QR code', 'NFT receipts'],
  authors: [{ name: 'BetterFuture Team' }],
  creator: 'BetterFuture',
  publisher: 'BetterFuture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Better Future - Web3 Payment System',
    description: 'Secure IDR stablecoin payments with QR codes and NFT receipts',
    url: 'https://better-future.vercel.app',
    siteName: 'Better Future',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Future - Web3 Payment System',
    description: 'Secure IDR stablecoin payments with QR codes and NFT receipts',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
