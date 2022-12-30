export type TokensByStatus = {
  listedTokens: string[];
  burnedTokens: string[];
  unlistedTokens: string[];
};

export interface TokenByStatusProp {
  nodes: {token_id: string}[];
}

export type TokenByStatusQueryResults = {
  listedTokens: TokenByStatusProp;
  burnedTokens: TokenByStatusProp;
  unburnedTokens: TokenByStatusProp;
};
