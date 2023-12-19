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

export const ftBalance = async ({ contractId }): Promise<FtMetadata> => {
  return callViewMethod<FtMetadata>({
    contractId,
    method: 'ft_metadata',
  });
};
