import BN from 'bn.js';
import { mbjs } from '../config/config';
import { GAS, MAX_GAS, ONE_YOCTO, STORAGE_BYTES, STORAGE_PRICE_PER_BYTE_EXPONENT } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { EmptyObject, FT_METHOD_NAMES, FtTransferCallArgsResponse, MintOnMetadataArgs, MintOnMetadataArgsResponse, NearContractCall, TOKEN_METHOD_NAMES } from '../types';
import { isIntString, isStoreV2 } from '../utils';

type DepositAndMintCalls = [NearContractCall<EmptyObject>, NearContractCall<MintOnMetadataArgsResponse | FtTransferCallArgsResponse>]

/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const mintOnMetadata = (
  args: MintOnMetadataArgs,
): DepositAndMintCalls  => {
  const {
    contractAddress = mbjs.keys.contractAddress,
    metadataId,
    ownerId,
    amount = null,
    tokenIds = null,
    price,
    ftAddress,
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

  if (tokenIds && tokenIds.length === 0) {
    throw new Error(ERROR_MESSAGES.EMPTY_TOKEN_IDS);
  }

  if (amount && tokenIds && tokenIds.length !== amount) {
    throw new Error(ERROR_MESSAGES.MUTUAL_EXCLUSIVE_AMOUNT);
  }
  const amountCalc = amount || (tokenIds && tokenIds.length) || 1;
  if (amountCalc> 99 || amountCalc < 1) {
    throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
  }

  if (tokenIds && !tokenIds.every(isIntString)) {
    throw new Error(ERROR_MESSAGES.TOKEN_ID_NOT_INT);
  }

  const mintArgs = {
    metadata_id: metadataId,
    owner_id: ownerId,
    num_to_mint: tokenIds ? null : amountCalc,
    token_ids: tokenIds,
  };
  const storageDeposit = depositMintingStorage(
    contractAddress, mintOnMetadataDeposit(amountCalc),
  );
  const totalPrice = new BN(`1${'0'.repeat(24)}`).muln(price).muln(amountCalc).toString();

  if (ftAddress) {
    return [
      storageDeposit,
      {
        contractAddress: ftAddress,
        args: {
          receiver_id: contractAddress,
          amount: totalPrice,
          msg: JSON.stringify(mintArgs),
          memo: null,
        },
        methodName: FT_METHOD_NAMES.FT_TRANSFER_CALL,
        deposit: ONE_YOCTO,
        gas: MAX_GAS,
      },
    ];
  }

  return [
    storageDeposit,
    {
      contractAddress: contractAddress || mbjs.keys.contractAddress,
      args: mintArgs,
      methodName: TOKEN_METHOD_NAMES.MINT_ON_METADATA,
      gas: GAS,
      deposit: totalPrice,
    },
  ];
};

const depositMintingStorage = (
  contractAddress: string, amount: string,
): NearContractCall<EmptyObject> => ({
  contractAddress,
  args: {},
  methodName: TOKEN_METHOD_NAMES.DEPOSIT_STORAGE,
  gas: GAS,
  deposit: amount,
});


export function mintOnMetadataDeposit(nTokens: number): string {
  const totalBytes = STORAGE_BYTES.MINTING_BASE +
    STORAGE_BYTES.MINTING_FEE +
    (STORAGE_BYTES.TOKEN_BASE + STORAGE_BYTES.COMMON) * nTokens;
  const storageCost = new BN(`${Math.ceil(totalBytes)}${'0'.repeat(STORAGE_PRICE_PER_BYTE_EXPONENT)}`);
  return storageCost.toString();
}
