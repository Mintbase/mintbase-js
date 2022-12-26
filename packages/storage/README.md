[//]: # `{ "title": "@mintbase-js/storage", "order": 3 }`

# Storage

Convenience methods for storing NFT reference materials.

Currently we support Arweave via hosted service. **You will need a new API key for this**.

Please get in touch through Telegram if you are interested in using the new service.

# Arweave

Arweave is a decentralized storage network that allows users to store data permanently and immutably on the blockchain. The Arweave network is based on a data structure called a blockweave, which is a variant of a blockchain that is optimized for storing data rather than transactions.

In the Arweave network, each piece of data is stored as a block, and each block has a unique hash associated with it. This hash, known as the "Arweave hash," is used to identify and locate the block on the network. The Arweave hash is generated using a cryptographic hash function, which takes the content of the block as input and produces a fixed-size output (the hash) that is unique to that particular block.

The Arweave hash serves several important purposes in the network. First and foremost, it is used to verify the integrity and authenticity of the data stored in a block. Because the hash is generated based on the content of the block, any change to the data will result in a different hash being generated. This makes it easy to detect tampering or changes to the data stored on the network.

In addition, the Arweave hash is used to locate and retrieve blocks from the network. When a user wants to access a particular block, they can use the Arweave hash to find and retrieve it. This is made possible by the decentralized nature of the Arweave network, which allows users to store and retrieve data without the need for a centralized server or database.

Overall, the Arweave hash is an important component of the Arweave network, providing a secure and efficient way to store and access data on the blockchain.

# Upload in the Browser

It's possible to use [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to upload a file using a browser.
## uploadFile(file: File): ArweaveResponse

`uploadFile` takes a single argument of type File

```typescript

export type ArweaveResponse = {
  // Arweave hash. Concatenate 'https://arweave.net/' with the id to retrieve the file. See above an explanation of how Arweave works.
  id: string;
  // Arweave block. See above an explanation of how Arweave works.
  block: string;
  // The file's name.
  name: string;
  // The file's content type.
  mimeType: string;
}

```


Example usage of storage method in a hypothetical React component:
{% code title="StorageUI.ts" overflow="wrap" lineNumbers="true" %}

```tsx

import { useState } from 'react';
import { uploadFile } from '@mintbase/storage';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const uploadResult = await uploadFile(file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

```
{% endcode %}