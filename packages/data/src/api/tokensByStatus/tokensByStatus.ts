import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData, getTokenArrayFromNodes } from '../../utils';
import { TokenByStatusProps, TokenByStatusQueryResults, TokensByStatus } from './tokenByStatus.types';
import { tokensByStatusQuery } from './tokensByStatus.query';


export const tokensByStatus =
async ({ metadataId, ownedBy, network }: TokenByStatusProps): Promise<ParsedDataReturn<TokensByStatus>> => {
  const { data, error } = await fetchGraphQl<TokenByStatusQueryResults>({
    query: tokensByStatusQuery,
    variables: {
      metadataId,
      ownedBy,
    },
    ...(network && { network:network }),
  });

  const errorMsg = error? `Error fetching token listing by status', ${error}`: '';
  const unburnedTokens = getTokenArrayFromNodes(data?.unburnedTokens?.nodes);
  const listedTokens =  getTokenArrayFromNodes(data?.listedTokens?.nodes);

  const finalData = {
    listedTokens: getTokenArrayFromNodes(data?.listedTokens?.nodes),
    burnedTokens: getTokenArrayFromNodes(data?.burnedTokens?.nodes),
    unlistedTokens: unburnedTokens?.filter((el: string) => !listedTokens.includes(el)),
  };

  return parseData(finalData, error, errorMsg);
};


export const tokensByStatusThrowOnError = async (metadataId: string, ownedBy?: string, network?: Network ): Promise<TokensByStatus> => {
  const { data, error } = await tokensByStatus({ metadataId, ownedBy, network });
  if (error) {
    console.error(`An error occurred fetching tokensByStatus ${error}`);
    throw error;
  }
  return data;
};
