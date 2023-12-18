import { ONE_YOCTO, GAS_CONSTANTS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall, FT_METHOD_NAMES, FtTransferArgs, FtTransferArgsResponse } from '../types';


/**
 * Transfers one or more tokens to specified recipients.
 * @param transferArguments {@link TransferArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const ftTransfer = ({
  ftContractAddress,
  receiverId,
  amount,
  memo = null,
}: FtTransferArgs): NearContractCall<FtTransferArgsResponse> => {

  if (ftContractAddress === null) {
    throw new Error(ERROR_MESSAGES.FT_CONTRACT_ADDRESS);
  }

  return {
    contractAddress: ftContractAddress,
    methodName: FT_METHOD_NAMES.FT_TRANSFER,
    args: {
      receiver_id: receiverId,
      amount,
      memo,
    },
    deposit: ONE_YOCTO,
    gas: GAS_CONSTANTS.FT_TRANSFER,
  };
};
