import { useWallet } from '../WalletContext';
import {
  mint,
  DEPOSIT_CONSTANTS,
  GAS_CONSTANTS,
  execute,
} from '@mintbase-js/sdk';
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

    await execute(
      {
        ...mint({
          nftContractId,
          metadata: {
            reference: reference,
          },
          options,
        }),
        gas: GAS_CONSTANTS.OPTIMAL_GAS,
        deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
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
