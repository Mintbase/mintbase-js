import { ANON_USER_WARNING, ARWEAVE_SERVICE_HOST, MAX_UPLOAD_ERROR_MSG, MINTBASE_API_ANON_USER, MINTBASE_API_KEY, MINTBASE_API_KEY_HEADER } from './constants';
import superagent from 'superagent';

export const MAX_UPLOAD_BYTES = 31_457_280;

export type ArweaveResponse = {
  id: string;
  block: string;
  name: string;
  mimeType: string;
};

type HttpError = {
  status: number;
  response: Response;
};

/**
 * (NodeJS) upload a file via POST to upload service
 * @param file A file to upload
 * @param name The name of the file to upload
 */
export const uploadBuffer = async (
  file: Buffer,
  name: string,
): Promise<ArweaveResponse> => {
  if (MINTBASE_API_KEY == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }

  const size = (file as Buffer).length;

  // if size is more than 30MB, throw since cloud run won't upload.
  if (size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_UPLOAD_ERROR_MSG);
  }

  try {
    const { body } = await superagent
      .post(ARWEAVE_SERVICE_HOST)
      .set({
        [MINTBASE_API_KEY_HEADER]: MINTBASE_API_KEY,
      })
      .attach('up', file, name);
    return body;
  } catch (err: unknown) {
    const httpError = err as HttpError;
    console.error(
      `Uploading file to arweave failed: ${httpError.status} ${httpError.response.text}`,
    );
    throw err;
  }
};

/**
 * (Browser) upload a file via POST to upload service
 * @param file A file to upload
 */
export const uploadFile = async (
  file: File,
): Promise<ArweaveResponse> => {

  if (MINTBASE_API_KEY == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }
  

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_UPLOAD_ERROR_MSG);
  }

  const formdata = new FormData();
  formdata.append('up', file, 'name');

  try {
    const request = await fetch(ARWEAVE_SERVICE_HOST, {
      method: 'POST',
      headers: {
        'mb-api-key': MINTBASE_API_KEY,
      },
      body: formdata,
      redirect: 'follow',
    });

    if (request.status !== 200) {
      throw new Error(
        `Error uploading via arweave service: ${await request.json()}`,
      );
    }

    const result = (await request.json()) as {
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
