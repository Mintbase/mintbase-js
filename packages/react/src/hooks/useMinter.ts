import { useWallet } from '../WalletContext';
import { callContractMethod, MAX_GAS, mint } from '@mintbase-js/sdk';
import { useState } from 'react';
import type { MintArgs } from '@mintbase-js/sdk';

export type MinterHookReturn = {
  loading: boolean;
  error: any;
  data: any;
  methods: any;
};

export type MinterHookArgs = MintArgs;

export const useMinter = (args: MintArgs): MinterHookReturn => {
  const { wallet, activeAccountId } = useWallet();
  const { nftContractId, options } = args;

  const [loading, setLoading] = useState(false);

  const handleMint = async (): Promise<void> => {
    setLoading(true);

    // TODO: use @mintbase/storage to get a reference
    const reference = '';

    await callContractMethod(
      {
        ...mint({
          nftContractId,
          metadata: {
            reference: reference,
          },
          options,
        }),
        gas: MAX_GAS,
        deposit: '0',
        signerId: activeAccountId,
      },
      { wallet },
    );

    setLoading(false);
  };

  return {
    loading: loading,
    error: null,
    data: null,
    methods: {
      mint: handleMint,
    },
  };
};
