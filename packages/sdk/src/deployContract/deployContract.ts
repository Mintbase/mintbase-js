/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config/config';
import { CONTRACT_DEPOSIT, DEFAULT_MB_LOGO, GAS_CONSTANTS, TOKEN_CONTRACT_SPEC } from '../constants';
import { DeployContractArgs, DeployContractArgsResponse, NearContractCall, TOKEN_METHOD_NAMES } from '../types';
import { standardizeString } from '../utils';

const ARWEAVE_BASE_URI = 'https://arweave.net';

/**
 * Deploys a contract from a certain contractFactoryId
 * @param DeployContractArgs {@link DeployContractArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const deployContract = (args: DeployContractArgs): NearContractCall<DeployContractArgsResponse> => {
  const { name, factoryContractId = mbjs.keys.mbContract, ownerId, metadata } = args;

  const { symbol, icon = DEFAULT_MB_LOGO, baseUri = ARWEAVE_BASE_URI, reference = null, referenceHash = null } = metadata;

  return {
    contractAddress: factoryContractId || mbjs.keys.mbContract,
    methodName: TOKEN_METHOD_NAMES.DEPLOY_TOKEN_CONTRACT,
    args: {
      owner_id: ownerId,
      metadata: {
        spec: TOKEN_CONTRACT_SPEC,
        name: standardizeString(name),
        symbol: standardizeString(symbol),
        icon: icon,
        base_uri: baseUri,
        reference: reference,
        reference_hash: referenceHash,
      },
    },
    gas: GAS_CONSTANTS.DEFAULT_GAS,
    deposit: CONTRACT_DEPOSIT,
  };
};
