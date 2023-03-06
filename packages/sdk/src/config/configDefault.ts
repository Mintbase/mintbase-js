import { MbJsKeysObject, MARKET_CONTRACT_ADDRESS, Network, MINTBASE_CONTRACTS, NEAR_NETWORKS, ConfigOptions, GRAPHQL_ENDPOINTS, RPC_ENDPOINTS } from '../types';


export const DEFAULT_API_KEY = 'anon';

const defaultContractAddress = MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] ||  MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET];


export default {
  network: process.env.NEAR_NETWORK || NEAR_NETWORKS.MAINNET,
  graphqlUrl: GRAPHQL_ENDPOINTS[process.env.NEAR_NETWORK] || GRAPHQL_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  nearRpcUrl: RPC_ENDPOINTS[process.env.NEAR_NETWORK] || RPC_ENDPOINTS[NEAR_NETWORKS.TESTNET],
  callbackUrl: process.env.CALLBACK_URL || '',
  // will check for process.env.CONTRACT_ADDRESS if not will setup mintbase contract according to the network, if not will setup testnet contract
  contractAddress: process.env.CONTRACT_ADDRESS || defaultContractAddress,
  marketAddress: MARKET_CONTRACT_ADDRESS[process.env.NEAR_NETWORK] || MARKET_CONTRACT_ADDRESS[NEAR_NETWORKS.TESTNET],
  mbContract: MINTBASE_CONTRACTS[process.env.NEAR_NETWORK] || MINTBASE_CONTRACTS[NEAR_NETWORKS.TESTNET],
  apiKey: process.env.MINTBASE_API_KEY || DEFAULT_API_KEY,
  debugMode: process.env.NEAR_NETWORK === NEAR_NETWORKS.TESTNET,
  isSet: Boolean(process.env.NEAR_NETWORK),
};
//Then, in your code, you can import this object and use it directly:
