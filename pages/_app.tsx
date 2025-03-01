import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '~/components/layout/layout';
import { ContextProvider } from '~/entities/context.tsx';

import '~/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>MW Characters</title>
      </Head>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </>
  );
}
