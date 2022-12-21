[//]: # `{ "title": "upload", "order": 0.1 }`

# Upload in the Browser

It's possible to use [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to upload a file. 


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