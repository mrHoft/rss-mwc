import React from 'react';
import Header from '~/components/header/Header.tsx';
import Footer from '../footer/Footer';
import Backdop from '~/components/backdop/Backdop.tsx';
import Message from '~/components/message/message.tsx';
import { Context } from '~/entities/context.tsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = React.useState('theme light');
  const { theme } = React.useContext(Context);

  React.useEffect(() => {
    // TOOD: remove this stupid action, that was added to avoid "DOM manipulations"
    if (theme) setThemeName(`theme ${theme}`);
  }, [theme]);

  return (
    <div className={themeName}>
      <Header />
      <main className="main">
        <Backdop />
        {children}
      </main>
      <Footer />
      <Message />
    </div>
  );
}
