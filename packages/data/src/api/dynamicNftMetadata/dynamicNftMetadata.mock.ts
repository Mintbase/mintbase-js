export const dynamicNftMetadataMockActive = {
  nft_metadata: [
    {
      metadataId: 'dynamic.mintbase2.near:deadbeef2',
      internalMetadataId: 0,
      contractAddress: 'dynamic.mintbase2.near',
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
      metadataId: 'dynamic.mintbase2.near:deadbeef0',
      contractAddress: 'dynamic.mintbase2.near',
      internalMetadataId: 0,
      reference: 'https://arweave.net/reference0',
      referenceBlob: {
        media: 'https://arweave.net/media0',
        history: [],
      },
      isActive: true,
    },
    {
      metadataId: 'dynamic.mintbase2.near:deadbeef1',
      contractAddress: 'dynamic.mintbase2.near',
      internalMetadataId: 0,
      reference: 'https://arweave.net/reference1',
      referenceBlob: {
        media: 'https://arweave.net/media1',
        history: ['https://arweave.net/reference0'],
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
