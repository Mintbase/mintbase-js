import { attributesByMetaIdQuery } from './api/attributesByMetaId/attributesByMetaId.query';
import { ownedNftsByStoreQuery } from './api/ownedNftsByStore/ownedNftsByStore.query';
import { ownedStoresQuery } from './api/ownedStores/ownedStores.query';
import { ownedTokensQuery } from './api/ownedTokens/ownedTokens.query';
import { storeDataQuery } from './api/storeData/storeData.query';
import { storeNftsQuery } from './api/storeNfts/storeNfts.query';
import { tokenByIdQuery } from './api/tokenById/tokenById.query';
import { tokenListingCountsByMetaIdQuery } from './api/tokenListingCountsByMetaId/tokenListingCountsByMetaId.query';
import { tokenOwnerQuery } from './api/tokenOwner/tokenOwner.query';
import { tokenOwnersByMetadataIdQuery } from './api/tokenOwnersByMetadataId/tokenOwnersByMetadataId.query';
import { getTokenProvenanceQuery } from './api/tokenProvenance/tokenProvenance.query';
import { tokensByStatusQuery } from './api/tokensByStatus/tokensByStatus.query';

export const MB_QUERIES = {
  attributesByMetaIdQuery: attributesByMetaIdQuery,
  ownedNftsByStoreQuery: ownedNftsByStoreQuery,
  ownedStoresQuery: ownedStoresQuery,
  ownedTokensQuery: ownedTokensQuery,
  storeDataQuery: storeDataQuery,
  storeNftsQuery: storeNftsQuery,
  tokenByIdQuery: tokenByIdQuery,
  tokenListingCountsByMetaIdQuery: tokenListingCountsByMetaIdQuery,
  tokenOwnerQuery: tokenOwnerQuery,
  tokenOwnersByMetadataIdQuery: tokenOwnersByMetadataIdQuery,
  getTokenProvenanceQuery: getTokenProvenanceQuery,
  tokensByStatusQuery: tokensByStatusQuery,
};
