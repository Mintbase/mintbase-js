import { DEFAULT_CONTRACT_ADDRESS, GAS, MB_MARKET_ADDRESS, ONE_YOCTO, TOKEN_METHOD_NAMES, MARKET_METHOD_NAMES } from '../constants';
import { ContractCall, NearContractCall } from '../execute';

type DelistArgs = {
    nftContractId?: string;
    tokenIds: string[];
    marketId?: string;
    oldMarket?: boolean;
}

export const delist = (
  args: DelistArgs,
): NearContractCall => {
  const { nftContractId = DEFAULT_CONTRACT_ADDRESS, tokenIds, marketId = MB_MARKET_ADDRESS, oldMarket = false } = args;

  
  if (nftContractId == null) {
    throw new Error('You must provide a nftContractId or define a NFT_CONTRACT_ID enviroment variable to default to');
  }

  if (!(tokenIds instanceof Array)) {
    throw new Error('tokenIds must be an array');
  }

  if (!(tokenIds.length >0)) {
    throw new Error('tokenIds must have more than one element');
  }

  const result: NearContractCall = [];

  //revoke ownership for all tokens
  for (const tokenId of tokenIds) {
    result.push ({
      contractAddress: nftContractId,
      args: {
        token_id: tokenId,
        account_id: marketId,
      },
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      gas: GAS,
      deposit: ONE_YOCTO,
    }as ContractCall) ;
  }
  

  result.push( {
    contractAddress: marketId,
    methodName: oldMarket? MARKET_METHOD_NAMES.UNLIST_OLD_MARKET: MARKET_METHOD_NAMES.UNLIST ,
    gas: GAS,
    args: {
      token_ids: [tokenIds],
      nft_contract_id: nftContractId,
    },
    deposit: ONE_YOCTO,
  } as ContractCall);

  return result as NearContractCall; 
};
