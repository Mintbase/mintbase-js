// Mintbase token contract JS implementation

import { TransactionArgs } from '../calls';
import {
  DEFAULT_MB_LOGO,
  MB_CALLS,
  MB_MAINNET_TOKEN_FACTORY,
  MB_TESTNET_TOKEN_FACTORY,
  Network,
} from './constants';
import {
  TransferArgs,
  BurnArgs,
  SingleTokenArgs,
  DeployTokenContractArgs,
  AccountId,
  TransferTokenContractOwnership,
} from './token.types';

const getFactoryContract = (network: string): AccountId => {
  if (network === Network.MAINNET) return MB_MAINNET_TOKEN_FACTORY;
  else return MB_TESTNET_TOKEN_FACTORY;
};

// TODO: figure out a way to generate gas and deposit for each

export const transfer = (args: TransferArgs): TransactionArgs => {
  const { nftContractId, transfer } = args;

  const isBatchTransfer = transfer.length > 1;

  if (isBatchTransfer) {
    const ids = transfer.map((transferElm) => {
      return [transferElm.receiverId, transferElm.tokenId];
    });

    return {
      contractAddress: nftContractId,
      methodName: MB_CALLS.BATCH_TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_ids: ids,
      },
    };
  } else {
    const receiverId = transfer[0].receiverId;
    const tokenId = transfer[0].tokenId;

    return {
      contractAddress: nftContractId,
      methodName: MB_CALLS.TRANSFER,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        receiver_id: receiverId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId,
      },
    };
  }
};

export const burn = (args: BurnArgs): TransactionArgs => {
  const { nftContractId, tokenIds } = args;

  return {
    contractAddress: nftContractId,
    methodName: MB_CALLS.BATCH_BURN,
    args: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_ids: tokenIds,
    },
  };
};

export const deployContract = (
  args: DeployTokenContractArgs,
): TransactionArgs => {
  const {
    nftContractId,
    factoryContractId,
    network = Network.TESTNET,
    ownerId,
    metadata,
  } = args;

  const { symbol, icon, baseUri, reference, referenceHash } = metadata;

  const data = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    owner_id: ownerId,
    metadata: {
      spec: 'nft-1.0.0',
      name: nftContractId.replace(/[^a-z0-9]+/gim, '').toLowerCase(),
      symbol: symbol.replace(/[^a-z0-9]+/gim, '').toLowerCase(),
      icon: icon ?? DEFAULT_MB_LOGO,
      // eslint-disable-next-line @typescript-eslint/camelcase
      base_uri: baseUri ?? null,
      reference: reference ?? null,
      // eslint-disable-next-line @typescript-eslint/camelcase
      reference_hash: referenceHash ?? null,
    },
  };

  return {
    contractAddress: factoryContractId || getFactoryContract(network),
    methodName: MB_CALLS.DEPLOY_TOKEN_CONTRACT,
    args: { data },
  };
};

export const transferContractOwnership = (
  args: TransferTokenContractOwnership,
): TransactionArgs => {
  return;
};

export const mint = (): void => {
  return;
};

export const mintMore = (): void => {
  return;
};

export const addMinter = (): void => {
  return;
};

export const removeMinter = (): void => {
  return;
};

export const batchChangeMinters = (): void => {
  return;
};

export const revoke = (args: SingleTokenArgs): void => {
  const { nftContractId, tokenId } = args;
  return;
};
export const revokeAll = (args: SingleTokenArgs): void => {
  const { nftContractId, tokenId } = args;
  return;
};
