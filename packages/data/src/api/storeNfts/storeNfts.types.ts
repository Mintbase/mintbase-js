import { Network } from '@mintbase-js/sdk';
import { Pagination } from '../../types';

export interface StoreNftsResult {
  mb_views_nft_metadata_unburned: StoreNftsData[];
  mb_views_nft_metadata_unburned_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface StoreNftsData {
  minted_timestamp: string;
  price: number | null;
  media: string;
  reference: string | null;
  nft_contract_id: string;
  metadata_id: string;
  title: string;
  base_uri: string;
}


export interface StoreNftsProps {
  contractAddress: string | string[];
  showOnlyListed?: boolean;
  pagination?: Pagination;
  network?: Network;
}
