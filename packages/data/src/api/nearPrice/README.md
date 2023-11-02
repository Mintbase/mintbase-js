[//]: # `{ "title": "nearPrice", "order": "2.0.11" }`

# nearPrice

{% hint style="warning" %}

This is a work in progress, please reach out to us on [Telegram](https://t.me/mintdev) for support.
For the most reliable data, reference our [existing graphql docs](https://docs.mintbase.io/dev/read-data/mintbase-graph).

{% endhint %}

Returns near price in usd.

### nearPrice()

This is an example of a data api method.

Example:

{% code title="nearPrice.ts" overflow="wrap" lineNumbers="true" %}

```typescript
import { nearPrice } from "@mintbase-js/data";

const { data } = await nearPrice();


console.log(data); // => "1.49000"
```

{% endcode %}
