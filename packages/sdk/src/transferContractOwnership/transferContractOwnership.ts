/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type TransferContractOwnershipArgs = {
    contractId: string;
    nextOwner: string;
    options?: {
      keepMinters: boolean;
    };
  };


/**
 * Transfers one or more tokens to specified recipients.
 * @param transferContractOwnershipArgs {@link TransferContractOwnershipArgumentsArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */  
export const transferContractOwnership = (
  args: TransferContractOwnershipArgs,
): NearContractCall => {
  const { contractId, nextOwner, options = { keepMinters: true } } = args;

  
  return {
    contractAddress: contractId,
    args: {
      new_owner: nextOwner,
      keep_old_minters: options.keepMinters,
    },
    methodName: TOKEN_METHOD_NAMES.TRANSFER_TOKEN_CONTRACT_OWNERSHIP,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
