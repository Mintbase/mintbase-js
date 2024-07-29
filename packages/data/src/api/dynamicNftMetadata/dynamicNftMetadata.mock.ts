import {mbjs} from "@mintbase-js/sdk";

export const dynamicNftMetadataMockActive = {
  nft_metadata: [
    {
      metadataId: `dynamic.${mbjs.keys.mbContractV2}:deadbeef2`,
      internalMetadataId: 0,
      contractAddress: `dynamic.${mbjs.keys.mbContractV2}`,
      reference: 'https://arweave.net/reference2',
      referenceBlob: {
        media: 'https://arweave.net/media2',
        history: [
          'https://arweave.net/reference0',
          'https://arweave.net/reference1',
        ],
      },
      isActive: true,
    },
  ],
  nft_metadata_aggregate: {
    aggregate: {
      count: 3,
    },
  },
};

export const dynamicNftMetadataMockInactive = {
  nft_metadata: [
    {
      metadataId: `dynamic.${mbjs.keys.mbContractV2}:deadbeef0`,
      contractAddress: `dynamic.${mbjs.keys.mbContractV2}`,
      internalMetadataId: 0,
      reference: 'https://arweave.net/reference0',
      referenceBlob: {
        media: 'https://arweave.net/media0',
        history: [],
      },
      isActive: false,
    },
    {
      metadataId: `dynamic.${mbjs.keys.mbContractV2}:deadbeef1`,
      contractAddress: `dynamic.${mbjs.keys.mbContractV2}`,
      internalMetadataId: 0,
      reference: 'https://arweave.net/reference1',
      referenceBlob: {
        media: 'https://arweave.net/media1',
        history: ['https://arweave.net/reference0'],
      },
      isActive: false,
    },
  ],
  nft_metadata_aggregate: {
    aggregate: {
      count: 3,
    },
  },
};