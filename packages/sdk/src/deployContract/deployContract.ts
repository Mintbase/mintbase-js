/* eslint-disable @typescript-eslint/camelcase */
import { mbjs } from '../config';
import { CONTRACT_DEPOSIT, DEFAULT_MB_LOGO, GAS_CONSTANTS, TOKEN_CONTRACT_SPEC } from '../constants';
import { NearContractCall } from '../execute';
import { TOKEN_METHOD_NAMES } from '../types';


export type DeployContractArgs = {
    factoryContractId?: string;
    name: string;
    ownerId: string;
    metadata: {
      symbol: string;
      icon?: string;
      baseUri?: string;
      reference?: string;
      referenceHash?: string;
    };
  };

/**
 * Deploys a contract from a certain contractFactoryId
 * @param DeployContractArgs {@link DeployContractArgs}
 * @returns contract call to be passed to @mintbase-js/sdk execute method
 */
export const deployContract = (args: DeployContractArgs): NearContractCall=> {
  const { name, factoryContractId = mbjs.keys.tokenAddress, ownerId, metadata } = args;

  const { symbol, icon = DEFAULT_MB_LOGO, baseUri = null, reference = null, referenceHash = null } = metadata;

  return {
    contractAddress: factoryContractId || mbjs.keys.tokenAddress,
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

function standardizeString(name: string): string {
  return name.replace(/[^a-z0-9]+/gim, '').toLowerCase();
}
