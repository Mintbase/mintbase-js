import { dynamicNftMetadata } from './dynamicNftMetadata';
import { DynamicNftMetadataResult } from './dynamicNftMetadata.types';

import { GraphQLClient } from 'graphql-request';
import { dynamicNftMetadataMockInactive, dynamicNftMetadataMockActive } from './dynamicNftMetadata.mock';
import { Network } from '@mintbase-js/sdk';

jest.mock('graphql-request');

const props = {
  contractAddress: 'dynamic.mintbase2.near',
  internalMetadataId: 0,
  network: 'mainnet' as Network,
};

describe('dynamicNftMetadata', () => {
  jest.spyOn(console, 'error').mockImplementation(() => null);
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return active metadata', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<DynamicNftMetadataResult> => Promise.resolve(dynamicNftMetadataMockActive),
    }));

    const result = await dynamicNftMetadata({ ...props, isActive: true });

    expect(result?.data).toBe(
      dynamicNftMetadataMockActive,
    );
  });

  it('should return inactive metadata', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<DynamicNftMetadataResult> => Promise.resolve(dynamicNftMetadataMockInactive),
    }));

    const result = await dynamicNftMetadata({ ...props, isActive: false });

    expect(result?.data).toBe(
      dynamicNftMetadataMockInactive,
    );
  });

  it('should handle errors', async () => {
    const errMessage = 'exploded';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<DynamicNftMetadataResult> => Promise.reject(new Error(errMessage)),
    }));

    const call = await dynamicNftMetadata({...props, isActive: true});

    expect(call).toStrictEqual({ error: errMessage });

  });
});
