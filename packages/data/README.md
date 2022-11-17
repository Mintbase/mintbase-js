[//]: # `{ "title": "@mintbase-js/data", "order": 1 }`
# Fetching Data From the Indexer

## For now, use our GraphQL schemas

For as long as we have had an indexer, we have relied on GraphQL to provide Mintbase Builders with a flexible and efficient way to query data any way they like.

While we will continue to provide public and our new mb_views schema objects, we will also begin to introduce helper methods here that can be used to query data **without having to write any graphql**.

For now, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph) and be sure to check back here soon for updates concerning our [data layer API](src/api/).