import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletContextProvider } from '@mintbase-js/react';
import '@near-wallet-selector/modal-ui/styles.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
}

export default MyApp;
