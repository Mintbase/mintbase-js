import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletContextProvider, MintbaseSessionProvider } from '@mintbase-js/react';
import '@near-wallet-selector/modal-ui/styles.css';

globalThis.mbjs.network = 'mainnet';
globalThis.mbjs.mbContract = 'mintbase1.near';
globalThis.mbjs.contractAddress = 'mintbase1.near';

// when this is defined, the context methods will use the proxy
// keeping state on server
// globalThis.mbjs.connectProxyAddress = 'http://localhost:3000/api/session';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <WalletContextProvider>
      <MintbaseSessionProvider>
        <Component {...pageProps} />
      </MintbaseSessionProvider>
    </WalletContextProvider>
  );
}

export default MyApp;
