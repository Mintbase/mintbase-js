import { AccountId, ApproveArgs, TokenArgs, TokenId } from './token.types';

export type PriceArgs = {
  price: {
    amount: string; // yoctoNEAR
    currency?: string;
  };
};

export type ListArgs = TokenArgs & ApproveArgs & PriceArgs;

export type BuyArgs = TokenArgs &
  PriceArgs & {
    nftContractId: AccountId;
    tokenId: TokenId;
    referrerId: AccountId;
    marketAddress: AccountId;
  };

export type DepositStorageArgs = {
  listAmount: number;
  marketAddress: AccountId;
};
