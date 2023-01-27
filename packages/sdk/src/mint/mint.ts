import { mbjs } from '../config/config';
import { GAS, ONE_YOCTO } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { MintArgs, NearContractCall, TOKEN_METHOD_NAMES } from '../types';


/**
 * Mint a token given via reference json on a given contract with a specified owner, amount of copies as well and royalties can be specified via options
 * @param mintArguments {@link MintArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const mint = (
  args: MintArgs,
): NearContractCall => {
  const { contractAddress = mbjs.keys.contractAddress, reference, ownerId, options = {}  } = args;

  const { splits, amount, royaltyPercentage } = options;
  
  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  if (splits) {
    //0.5 -> 5000
    adjustSplitsForContract(splits);
  }

  if (splits && Object.keys(splits).length > 50) {
    throw new Error(ERROR_MESSAGES.MAX_SPLITS);
  }

  if (splits && Object.keys(splits).length < 2) {
    throw new Error(ERROR_MESSAGES.SPLITS);
  }

  if (amount && amount > 99) {
    throw  new Error(ERROR_MESSAGES.MAX_AMOUT);
  }

  if (royaltyPercentage && royaltyPercentage < 0 || royaltyPercentage > 0.5) {
    throw new Error(ERROR_MESSAGES.INVALID_ROYALTY_PERCENTAGE);
  }
  
  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      owner_id: ownerId,
      metadata: {
        reference: reference,
      },
      num_to_mint: amount || 1,
      // 10000 = 100%
      royalty_args: !splits ? null : { split_between: splits, percentage: royaltyPercentage * 10000 }, 
      split_owners: splits || null,
    },
    methodName: TOKEN_METHOD_NAMES.MINT,
    gas: GAS,
    deposit: ONE_YOCTO,
  };
};

function adjustSplitsForContract(splits: Record<string, number> ): void {
  let counter = 0;
  Object.keys(splits).forEach(key => {
    counter += splits[key];
    console.log(counter);
    splits[key] *= 10000;
  });
  if (counter != 1) {
    throw new Error (ERROR_MESSAGES.SPLITS_PERCENTAGE);
  }
}
