/* eslint-disable @typescript-eslint/camelcase */
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

type RevokeApprovalArgs = {
    nftContractId: string;
    tokenId: string;
    accountToRevokeId?: string;
}

export const revokeApproval = (
  args: RevokeApprovalArgs,
): NearContractCall => {
  const { nftContractId, tokenId, accountToRevokeId } = args;


  return {
    contractAddress: nftContractId,
    args: {
      ...(accountToRevokeId) && { account_id: accountToRevokeId },
      token_id: tokenId,
    },
    methodName: accountToRevokeId? TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE :TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
