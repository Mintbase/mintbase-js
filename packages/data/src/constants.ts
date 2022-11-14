export type NearDataEnv = 'mainnet' | 'testnet' | 'sandbox';
export const NEAR_DATA_ENV = process.env.NEAR_DATA_ENV || 'mainnet';
export const GRAPHQL_ENDPOINT = `https://interop-${NEAR_DATA_ENV}.hasura.app/v1/graphql`;
export const QUERY_OPS_PREFIX = 'mintbase_js_data_';
