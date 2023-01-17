export const metadataByMetadataIdMock = {
  metadata: [
    {
      nft_contracts: {
        id: 'charitynft.mintbase1.near',
        baseUri: 'https://arweave.net',
      },
      title: 'Flood In Henan, China. NEARians Call for Action',
      description:
        'People of NEAR, let unite to support our fellow China NEARians against the Flood. NEAR community should come together in the spirit of unity to face challenges using technology like Sputnik, and Split revenue on Mintbase.',
      media: 'https://arweave.net/3Np9-eTZFil0LOu2UR32gxIg4PI-QyUQ8emyFXDGjrk',
      document: null,
      animationUrl:
        'https://arweave.net/nfHP-DSeDZa0PRrjq0HaSkgpUWv9Y0rAay6HKTo7GHM',
    },
  ],
  tokenCount: {
    aggregate: {
      count: 10,
    },
  },
  minters: [
    {
      minter: 'scifx.near',
    },
  ],
  rollingAuctionCount: {
    aggregate: {
      count: 0,
    },
  },
  simpleSaleCount: {
    aggregate: {
      count: 1,
    },
  },
  listings: [
    {
      kind: 'simple',
      price: 3.5e25,
      market_id: 'simple.market.mintbase1.near',
      token: {
        token_id: '91',
        minter: 'scifx.near',
        nft_contract_id: 'charitynft.mintbase1.near',
        owner: 'bluegirl.near',
        splits: null,
        royalties: {
          'china_charity_dao.sputnikdao.near': 10000,
        },
      },
    },
  ],
};
