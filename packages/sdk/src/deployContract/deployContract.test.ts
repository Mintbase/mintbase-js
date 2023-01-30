/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { CONTRACT_DEPOSIT, DEFAULT_MB_LOGO, DEFAULT_MB_BASE_URI, GAS_CONSTANTS } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { deployContract } from './deployContract';

test('deploy contract set all values', () => {

  const mockMetadata = {
    symbol: 'test',
    icon: 'test',
    baseUri: 'test',
    reference: 'test',
    referenceHash: 'test',
  };
  const mockData = {
    name: 'test',
    factoryContractId: 'test.factory',
    ownerId: 'test',
    metadata: mockMetadata,
  };

  const result = deployContract(mockData);

  expect(result).toEqual({
    contractAddress: mockData.factoryContractId,
    methodName: TOKEN_METHOD_NAMES.DEPLOY_TOKEN_CONTRACT,
    args: {
      owner_id: mockData.ownerId,
      metadata: {
        spec: 'nft-1.0.0',
        name: mockData.name,
        symbol: mockMetadata.symbol,
        icon: mockMetadata.icon,
        base_uri: mockMetadata.baseUri,
        reference: mockMetadata.reference,
        reference_hash: mockMetadata.referenceHash,
      },
    },
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: CONTRACT_DEPOSIT,
  });
});


test('deploy contract standardizing name and symbol to remove unwanted characters', () => {

  const mockMetadata = {
    symbol: 'TEST:TEST',
    icon: 'test',
    baseUri: 'test',
    reference: 'test',
    referenceHash: 'test',
  };
  const mockData = {
    name: 'TEST.TEST',
    factoryContractId: 'test.factory',
    ownerId: 'test',
    metadata: mockMetadata,
  };

  const result = deployContract(mockData);

  expect(result).toEqual({
    contractAddress: mockData.factoryContractId,
    methodName: TOKEN_METHOD_NAMES.DEPLOY_TOKEN_CONTRACT,
    args: {
      owner_id: mockData.ownerId,
      metadata: {
        spec: 'nft-1.0.0',
        name: 'testtest',
        symbol: 'testtest',
        icon: mockMetadata.icon,
        base_uri: mockMetadata.baseUri,
        reference: mockMetadata.reference,
        reference_hash: mockMetadata.referenceHash,
      },
    },
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: CONTRACT_DEPOSIT,
  });


});

test('deploy contract uses default values', () => {

  const mockMetadata = {
    symbol: 'test',
  };

  const mockData = {
    name: 'test',
    ownerId: 'test',
    metadata: mockMetadata,
  };

  const result = deployContract(mockData);

  expect(result).toEqual({
    contractAddress: mbjs.keys.mbContract,
    methodName: TOKEN_METHOD_NAMES.DEPLOY_TOKEN_CONTRACT,
    args: {
      owner_id: mockData.ownerId,
      metadata: {
        spec: 'nft-1.0.0',
        name: mockData.name,
        symbol: mockMetadata.symbol,
        icon: DEFAULT_MB_LOGO,
        base_uri: DEFAULT_MB_BASE_URI,
        reference: null,
        reference_hash: null,
      },
    },
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: CONTRACT_DEPOSIT,
  });


});
