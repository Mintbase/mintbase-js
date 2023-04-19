import type { NextPage } from 'next';
import Head from 'next/head';
import { useMintbaseSession, useWallet } from '@mintbase-js/react';
import { TokenExample } from '../components/TokenExample';
import { TransferTest } from '../components/TransferTest';
import styles from '../styles/Home.module.css';


const Home: NextPage = () => {
  const {
    connect,
    disconnect,
    activeAccountId,
    isWaitingForConnection,
    isWalletSelectorSetup,
  } = useWallet();

  const {
    session,
    error: sessionError,
    requestSession,
  } = useMintbaseSession();


  return (
    <div className={styles.container}>
      <Head>
        <title>Mintbase SDK Next Test Suite</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Mintbase SDK</h1>
        <h3>NextJS Test Suite</h3>

        <p className={styles.description}>
          This is a test suite for development and testing with NextJS.
          <br />
        </p>

        {isWaitingForConnection ? (
          <div>Waiting for a wallet connection...</div>
        ) : null}

        {isWalletSelectorSetup ? (
          <div>
            {activeAccountId ? (
              <div className={styles.description}>
                <h2>You are logged in as {activeAccountId}</h2>
                <button className={styles.button} onClick={disconnect}>
                  DISCONNECT
                </button>
              </div>
            ) : (
              <div className={styles.description}>
                <h2>To continue, login with NEAR</h2>
                <button className={styles.button} onClick={connect}>
                  CONNECT
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>Waiting for wallet selector components...</div>
        )}

        {(activeAccountId && !session) ? (
          <button className={styles.button} onClick={requestSession}>
            REQUEST MINTBASE SESSION
          </button>
        ) : null}

        {session
          ? <p>A mintbase session is active for {session.accountId}, created {session.createdAt}</p>
          : <p>No mintbase session yet</p>
        }

        {sessionError
          ? <p>Error starting session: {sessionError}</p>
          : null
        }

        <h2>Test Components</h2>
        {activeAccountId ? <TransferTest /> : null}

        <TokenExample />
      </main>

      <footer className={styles.footer}>
        <a href="http://mintbase.io">Mintbase</a>
      </footer>
    </div>
  );
};

export default Home;
