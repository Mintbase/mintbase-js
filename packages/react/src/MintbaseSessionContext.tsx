import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  requestMintbaseSessionToken,
  getMintbaseSessionFromToken,
} from '@mintbase-js/auth/lib/wallet';
import type { MintbaseSession } from '@mintbase-js/auth/lib/wallet';
import { useWallet } from './WalletContext';
import { mbjs } from '@mintbase-js/sdk';


export type MintbaseSessionContext = {
  session: MintbaseSession | null;
  error: string | null;
  requestSession: () => void;
}


export const MintbaseSessionContext = createContext<MintbaseSessionContext | null>(null);

export const MintbaseSessionProvider: React.FC<React.PropsWithChildren> = (
  { children },
) => {
  // requires wallet context
  const { activeAccountId } = useWallet();
  const [session, setSession] = useState<MintbaseSession|null>(null);
  const [error, setError] = useState<string|null>(null);

  const requestSession = async (): Promise<void> => {
    setError(null);
    setSession(null);
    if (!activeAccountId) {
      setError('Session requested without an active account id.');
    }
    try {
      const token = await requestMintbaseSessionToken();
      const session = await getMintbaseSessionFromToken(token);
      setSession(session);
    } catch (err) {
      console.error(err);
      setError(err.toString());
    }
  };

  const requestServerSession = async (): Promise<void> => {
    try {
      const session = await getMintbaseSessionFromToken('') as MintbaseSession & { error?: string };
      if (session.error) {
        setError(session.error);
        return;
      }
      setSession(session);
    } catch (err) {
      console.warn('Attempted to get server side session but failed', err);
    }
  };

  // attempt to get the session from cookies if a proxy address is defined
  useEffect((): void => {
    if (mbjs.keys.connectProxyAddress) {
      void requestServerSession();
    }
  }, []);

  return (
    <MintbaseSessionContext.Provider value={{
      session,
      error,
      requestSession,
    }}>
      {children}
    </MintbaseSessionContext.Provider>
  );
};


export const useMintbaseSession = (): MintbaseSessionContext => useContext(MintbaseSessionContext);
