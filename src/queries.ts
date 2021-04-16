export const FETCH_MARKETPLACE = `
  query getMyListed($limit: Int!, $offset: Int!) {
    list(
      where: { currentOfferId: { _is_null: true } }
      order_by: [{ createdAt: desc }, { price: asc }]
      limit: $limit
      offset: $offset
    ) {
      id
    }
  }
`
export const GET_LATEST_LIST = `
  query getListedItemsTree($groupId: String!) {
    list(where: { groupId: { _eq: $groupId } }, limit: 1) {
      createdAt
      price
      tokenKey
      acceptedOfferId
      removedAt
      ownerId
      token {
        id
        thingId
        minter
        ownerId
        royaltyPercent
        splits {
          account
          percent
        }
        royaltys {
          account
          percent
        }
        store {
          id
          name
          owner
          createdAt
          things(limit: 5) {
            id
            metaId
          }
        }
      }
    }
  }
`

export const GET_TOKEN_BY_ID = `
  query getToken($tokenId: String!) {
    token(where: {id: {_eq: $tokenId}}) {
      id
      ownerId
      storeId
      thingId
    }
  }
`
export const GET_TOKENS_BY_OWNER_ID = `
  query getToken($ownerId: String!) {
    token(where: {ownerId: {_eq: $ownerId}}) {
      id
      ownerId
      storeId
      tokenId
    }
  }
`
