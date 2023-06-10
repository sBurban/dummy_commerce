import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react';
// import { NavBar } from '@/components/menus/NavBar';
import { StoreLayout } from '@/components/layouts/StoreLayout';
import CenteredWrapper from '@/components/layouts/CenteredWrapper';


export default function App({ Component, pageProps }: AppProps<{session: Session}>) {
  // console.log("🚀 ~ file: _app.tsx:11 ~ App ~ pageProps:", pageProps)

  return <>
    <SessionProvider session={pageProps.session}>
      <StoreLayout>
          <Component {...pageProps} />
      </StoreLayout>
    </SessionProvider>
  </>
}
