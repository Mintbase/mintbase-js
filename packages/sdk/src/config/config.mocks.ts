import { GRAPHQL_ENDPOINTS, MARKET_CONTRACT_ADDRESS, MINTBASE_CONTRACTS, MINTBASE_CONTRACTS_V2, NEAR_NETWORKS, NEAR_RPC_ENDPOINTS, USDC_ADDRESS, USDT_ADDRESS } from '../types';

export const TESTNET_MOCK = {
  apiKey: process.env.MINTBASE_API_KEY,
  contractAddress: 'ruben.mintspace2.testnet',
  callbackUrl: 'https://mintbase.xyz/success',
  debugMode: true,
  graphqlUrl: GRAPHQL_ENDPOINTS.testnet,
  isSet: true,
  marketAddress: MARKET_CONTRACT_ADDRESS.testnet,
  mbContract: MINTBASE_CONTRACTS.testnet,
  mbContractV2: MINTBASE_CONTRACTS_V2.testnet,
  nearRpcUrl: NEAR_RPC_ENDPOINTS.testnet,
  network: NEAR_NETWORKS.TESTNET,
  connectProxyAddress: null,
  ftAddresses: { usdc: USDC_ADDRESS.testnet, usdt: USDT_ADDRESS.testnet },
  checkVersions: true,
};


export const MAINNET_MOCK = {
  apiKey: process.env.MINTBASE_API_KEY,
  contractAddress: 'zengin.mintbase1.near',
  callbackUrl: 'https://mintbase.xyz/success',
  debugMode: false,
  graphqlUrl: GRAPHQL_ENDPOINTS.mainnet,
  isSet: true,
  marketAddress: MARKET_CONTRACT_ADDRESS.mainnet,
  mbContract: MINTBASE_CONTRACTS.mainnet,
  mbContractV2: MINTBASE_CONTRACTS_V2.mainnet,
  nearRpcUrl: NEAR_RPC_ENDPOINTS.mainnet,
  network: NEAR_NETWORKS.MAINNET,
  connectProxyAddress: null,
  ftAddresses: { usdc: USDC_ADDRESS.mainnet, usdt: USDT_ADDRESS.mainnet },
  checkVersions: true,
};
