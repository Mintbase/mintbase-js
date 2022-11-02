import Bundlr from '@bundlr-network/client';
import { nodes, supportedStorageServices } from './constants';

export const setup = (serviceType: string, apiKey?: string): Bundlr | undefined => {
  switch (serviceType) {
  case supportedStorageServices.arweave.bundlr: {
    return new Bundlr(nodes.bundlr.node1.url, 'arweave', apiKey);
  }
  default:
    return undefined;
  }
};
