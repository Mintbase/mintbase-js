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
  isSessionInFlight: boolean;
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
  const [isSessionInFlight, setIsSessionInFlight] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  const requestSession = async (): Promise<void> => {
    setError(null);
    setSession(null);
    setIsSessionInFlight(true);
    if (!activeAccountId) {
      setError('Session requested without an active account id.');
      setIsSessionInFlight(false);
      return;
    }
    try {
      const token = await requestMintbaseSessionToken();
      const session = await getMintbaseSessionFromToken(token);
      setSession(session);
      setIsSessionInFlight(false);
    } catch (err) {
      console.error(err);
      setError(err.toString());
      setIsSessionInFlight(false);
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
      isSessionInFlight,
      error,
      requestSession,
    }}>
      {children}
    </MintbaseSessionContext.Provider>
  );
};


export const useMintbaseSession = (): MintbaseSessionContext => useContext(MintbaseSessionContext);
