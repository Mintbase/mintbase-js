
jest.mock('graphql-request');

jest.mock('@mintbase-js/sdk', () => ({
  NEAR_NETWORKS:{
    MAINNET: 'mainnet',
    TESTNET: 'testnet',
  },
  RPC_ENDPOINTS:{
    mainnet: 'https://rpc.mainnet.near.org',
    testnet: 'https://rpc.testnet.near.org',
  },
  GRAPHQL_ENDPOINTS:{ 
    mainnet:  'https://interop-mainnet.hasura.app/v1/graphql',
    testnet: 'https://interop-testnet.hasura.app/v1/graphql',
  },
  MINTBASE_CONTRACTS :{
    mainnet: 'mintspace2.testnet',
    testnet: 'mintbase1.near',
  },
  MARKET_CONTRACT_ADDRESS: {
    mainnet: 'simple.market.mintbase1.near',
    testnet:  'market-v2-beta.mintspace2.testnet',
  },
  mbjs: {
    keys: {
      isSet: true,
      contractAddress: 'buddha.mintspace2.testnet',
      network: 'testnet',
      nearRpcUrl: 'https://rpc.testnet.near.org',
    },
  },
}));
