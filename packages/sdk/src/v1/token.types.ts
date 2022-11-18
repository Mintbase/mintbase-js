export type AccountId = string;
export type TokenId = string;

export type TokenArgs = {
  network?: string;
};


export type TransferArgs = TokenArgs & {
  nftContractId: AccountId;
  transfers: { receiverId: AccountId; tokenId: TokenId }[];
};

export type BurnArgs = {
  nftContractId: AccountId;
  tokenIds: TokenId[];
};

export type DeployTokenContractArgs = TokenArgs & {
  name: string;
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

export type AddRemoveMinterArgs = TokenArgs & {
  minterId: AccountId;
  nftContractId: AccountId;
};

export type BatchChangeMinters = TokenArgs & {
  addMinters: AccountId[];
  removeMinters: AccountId[];
  nftContractId: AccountId;
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
