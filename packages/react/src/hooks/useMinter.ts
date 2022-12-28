import { useWallet } from '../WalletContext';
import {
  execute,
} from '@mintbase-js/sdk';
import { useState } from 'react';
import { mint, MintArgs } from '@mintbase-js/sdk';
import { FinalExecutionOutcome } from '@near-wallet-selector/core';

export type UseMinterReturn = {
  loading: boolean;
  error: null;
  data: void | FinalExecutionOutcome | FinalExecutionOutcome[] | null;
  methods: {
    mint: () => Promise<void>;
  };
};

export type MinterHookArgs = MintArgs;

export const useMinter = (args: MintArgs): UseMinterReturn => {
  const { selector } = useWallet();
  const { nftContractId, options, reference, ownerId } = args;

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<void | FinalExecutionOutcome | FinalExecutionOutcome[] | null>(null);


  const handleMint = async (): Promise<void> => {
    setLoading(true);

    const wallet = await selector.wallet();

    const receipt = await execute({ wallet },
      mint({
        nftContractId,
        reference: reference,
        ownerId: ownerId,
        options,
      }),
    );
    
    setReceipt(receipt);
    setLoading(false);
  };

  return {
    loading: loading,
    error: null,
    data: receipt,
    methods: {
      mint: handleMint,
    },
  };
};
