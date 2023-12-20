// FIXME: https://ar.mintbase.xyz, testing this for now
export const ARWEAVE_SERVICE_HOST = 'https://surface-arweave-debug-z3w7d7dnea-ew.a.run.app';
export const MAX_UPLOAD_BYTES = 31_457_280;
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
  ario: {
    node: {
      url: 'http://up.arweave.net',
      supportedCurrencies: ['arweave'],
    },
  },
};

export const supportedStorageServices = {
  arweave: {
    bundlr: 'bundlr',
    ario: 'ario',
  },
};
export const MINTBASE_API_KEY = 'anon';
export const MINTBASE_API_KEY_HEADER = 'mb-api-key';
export const MINTBASE_API_ANON_USER = 'anon';
export const ANON_USER_WARNING = 'Warning: you are using the anonymous mintbase api key. You need to specify yours in order to upload a file. In the future this will be mandatory';
export const OBJECT_IS_EMPTY_ERROR = 'Provided object is empty';
