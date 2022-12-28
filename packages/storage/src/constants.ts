export const ARWEAVE_SERVICE_HOST = 'https://ar.mintbase.io';
export const MAX_UPLOAD_ERROR_MSG = 'The max file size supported is currently is 30MB. Please contact Mintbase support regarding use cases for large files.';

export const nodes = {
  bundlr: {
    node1: {
      url: 'http://node1.bundlr.network',
      supportedCurrencies: ['arweave'],
    },
    node2: {
      url: 'http://node2.bundlr.network',
      supportedCurrencies: ['arweave'],
    },
  },
};

export const supportedStorageServices = {
  arweave: {
    bundlr: 'bundlr',
  },
};
export const MINTBASE_API_KEY =
  process.env.MINTBASE_API_KEY ||
  globalThis?.localStorage?.getItem('MINTBASE_API_KEY') ||
  MINTBASE_API_ANON_USER;
export declare const MINTBASE_API_KEY_HEADER = 'mb-api-key';
export declare const MINTBASE_API_ANON_USER = 'anon';
export declare const ANON_USER_WARNING = 'Warning: you are using the anonymous mintbase api key. You may want to specify yours.';
