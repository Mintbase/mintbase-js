import { GAS, ONE_YOCTO } from '../constants';
import { TOKEN_METHOD_NAMES } from '../types';
import { transferContractOwnership } from './transferContractOwnership';

test('transfer contract token ownership set all values', () => {

  const mockData = {
    contractAddress: 'test',
    nextOwner: 'test',
    options: {
      keepMinters: false,
    },
  
  };

  const result = transferContractOwnership(mockData);

  expect(result).toEqual({
    contractAddress: mockData.contractAddress,
    args: {
      new_owner: mockData.nextOwner,
      keep_old_minters: false,
    },
    methodName: TOKEN_METHOD_NAMES.TRANSFER_TOKEN_CONTRACT_OWNERSHIP,
    gas: GAS,
    deposit: ONE_YOCTO,
  });
});


test('transfer contract token ownership default values if possible', () => {

  const mockData = {
    contractAddress: 'test',
    nextOwner: 'test',
  };
  
  const result = transferContractOwnership(mockData);
  
  expect(result).toEqual({
    contractAddress: mockData.contractAddress,
    args: {
      new_owner: mockData.nextOwner,
      keep_old_minters: true,
    },
    methodName: TOKEN_METHOD_NAMES.TRANSFER_TOKEN_CONTRACT_OWNERSHIP,
    gas: GAS,
    deposit: ONE_YOCTO,
  });
});


