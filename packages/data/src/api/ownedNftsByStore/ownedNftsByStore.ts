import { fetchGraphQl } from '../../graphql/fetch';
import { ownedNftsByStoreQuery } from './ownedNftsByStore.query';
import { NftsByStoreData, OwnedNftsData } from './ownedNftsByStore.types';


export const ownedNftsByStore = async (
  ownerId: string,
  contractAddress: string,
  pagination: { limit: number; offset?: number},
): Promise<NftsByStoreData> => {


  const wrongParams = typeof pagination?.limit === 'undefined' || typeof ownerId === 'undefined' || pagination?.limit < 1;

  if (wrongParams) {
    console.error(`Error fetching nfts from ${ownerId}, please check the arguments provided`);
    return null;
  }

  const { data, error } = await fetchGraphQl<OwnedNftsData>({
    query: ownedNftsByStoreQuery,
    variables: {
      accountId: ownerId,
      contractAddress: contractAddress,
      limit: pagination?.limit ?? 12,
      offset: pagination?.offset ?? 0,
    },
  });

  if (error) {
    console.error(`Error fetching nfts from ${ownerId}`, error.message);
    throw error;
  }

  return { data: data , error:error };
};
