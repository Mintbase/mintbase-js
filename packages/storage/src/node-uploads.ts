import { mbjs } from '@mintbase-js/sdk';
import FormData from 'form-data';

import {
  ANON_USER_WARNING,
  ARWEAVE_SERVICE_HOST,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_ERROR_MSG,
  MINTBASE_API_ANON_USER,
  MINTBASE_API_KEY_HEADER,
} from './constants';
import { ArweaveResponse } from './types';
/**
 * (Browser) upload a json reference object via POST to upload service
 * @param ReferenceObject A json reference object to upload
 */
export const uploadBuffer = async (
  buffer: Buffer,
  mimeType: string,
  fileName: string,
): Promise<ArweaveResponse> => {

  if (mbjs.keys.apiKey == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }

  if (buffer.length > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_UPLOAD_ERROR_MSG);
  }

  const formData = new FormData();
  formData.append('file', buffer, {
    contentType: mimeType,
    filename: fileName,
  });

  try {
    const res = await fetch(ARWEAVE_SERVICE_HOST, {
      method: 'POST',
      headers: {
        'mb-api-key': mbjs.keys.apiKey || 'anon',
        ...formData.getHeaders(),
      },
      body: formData as unknown as BodyInit,
      redirect: 'follow',
    });

    if (res.status !== 200) {
      throw new Error(
        `Error uploading via arweave service: ${JSON.stringify(await res.json())}`,
      );
    }

    const result = (await res.json()) as {
      id: string;
      block: string;
      name: string;
      mimeType: string;
    };

    return result;
  } catch (error: unknown) {
    console.error('Uploading file to arweave failed');
    throw error;
  }
};
