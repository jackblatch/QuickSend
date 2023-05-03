import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";

const MyApp: any = ({
  // AppType<{ session: Session | null }>
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  return getLayout(
    <SessionProvider session={session}>
      <Head>
        <script
          defer
          data-domain="quicksend.jackblatch.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
