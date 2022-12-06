import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

type UnlistArgs = {
    nftContractId?: string;
    tokenId: string;
    marketAddress?: string;
}

export const unlist = (
  args: UnlistArgs,
): NearContractCall => {
  const { nftContractId = DEFAULT_CONTRACT_ADDRESS, tokenId, marketAddress } = args;
  
  if (nftContractId == null) {
    throw ('You must provide a nftContractId or define a TOKEN_CONTRACT enviroment variable to default to');
  }

  return {
    contractAddress: nftContractId,
    args: {
      ...(marketAddress) && { account_id: marketAddress },
      token_id: tokenId,
    },
    methodName: marketAddress? TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE :TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
