import { callViewMethod } from '../util';

export type FtMetadata = {
  spec: string;
  name: string;
  symbol: string;
  icon: string | null;
  reference: string | null;
  reference_hash: string | null;
  decimals: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFtMetadata(x: any): x is FtMetadata {
  if (typeof x.spec !== 'string') {
    return false;
  }
  if (typeof x.name !== 'string') {
    return false;
  }
  if (typeof x.symbol !== 'string') {
    return false;
  }
  if (!isStringOrNull(x.icon)) {
    return false;
  }
  if (!isStringOrNull(x.reference)) {
    return false;
  }
  if (!isStringOrNull(x.reference_hash)) {
    return false;
  }
  return typeof x.decimals === 'number';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isStringOrNull(x: any): x is string | null {
  if (typeof x === 'string') {
    return true;
  }
  if (x === null) {
    return true;
  }
  return false;
}

export const ftMetadata = async ({ contractId, network }): Promise<FtMetadata | null> => {
  const res = callViewMethod<FtMetadata>({
    contractId,
    method: 'ft_metadata',
    network: network,
  });

  return isFtMetadata(res) ? res : null;
};
