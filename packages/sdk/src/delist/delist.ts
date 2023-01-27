import { mbjs } from '../config/config';
import {  GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { ContractCall, NearContractCall } from '../execute';
import { TOKEN_METHOD_NAMES, MARKET_METHOD_NAMES } from '../types';

type DelistArgs = {
  contractAddress: string;
    tokenIds: string[];
    marketAddress?: string;
    oldMarket?: boolean;
}

export const delist = (
  args: DelistArgs,
): NearContractCall => {
  const { contractAddress = mbjs.keys.contractAddress, tokenIds, marketAddress = mbjs.keys.marketAddress, oldMarket = false } = args;

  
  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (!(tokenIds instanceof Array)) {
    throw new Error(ERROR_MESSAGES.TOKEN_NOT_ARRAY);
  }

  if (!(tokenIds.length >0)) {
    throw new Error(ERROR_MESSAGES.TOKEN_LENGTH);
  }

  const result: NearContractCall = [];

  //revoke ownership for all tokens
  for (const tokenId of tokenIds) {
    result.push ({
      contractAddress: contractAddress || mbjs.keys.marketAddress,
      args: {
        token_id: tokenId,
        account_id: marketAddress || mbjs.keys.marketAddress,
      },
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      gas: GAS,
      deposit: ONE_YOCTO,
    }as ContractCall) ;
  }
  

  result.push( {
    contractAddress: marketAddress || mbjs.keys.marketAddress,
    methodName: oldMarket? MARKET_METHOD_NAMES.UNLIST_OLD_MARKET: MARKET_METHOD_NAMES.UNLIST ,
    args: {
      token_ids: tokenIds,
      nft_contract_id: contractAddress || mbjs.keys.marketAddress,
    },
    gas: GAS,
    deposit: ONE_YOCTO,
  } as ContractCall);

  return result as NearContractCall; 
};
