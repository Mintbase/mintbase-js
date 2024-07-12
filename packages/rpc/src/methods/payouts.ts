import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, callViewMethod } from '../util';

type NepPayout = {
  payout: Record<string, string>;
};

type UiPayout = {
  equalAccounts: boolean;
  splits: Array<{ account: string; percent: number }>;
  royalties: Array<{ account: string; percent: number }>;
  royaltyPercent: number;
  splitPercent: number;
  tokenId: string;
};

const nepToUi = (nepPayout: NepPayout, tokenId: string): UiPayout => {
  const uiPayout = {
    equalAccounts: true,
    splits: Object.entries(nepPayout.payout).map(([account, percent]) => {
      // FIXME: remove division (blocked until smart contract accepts small balances)
      return { account, percent: parseInt(percent) / 1000000000000 };
    }),
    royalties: [],
    royaltyPercent: 0,
    splitPercent: 100,
    tokenId,
  };

  return uiPayout;
};

interface  PayoutsProps {
  contractId: string;
  tokenId: string;
  network?: Network;
  rpc?: RPC_OPTIONS;
  rpcUrl?: string
}

export const payouts = async ({ contractId, tokenId, rpcUrl }: PayoutsProps): Promise<UiPayout> => {
  const payout = await callViewMethod<NepPayout>({
    contractId,
    method: 'nft_payout',
    // FIXME: max_len_payout shouldn't be required, but it is for MB
    // FIXME: this should work with 10000, but currently does not
    // args: { token_id: tokenId, balance: "10000" },
    args: {
      token_id: tokenId,
      balance: '10000000000000000',
      max_len_payout: 1000,
    },
    rpcUrl,
  },
  );

  return nepToUi(payout, tokenId);
};
