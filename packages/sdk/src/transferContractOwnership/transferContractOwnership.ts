/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { GAS, ONE_YOCTO } from '../constants';
import { NearContractCall, TOKEN_METHOD_NAMES, TransferContractOwnershipArgs, TransferContractOwnershipReturnArgs } from '../types';


/**
 * Transfers one or more tokens to specified recipients.
 * @param transferContractOwnershipArgs {@link TransferContractOwnershipArgumentsArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */  
export const transferContractOwnership = (
  args: TransferContractOwnershipArgs,
): NearContractCall<TransferContractOwnershipReturnArgs> => {
  const { contractAddress, nextOwner, options = { keepMinters: true } } = args;

  
  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      new_owner: nextOwner,
      keep_old_minters: options.keepMinters,
    },
    methodName: TOKEN_METHOD_NAMES.TRANSFER_TOKEN_CONTRACT_OWNERSHIP,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
