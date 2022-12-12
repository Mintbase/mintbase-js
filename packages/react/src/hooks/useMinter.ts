import { useWallet } from '../WalletContext';
import {
  execute,
} from '@mintbase-js/sdk';
import { useState } from 'react';
import { mint, MintArgs } from '@mintbase-js/sdk/lib/v1';

export type MinterHookReturn = {
  loading: boolean;
  error: any;
  data: any;
  methods: any;
};

export type MinterHookArgs = MintArgs;

export const useMinter = (args: MintArgs): MinterHookReturn => {
  const { selector, activeAccountId } = useWallet();
  const { nftContractId, options } = args;

  const [loading, setLoading] = useState(false);

  const handleMint = async (): Promise<void> => {
    setLoading(true);

    // TODO: use @mintbase/storage to get a reference
    const reference = '';

    await execute(
      {
        ...mint({
          nftContractId,
          metadata: {
            reference: reference,
          },
          options,
        }),
        signerId: activeAccountId,
      },
      { wallet: await selector.wallet() },
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
