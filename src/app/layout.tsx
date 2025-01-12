import WebVitals from '@/components/features/web-vitals';
import { META_DATA_DEFAULT } from '@/constants/seo.constant';

import '@/styles/global.style.css';

import { Open_Sans } from 'next/font/google';
import { cn } from '@/helpers/tailwind.helper';
import SolanaWalletsStore from '@/stores/solana-wallets.store';
import NextTopLoader from 'nextjs-toploader';

import ReactQueryStore from '../stores/react-query.store';

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
        <SolanaWalletsStore>
          <ReactQueryStore>{children}</ReactQueryStore>
        </SolanaWalletsStore>
      </body>
    </html>
  );
};

export default RootLayout;
