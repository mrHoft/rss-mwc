import React from 'react';
import Header from '~/components/header/Header.tsx';
import Footer from '~/components/footer/Footer';
import Backdop from '~/components/backdop/Backdop.tsx';
import Message from '~/components/message/message.tsx';
import Loader from '~/components/loader/Loader';

import '~/styles/global.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MW Characters',
  description: 'Monkey wrench Characters',
  icons: {
    icon: '/favicon.png',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={''}>
        <Header />
        <main className="main">
          <Backdop />
          {children}
        </main>
        <Footer />
        <Message />
        <Loader />
      </body>
    </html>
  );
}
