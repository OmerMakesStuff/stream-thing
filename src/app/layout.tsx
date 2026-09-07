import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { Toaster } from '@/components/ui/Toast';
import { Provider } from '@/components/providers';

import '@/styles/index.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: 'Stream Thing',
  description: 'This is definitely not Twitch.',
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang='en' className={manrope.variable}>
    <body>
      <Provider>
        {children}
        <Toaster />
      </Provider>
    </body>
  </html>
);

export default RootLayout;
