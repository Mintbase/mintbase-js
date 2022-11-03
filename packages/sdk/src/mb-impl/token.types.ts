export type AccountId = string;
export type TokenId = string;

export type SingleTokenArgs = {
  nftContractId: AccountId;
  tokenId: TokenId;
};

export type TokenArgs = {
  network?: string;
};

export type TransferArgs = TokenArgs & {
  nftContractId: AccountId;
  transfer: { receiverId: AccountId; tokenId: TokenId }[];
};

export type BurnArgs = {
  nftContractId: AccountId;
  tokenIds: TokenId[];
};

export type DeployTokenContractArgs = TokenArgs & {
  nftContractId: AccountId;
  factoryContractId?: AccountId;
  ownerId: AccountId;
  metadata: {
    symbol: string;
    icon?: string;
    baseUri?: string;
    reference?: string;
    referenceHash?: string;
  };
};

export type TransferTokenContractOwnership = TokenArgs & {
  nftContractId: AccountId;
  nextOwner: AccountId;
  options?: {
    keepMinters: boolean;
  };
};
