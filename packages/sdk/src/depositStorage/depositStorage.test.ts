import { GAS } from '../constants';
import { depositStorage } from './depositStorage';


describe('deposit unit tests', () => {
  const marketAddress = 'test';  
  const methodName = 'deposit_storage';
  test('deposit storage for one listing', () => {
    
    const args = depositStorage({
      listAmount: 1,
      marketAddress: marketAddress,
    });
      
    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: methodName,
      args: {},
      deposit: '10000000000000000000000',
      gas: GAS,
    });
  });
      
  test('deposit storage for two listings', () => {
    const args = depositStorage({
      listAmount: 2,
      marketAddress: marketAddress,
    });
      
    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: methodName,
      args: {},
      deposit: '20000000000000000000000',
      gas: GAS,
    });
  });
      
  test('deposit storage for ten listings', () => {
    const args = depositStorage({
      listAmount: 10,
      marketAddress: marketAddress,
    });
      
    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: methodName,
      args: {},
      deposit: '100000000000000000000000',
      gas: GAS,
    });
  });
});

