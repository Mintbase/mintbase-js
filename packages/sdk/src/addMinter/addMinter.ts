import { mbjs } from '../config';
import { GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall } from '../execute';
import { TOKEN_METHOD_NAMES } from '../types';

export type AddMinterArgs =  {
    minterId: string;
    contractAddress?: string;
  };

/**
 * Add minting access for one id to a contract you own.
 * @param addMinterArgs {@link AddMinterArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */  
export const addMinter = (
  args: AddMinterArgs,
): NearContractCall=> {
  const { minterId, contractAddress = mbjs.keys.contractAddress } = args;

  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }
  
  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      account_id: minterId,
    },
    methodName: TOKEN_METHOD_NAMES.ADD_MINTER,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
