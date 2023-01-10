import { mbjs } from '../config';
import { ONE_YOCTO, GAS } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall } from '../execute';
import { TOKEN_METHOD_NAMES } from '../types';

export type TransferArgs = {
  transfers: {
    receiverId: string;
    tokenId: string;
  }[];
  contractAddress?: string;
};


export const DEPOSIT_FOR_TRANSFER = ONE_YOCTO;
// TODO: make this more accurate someday.
export const GAS_FOR_TRANSFER = GAS;


/**
 * Transfers one or more tokens to specified recipients.
 * @param transferArguments {@link TransferArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const transfer = ({
  transfers,
  contractAddress = mbjs.keys.contractAddress,
}: TransferArgs): NearContractCall => {


  if (contractAddress === null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (transfer.length == 0) {
    throw new Error(ERROR_MESSAGES.TRANSFER);
  }

  if (transfers.length > 1) {
    const ids = transfers.map((transferElm) => {
      return [transferElm.receiverId, transferElm.tokenId];
    });

    return {
      contractAddress: contractAddress || mbjs.keys.contractAddress,
      methodName: TOKEN_METHOD_NAMES.BATCH_TRANSFER,
      args: {
        token_ids: ids,
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    };
  } else {
    const { receiverId, tokenId } = transfers.pop();

    return {
      contractAddress: contractAddress || mbjs.keys.contractAddress,
      methodName: TOKEN_METHOD_NAMES.TRANSFER,
      args: {
        receiver_id: receiverId,
        token_id: tokenId,
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    };
  }
};
