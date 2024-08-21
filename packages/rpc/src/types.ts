export interface BaseParams {
  rpcUrl: string
}

export interface AccountParams extends BaseParams {
  accountId: string
}

export interface SocialParams extends AccountParams {
  network: 'testnet' | 'mainnet'
}

export interface FTParams extends AccountParams  {
  contractId: string;
}

export type AccessKey = {
  public_key: string;
  access_key: AccessKeyPermissions;
};

export type AccessKeyPermissions = {
  permission: 'FullAccess' | {
    FunctionCall: {
      allowance: string;
      receiver_id: string;
      method_names: string[];
    };
  };
}

export type NepPayout = {
  payout: Record<string, string>;
};

export type UiPayout = {
  equalAccounts: boolean;
  splits: Array<{ account: string; percent: number }>;
  royalties: Array<{ account: string; percent: number }>;
  royaltyPercent: number;
  splitPercent: number;
  tokenId: string;
};

export interface PayoutsProps extends BaseParams{
  contractId: string;
  tokenId: string;
}


export type ProfileImage = {
  ipfs_cid: string;
  url?: string;
  nft?: {
    contractId: string;
    tokenId: string;
  };
}

export type NearSocialProfile = {
  name?: string;
  description?: string;
  image?: ProfileImage;
  imageUrl?: string;
  backgroundImageUrl?: string;
  linktree?: {
    twitter: string;
    github: string;
    telegram: string;
    website: string;
  };
  tags?: Record<string, string>;
};
