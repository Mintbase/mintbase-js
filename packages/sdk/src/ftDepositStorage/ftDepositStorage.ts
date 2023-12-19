import { GAS_CONSTANTS, FT_STORAGE_DEPOSIT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall, FT_METHOD_NAMES, FtDepositStorageArgs, FtDepositStorageArgsResponse } from '../types';


/**
 * Transfers one or more tokens to specified recipients.
 * @param transferArguments {@link TransferArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const ftDepositStorage = ({
  ftContractAddress,
  accountId,
}: FtDepositStorageArgs): NearContractCall<FtDepositStorageArgsResponse> => {

  if (ftContractAddress === null) {
    throw new Error(ERROR_MESSAGES.FT_CONTRACT_ADDRESS);
  }

  return {
    contractAddress: ftContractAddress,
    methodName: FT_METHOD_NAMES.STORAGE_DEPOSIT,
    args: accountId ? { account_id: accountId } : null,
    deposit: FT_STORAGE_DEPOSIT,
    gas: GAS_CONSTANTS.DEFAULT_GAS,
  };
};
