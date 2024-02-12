import { Network } from '@mintbase-js/sdk';

export interface TokenOwnerQueryResult  {
    mb_views_nft_tokens: TokenOwner[];
}

export interface TokenOwner  {
    owner: string;
}

export interface TokenOwnerProps {
    tokenId: string;
    contractAddress: string;
    network?: Network;
}
