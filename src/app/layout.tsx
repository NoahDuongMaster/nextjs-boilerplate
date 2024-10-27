import WebVitals from '@/components/features/web-vitals';
import { META_DATA_DEFAULT } from '@/shared/seo.shared';

import '@shared/styles.shared.css';

import dynamic from 'next/dynamic';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/common/header';
import NextUIStore from '@/stores/nextui.store';
import SolanaWalletsStore from '@/stores/solana-wallets.store';
import { cn } from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';

const SonnerToaster = dynamic(() => import('@/components/common/toast/sonner'));

const fontSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

export const metadata = META_DATA_DEFAULT;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased bg-gray-100',
          fontSans.variable,
        )}
      >
        <WebVitals />
        <NextTopLoader />
        <NextUIStore>
          <SolanaWalletsStore>
            <Header />
            {children}
          </SolanaWalletsStore>
        </NextUIStore>
        <SonnerToaster />
      </body>
    </html>
  );
};

export default RootLayout;
