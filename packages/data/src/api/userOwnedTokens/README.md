[//]: # `{ "title": "userOwnedTokens", "order": "2.0.17" }`

# userOwnedTokens


{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.

For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}




Returns number of owned tokens by `accountId`.



### getUserOwnedTokens(accountId: string, filters: UserTokensFilter,): Promise<ParsedDataReturn<UserTokensQueryResult>>



This is an example of a data api method.




Example:



{% code title="userOwnedTokens.ts" overflow="wrap" lineNumbers="true" %}

```typescript

import { userOwnedTokens } from  '@mintbase-js/data'

const { data, error } = await getUserOwnedTokens('mintbase1.near', {
      orderBy: 'price asc',
      limit: 10,
      offset: 0,
      listedFilter: true,
    });

if (error) {console.log('error', error)}

console.log(data) // => ...

```

{% endcode %}