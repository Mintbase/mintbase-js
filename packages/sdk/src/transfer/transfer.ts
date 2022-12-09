import { ONE_YOCTO, GAS, TOKEN_METHOD_NAMES, DEFAULT_CONTRACT_ADDRESS } from '../constants';
import { NearContractCall } from '../execute';

export type TransferArgs = {
  transfers: {
    receiverId: string;
    tokenId: string;
  }[];
  nftContractId?: string;
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
  nftContractId = DEFAULT_CONTRACT_ADDRESS,
}: TransferArgs): NearContractCall => {
  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID env to default to');
  }

  if (transfer.length == 0) {
    throw new Error('You must transfer at least one token');
  }

  if (transfers.length > 1) {
    const ids = transfers.map((transferElm) => {
      return [transferElm.receiverId, transferElm.tokenId];
    });

    return {
      contractAddress: nftContractId,
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
      contractAddress: nftContractId,
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
