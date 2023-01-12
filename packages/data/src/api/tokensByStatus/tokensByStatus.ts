import { Network } from '@mintbase-js/sdk';
import { fetchGraphQl } from '../../graphql/fetch';
import { ParsedDataReturn } from '../../types';
import { parseData, getTokenArrayFromNodes } from '../../utils';
import { TokenByStatusQueryResults, TokensByStatus } from './tokenByStatus.types';
import { tokensByStatusQuery } from './tokensByStatus.query';


export const tokensByStatus = async (metadataId: string, ownedBy?: string,network?: Network ): Promise<ParsedDataReturn<TokensByStatus>> => {
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
