// Mintbase token contract JS implementation

type SingleTokenArgs = {
  nftContractId: string;
  tokenId: string;
};

type BatchTokenArgs = {
  nftContractId: string;
  tokenIds: string[];
};

export const transfer = (args: SingleTokenArgs): void => {
  const { nftContractId, tokenId } = args;

  return;
};

export const batchTransfer = (args: BatchTokenArgs): void => {
  const { nftContractId, tokenIds } = args;

  return;
};

export const burn = (args: BatchTokenArgs): void => {
  const { nftContractId, tokenIds } = args;

  return;
};

export const deployContract = (): void => {
  return;
};

export const transferContractOwnership = (): void => {
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

export const revokeAllow = (args: SingleTokenArgs): void => {
  const { nftContractId, tokenId } = args;
  return;
};
export const revokeAllAllow = (args: SingleTokenArgs): void => {
  const { nftContractId, tokenId } = args;
  return;
};
