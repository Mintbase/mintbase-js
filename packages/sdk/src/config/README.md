[//]: # `{ "title": "config", "order": 0.01 }`
# Config

This is the method to setup the global variables object on all your mintbase-js packages.

You can set them in three ways:

### 1. Use the config method (preferred)
If you want to setup on our config method, simply call the method with your config settings in the main file of your project.

This method will work on both server side and client side.

```typescript
  import { mbjs } from '@mintbase-js/sdk';

    const config = {
        network: 'testnet',
        callbackUrl: 'https://mintbase.xyz/success',
        contractAddress: 'buddha.mintspace2.testnet',
        rpc: 'near'
    }

  mbjs.config(config)

  //can retrieve the keys in any part of your application.
  console.log(mbjs.keys , 'global keys of all mintbase-js packages')
```


### 2. Pass the network directly to methods (where applicable).

Most @mintbase-js/data and @mintbase-js/sdk methods will accept network as an optional argument.

```typescript
  import { tokenById } from '@mintbase-js/data';

  const { data, error } = await tokenById('5','logout.mintbase1.near', 'mainnet');
```

### 3. Use .env files (ex: Next.js, Remix, Express).

```
  NEAR_NETWORK=testnet
  CALLBACK_URL=https://mintbase.xyz/success
  CONTRACT_ADDRESS=buddha.mintspace2.testnet
```

These variables will only work server-side due to limitations of process.env on client-side, however depending on what bundler you are using you may be able to set env variables at build time.

To retrieve env keys client-side, you can pass the keys as prop, ex Next.js 12:

```typescript
  const MyComponent = ({keys}) => {
    console.log('mbjs keys',  keys)
    return <> </>
  }


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

