import { useWallet } from '@mintbase-js/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { TransferTest } from '../components/TransferTest';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const {
    connect,
    disconnect,
    activeAccountId,
    selector,
    // isConnected,
    isWaitingForConnection,
    isWalletSelectorSetup,
    signMessage,
  } = useWallet();


  const signMessageTest = async (): Promise<void> => {
    await signMessage({
      message: 'hey',
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta:JSON.stringify({ type: 'signature' }),
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Mintbase SDK Next Test Suite</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mintbase SDK
        </h1>
        <h3>
          NextJS Test Suite
        </h3>

        <p className={styles.description}>
          This is a test suite for development and testing with NextJS.<br />
        </p>

        {isWaitingForConnection ? <div>Waiting for a wallet connection...</div> : null}

        {isWalletSelectorSetup
          ?
          <div>
            {activeAccountId
              ?
              <div className={styles.description}>
                <h2>You are logged in as {activeAccountId}</h2>
                <button className={styles.button} onClick={disconnect}>
                      DISCONNECT
                </button>
              </div>
              :
              <div className={styles.description}>
                <h2>To continue, login with NEAR</h2>
                <button className={styles.button} onClick={connect}>
                      CONNECT
                </button>
              </div>
            }
          </div>
          :
          <div>Waiting for wallet selector components...</div>
        }


        {activeAccountId ?
          <button className={styles.button} onClick={signMessageTest}>
            SIGN MESSAGE
          </button>
          : null
        }

        {activeAccountId ?
          <TransferTest />
          : null
        }

      </main>

      <footer className={styles.footer}>
        <a href="http://mintbase.io">Mintbase</a>
      </footer>
    </div>
  );
};

export default Home;
