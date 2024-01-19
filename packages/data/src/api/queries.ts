import { attributesByMetaIdQuery } from './attributesByMetaId/attributesByMetaId.query';
import { checkStoreNameQuery } from './checkStoreName/checkStoreName.query';
import { contractMintersQuery } from './contractMinters/contractMinters.query';
import { ownedNftsByStoreQuery } from './ownedNftsByStore/ownedNftsByStore.query';
import { ownedStoresQuery } from './ownedStores/ownedStores.query';
import { ownedTokensQuery } from './ownedTokens/ownedTokens.query';
import { storeDataQuery } from './storeData/storeData.query';
import { storeNftsQuery } from './storeNfts/storeNfts.query';
import { tokenByIdQuery } from './tokenById/tokenById.query';
import { tokenListingCountsByMetaIdQuery } from './tokenListingCountsByMetaId/tokenListingCountsByMetaId.query';
import { tokenOwnerQuery } from './tokenOwner/tokenOwner.query';
import { tokenOwnersByMetadataIdQuery } from './tokenOwnersByMetadataId/tokenOwnersByMetadataId.query';
import { getTokenProvenance } from './tokenProvenance/tokenProvenance.query';
import { tokensByStatusQuery } from './tokensByStatus/tokensByStatus.query';

export const QUERIES = {
  attributesByMetaIdQuery: attributesByMetaIdQuery,
  checkStoreNameQuery: checkStoreNameQuery,
  ownedNftsByStoreQuery: ownedNftsByStoreQuery,
  ownedStoresQuery: ownedStoresQuery,
  ownedTokensQuery: ownedTokensQuery,
  storeDataQuery: storeDataQuery,
  storeNftsQuery: storeNftsQuery,
  tokenByIdQuery: tokenByIdQuery,
  tokenListingCountsByMetaIdQuery: tokenListingCountsByMetaIdQuery,
  tokenOwnerQuery: tokenOwnerQuery,
  tokenOwnersByMetadataIdQuery: tokenOwnersByMetadataIdQuery,
  getTokenProvenance: getTokenProvenance,
  tokensByStatusQuery: tokensByStatusQuery,
  contractMintersQuery: contractMintersQuery,
};
