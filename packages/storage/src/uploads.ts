import { MINTBASE_API_KEY_HEADER, MINTBASE_API_KEY, MINTBASE_API_ANON_USER } from '@mintbase-js/sdk';
import {  ARWEAVE_SERVICE_HOST, MAX_UPLOAD_ERROR_MSG } from './constants';
import {  ANON_USER_WARNING } from '@mintbase-js/sdk';
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
}

/**
 * upload a file via POST to upload service
 * @param file A file to upload
 * @param name The name of the file to upload
 */
export const uploadFileToArweave = async (
  file: File | Buffer,
  name: string,
): Promise<ArweaveResponse> => {
  if (MINTBASE_API_KEY == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }

  const size = (file as File).size
    ? (file as File).size
    : (file as Buffer).length;

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

// export const uploadBuffer = async (
//   buffer: Buffer,
//   contentType: string,
// ): Promise<string> => {
//   const bundlr = setup(supportedStorageServices.arweave.bundlr);

//   const uploadResult = await bundlr.uploader.upload(buffer, [
//     { name: 'Content-Type', value: contentType },
//   ]);

//   const { data } = uploadResult;

//   return data.id;
// };
