import BN from 'bn.js';
import { mbjs } from '../config/config';
import { GAS, STORAGE_BYTES, STORAGE_PRICE_PER_BYTE_EXPONENT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { LockMetadataArgs, LockMetadataArgsResponse, NearContractCall, TOKEN_METHOD_NAMES } from '../types';
import { isIntString, isStoreV2 } from '../utils';

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const lockMetadata = (
  args: LockMetadataArgs,
): NearContractCall<LockMetadataArgsResponse> => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    metadataId,
  } = args;

  if (!contractAddress) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (!isStoreV2(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V2);
  }

  if (!isIntString(metadataId)) {
    throw new Error(ERROR_MESSAGES.METADATA_ID_NOT_INT);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      metadata_id: metadataId,
    },
    methodName: TOKEN_METHOD_NAMES.LOCK_METADATA,
    gas: GAS,
    deposit: "1",
  };
};
