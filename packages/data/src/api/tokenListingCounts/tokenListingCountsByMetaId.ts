
import { NftTokensAggregate } from '../../graphql/codegen/graphql';
import { fetchGraphQl } from '../../graphql/fetch';
import { tokenListingCountsByMetaIdQuery } from './tokenListingCountsByMetaId.query';

export type TokenListingCounts = {
  totalTokensCount: number;
  simpleListingCount: number;
  auctionListingsCount: number;
  totalListingsCount: number;
  displayTotalListings: number;
}

export type TokenListingQueryResults = {
  tokensCount: NftTokensAggregate;
  simpleListingsCount: NftTokensAggregate;
  auctionListingsCount: NftTokensAggregate;
}

export const tokenListingCountsByMetaId = async (
  metadataId: string,
): Promise<TokenListingCounts> => {
  const { data, error } = await fetchGraphQl<TokenListingQueryResults>({
    query: tokenListingCountsByMetaIdQuery,
    variables: {
      metadataId,
    },
  });

  // log and rethrow for now...
  // question: do we want to use the same { error, data } pattern in these
  // methods as well?
  if (error) {
    console.error('Error fetching token listing counts', error.message);
    throw error;
  }

  // it is possible for more listings than tokens to exist due to
  // multiple markets, add a display total that is capped at total tokens
  const totalTokensCount = Number(data.tokensCount.aggregate.count);
  const simpleListingCount = Number(data.simpleListingsCount.aggregate.count);
  const auctionListingsCount = Number(data.auctionListingsCount.aggregate.count);
  const totalListingsCount = simpleListingCount + auctionListingsCount;
  const displayTotalListings = totalListingsCount > totalTokensCount
    ?  totalTokensCount
    : totalListingsCount;

  return {
    totalListingsCount,
    totalTokensCount,
    simpleListingCount,
    auctionListingsCount,
    displayTotalListings,
  };
};
