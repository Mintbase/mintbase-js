import BN from 'bn.js';
import { mbjs } from '../config/config';
import { GAS, STORAGE_BYTES, STORAGE_PRICE_PER_BYTE_EXPONENT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { CreateMetadataArgs, CreateMetadataArgsResponse, NearContractCall, TokenMetadata, TOKEN_METHOD_NAMES } from '../types';
import { isIntString, isStoreV2, processRoyalties } from '../utils';

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const createMetadata = (
  args: CreateMetadataArgs,
): NearContractCall<CreateMetadataArgsResponse> => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    metadata,
    metadataId = null,
    royalties = null,
    price,
    mintersAllowlist = null,
    maxSupply = null,
    lastPossibleMint = null,
    isDynamic = null,
    noMedia = false,
    noReference = false,
  } = args;
  
  if (!contractAddress) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (!isStoreV2(contractAddress)) {
    throw new Error(ERROR_MESSAGES.ONLY_V2);
  }

  // Reference and media need to be present or explicitly opted out of
  if (!noReference && !metadata.reference) {
    throw new Error(ERROR_MESSAGES.NO_REFERENCE);
  }
  if (!noMedia && !metadata.media) {
    throw new Error(ERROR_MESSAGES.NO_MEDIA);
  }

  if (metadataId && !isIntString(metadataId)) {
    throw new Error(ERROR_MESSAGES.METADATA_ID_NOT_INT);
  }

  const { royaltyTotal, roundedRoyalties } = processRoyalties(royalties);

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      metadata: metadata,
      metadata_id: metadataId,
      // 10_000 = 100% (see above note)
      royalty_args: !royaltyTotal ? null : { split_between: roundedRoyalties, percentage: Math.round(royaltyTotal * 10000) },
      minters_allowlist: mintersAllowlist,
      max_supply: maxSupply,
      last_possible_mint: lastPossibleMint ? (+lastPossibleMint * 1e6).toString() : null,
      is_dynamic: isDynamic,
      price: new BN(price * 1e6).mul(new BN(`1${'0'.repeat(18)}`)).toString(),
    },
    methodName: TOKEN_METHOD_NAMES.CREATE_METADATA,
    gas: GAS,
    deposit: createMetadataDeposit({
      nRoyalties: !royalties ? 0 : Object.keys(royalties)?.length,
      nMinters: !mintersAllowlist? 0 : mintersAllowlist.length,
      metadata,
    }),
  };
};

export function createMetadataDeposit({
  nRoyalties,
  nMinters,
  metadata,
}: {
  nRoyalties: number;
  nMinters: number;
  metadata: TokenMetadata;
}): string {
  const metadataBytesEstimate = JSON.stringify(metadata).length;
  // storage + nRoyalties * common + nMinters * common + 2 * common
  const totalBytes = 2 * STORAGE_BYTES.COMMON +
    STORAGE_BYTES.MINTING_FEE +
    metadataBytesEstimate +
    STORAGE_BYTES.COMMON * nRoyalties +
    STORAGE_BYTES.COMMON * nMinters;

  return `${Math.ceil(totalBytes)}${'0'.repeat(STORAGE_PRICE_PER_BYTE_EXPONENT)}`;
}
