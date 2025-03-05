import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import Backdop from '~/components/backdop/Backdop';
import Message from '~/components/message/message';
import Loader from '~/components/loader/Loader';
import BusyCat from '~/components/busycat/BusyCat';
import Sidebar from '~/components/sidebar/Sidebar';

import '~/styles/global.css';

export const meta = () => [{ title: 'MW Characters' }, { name: 'description', content: 'Monkey wrench Characters' }];

export const links: Route.LinksFunction = () => [{ rel: 'icon', href: '/favicon.png' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Sidebar />
        <main className="main">
          <Backdop />
          {children}
          <BusyCat />
        </main>
        <Footer />
        <Message />
        <Loader />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Error';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <textarea readOnly value={stack} rows={20} cols={50} />}
    </div>
  );
}
