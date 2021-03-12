export const FETCH_MARKETPLACE = `
  query getMyListed($limit: Int!, $offset: Int!) {
    list(
      where: { currentOfferId: { _is_null: true } }
      order_by: [{ createdAt: desc }, { price: asc }]
      limit: $limit
      offset: $offset
    ) {
      id
      price
      ownerId
      storeId
      createdAt
      groupId
      tokenId
      splits {
        account
        percent
        id
      }
      token {
        thingId
      }
    }
  }
`
