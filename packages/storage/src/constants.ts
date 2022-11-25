export const ARWEAVE_SERVICE_HOST = 'https://ar.mintbase.io';

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

export const MAX_UPLOAD_ERROR_MSG = 'The max file size supported is currently is 30MB. Please contact Mintbase support regarding use cases for large files.';
