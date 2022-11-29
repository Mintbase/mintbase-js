export type AccountId = string;
export type TokenId = string;

export type TokenArgs = {
  network?: string;
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
