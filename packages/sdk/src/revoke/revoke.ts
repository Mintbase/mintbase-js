/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

type RevokeArgs = {
    nftContractId: string;
    tokenId: string;
    accountToRevokeId?: string;
}

export const revoke = (
  args: RevokeArgs,
): NearContractCall => {
  const { nftContractId, tokenId, accountToRevokeId } = args;


  return {
    contractAddress: nftContractId,
    args: {
      ...(accountToRevokeId) && { account_id: accountToRevokeId },
      token_id: tokenId,
    },
    methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
