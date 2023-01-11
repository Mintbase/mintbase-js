[//]: # `{ "title": "config", "order": 0.01 }`
# Config

This is the method to setup the global variables object on all your mintbase-js packages.

You can set them in three ways:

- 1. straight on the method itself if it accepts the variable as an argument.

  ```typescript
      connect(
        accountId: string,
        keyStore: Keystore,
        network: NearNetwork = 'testnet'
      ): Promise<Account>
  ```

- 2. if you running a node.js project (ex: Next.js, Remix, Express) , and have support for process.env you can set your variables straight on .env file

  ```
  NEAR_NETWORK=testnet
  CALLBACK_URL=https://mintbase.xyz/success
  CONTRACT_ADDRESS=buddha.mintspace2.testnet
  ```

- 3. if you want to setup on our config method, in the main file of your project. 

```typescript
      import { mbjs } from '@mintbase-js/sdk';

      const config = {
        network: 'testnet'
        callbackUrl: 'https://mintbase.xyz/success'
        contractAddress: 'buddha.mintspace2.testnet'
      }

      mbjs.config(config)

      //can retrieve the keys in any part of your application.
      console.log(mbjs.keys , 'global keys of all mintbase-js packages')
```