// shared by data libs and not in graphql.
export type Pagination = {
  limit: number;
  offset?: number;
};

export type Token = {
  lastTransferredAt: string;
  tokenId: string;
  contractId: string;
  baseUri: string;
  metadataId: string;
  title: string;
  minter: string;
  media: string;
  document: string;
  animationUrl: string;
};
