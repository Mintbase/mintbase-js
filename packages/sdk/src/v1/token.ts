// Mintbase token contract JS implementation

import { TransactionArgs, TransactionAttachments } from '../execute';
import {
  TOKEN_METHOD_NAMES,
  GAS_CONSTANTS,
  DEPOSIT_CONSTANTS,
} from '../constants';
import {
  MintArgs,
  RevokeAccountArgs,
} from './token.types';


export const mint = (
  args: MintArgs,
): TransactionArgs & TransactionAttachments => {
  const { nftContractId  } = args;

  return {
    contractAddress: nftContractId,
    args: {},
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
  };
};

// TODO: do we want this method? How can we reuse `mint` instead of having an extra method
export const mintMore = (): void => {
  return;
};


export const revoke = (
  args: RevokeAccountArgs,
): TransactionArgs & TransactionAttachments => {
  const { nftContractId, tokenId, accountToRevokeId } = args;

  if (accountToRevokeId) {
    return {
      contractAddress: nftContractId,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_id: accountToRevokeId,
      },
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      gas: GAS_CONSTANTS.DEFAULT_GAS,
      deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
    };
  } else {
    return {
      contractAddress: nftContractId,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId,
      },
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
      gas: GAS_CONSTANTS.DEFAULT_GAS,
      deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
    };
  }
};
