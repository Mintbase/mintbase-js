[//]: # `{ "title": "@mintbase-js/rpc", "order": "5" }`

# Interacting with the NEAR RPC

This module bundles all possible interactions with NEAR RPC, such as inspecting
the current block height or a transaction status.

# config vars

You can set and NEED to set the Near Network you gonna use on your app in three ways:

 - adding the param straight on the methods that accepts it. ex:
    
    ```typescript
    connect(
        accountId: string,
        keyStore: Keystore,
        network: NearNetwork = 'testnet'
      ): Promise<Account>
    ```
 - if your project is built on a node.js env you can set as an .env variable:
   ```
    NEAR_NETWORK=testnet
    CALLBACK_URL=https://mintbase.xyz/success
    CONTRACT_ADDRESS=buddha.mintspace2.testnet
    ````

 - On a global config method on your main file ex:
  ```typescript
   import { mbjs } from '@mintbase-js/sdk';

      const config = {
        network: 'testnet',
        callbackUrl: 'https://mintbase.xyz/success',
        contractAddress: 'buddha.mintspace2.testnet'
      }

      mbjs.config(config)

   //can retrieve the keys in any part of your application.
   console.log(mbjs.keys , 'global keys of all mintbase-js packages')

   ```  

read more on config global variables on : [Config SDK method](https://docs.mintbase.io/dev/mintbase-sdk-ref/sdk/config)