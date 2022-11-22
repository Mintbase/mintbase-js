import { ONE_YOCTO, GAS, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

export type TransferArgs = {
  transfers: {
    receiverId: string;
    tokenId: string;
  }[];
  nftContractId?: string;
};

export const DEFAULT_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT || null;
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
  if (transfers.length > 1) {
    const ids = transfers.map((transferElm) => {
      return [transferElm.receiverId, transferElm.tokenId];
    });

    return {
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.BATCH_TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        receiver_id: receiverId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId,
      },
      deposit: DEPOSIT_FOR_TRANSFER,
      gas: GAS_FOR_TRANSFER,
    };
  }
};
