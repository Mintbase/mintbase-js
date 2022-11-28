export type AccountId = string;
export type TokenId = string;

export type TokenArgs = {
  network?: string;
};


export type Splits = Record<AccountId, number>;

export type MintArgs = TokenArgs & {
  nftContractId: AccountId;
  metadata: {
    reference: string;
  };
  options?: {
    royalties?: Splits;
    splits?: Splits;
    extra?: string;
    ownerId?: AccountId;
    amount?: number;
    royaltyPercentage?: number;
    metadataId: string;
  };
};


export type RevokeAccountArgs = TokenArgs & {
  nftContractId: AccountId;
  tokenId: TokenId;
  accountToRevokeId?: AccountId;
};

export type ApproveArgs = TokenArgs & {
  tokenId: TokenId;
  nftContractId: AccountId;
  approvedAccountId: AccountId;
};
