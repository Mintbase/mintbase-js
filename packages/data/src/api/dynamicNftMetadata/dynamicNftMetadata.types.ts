import { Network } from '@mintbase-js/sdk';
import { ReferenceBlob } from '../../types';

export type DynamicNftMetadataProps = {
  contractAddress: string;
  internalMetadataId: number;
  isActive: boolean;
  network?: Network
}

export type DynamicNftMetadataResult = {
  nft_metadata: DynamicNftMetadata[];
  nft_metadata_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export type DynamicNftMetadata = {
  metadataId: string;
  contractAddress: string;
  internalMetadataId: number;
  reference: string;
  referenceBlob: ReferenceBlob;
  media?: string;
  document?: string;
  animationUrl?: string;
  extra?: string;
  price?: number;
  mintersAllowlist?: string[];
  royalties?: Record<string, number>;
  royaltyPercent?: number;
  maxSupply?: number;
  lastPossibleMint?: string;
  isLocked?: boolean;
  isActive: boolean;

}
