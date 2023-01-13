[//]: # `{ "title": "config", "order": 0.01 }`
# Config

This is the method to setup the global variables object on all your mintbase-js packages.

You can set them in three ways:


- 1. if you want to setup on our config method, in the main file of your project. 

This method will work on both server side and client side.
note: thats the most advisable way to work with global variables on the mb.js packages.

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


- 2. straight on the method itself if it accepts the variable as an argument.

  ```typescript
     import { tokenById } from '@mintbase-js/data';

    const { data, error } = await tokenById( '5','logout.mintbase1.near', 'mainnet');
  ```

- 3. if you running a node.js project (ex: Next.js, Remix, Express) , and have support for process.env you can set your variables straight on .env file

 

  ```
    NEAR_NETWORK=testnet
    CALLBACK_URL=https://mintbase.xyz/success
    CONTRACT_ADDRESS=buddha.mintspace2.testnet
  ```

  but those variables will work on server side only due to limitations of process.env on client-side.

  If you want to retrieve the env keys client-side:

  you can pass the keys as prop, ex Next.js 12:


  ```typescript
    export const getServerSideProps = async ({
      res,
      req,
      query,
    }: GetServerSidePropsContext) => {

      console.log(mbjs.keys, 'server side keys got from .env file')

      return {
        props: {
          keys: mbjs.keys
        }
      }
    }

  ```

