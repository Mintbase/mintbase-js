import { NearContractCall } from '../execute';
import { GAS, ONE_YOCTO, TOKEN_METHOD_NAMES } from '../constants';

export type BurnArgs = {
  nftContractId: string;
  tokenIds: string[];
};

export const DEPOSIT_FOR_BURN = ONE_YOCTO;
export const GAS_FOR_BURN = GAS;
export const DEFAULT_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT || null;

/**
 * Burns one or more tokens from a given contract.
 * @param burnArguments {@link BurnArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const burn = ({ tokenIds, nftContractId = DEFAULT_CONTRACT_ADDRESS }: BurnArgs): NearContractCall => {

  if (tokenIds.length === 0) {
    console.error('Burn contract call should not have an empty array of tokens ids');
  }

  return {
    contractAddress: nftContractId,
    methodName: TOKEN_METHOD_NAMES.BATCH_BURN,
    args: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_ids: tokenIds,
    },
    deposit: DEPOSIT_FOR_BURN,
    gas: GAS_FOR_BURN,
  };
};
