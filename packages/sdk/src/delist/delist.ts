import { DEFAULT_CONTRACT_ADDRESS, GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';
import { NearContractCall } from '../execute';

type DelistArgs = {
    nftContractId?: string;
    tokenId: string;
    marketId?: string;
}

export const delist = (
  args: DelistArgs,
): NearContractCall => {
  const { nftContractId = DEFAULT_CONTRACT_ADDRESS, tokenId, marketId } = args;
  
  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID enviroment variable to default to');
  }

  return {
    contractAddress: nftContractId,
    args: {
      ...(marketId) && { account_id: marketId },
      token_id: tokenId,
    },
    methodName: marketId? TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE :TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};
