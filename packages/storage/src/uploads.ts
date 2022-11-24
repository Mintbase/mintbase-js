import { MINTBASE_API_KEY_HEADER, MINTBASE_API_KEY, MINTBASE_API_ANON_USER } from '@mintbase-js/sdk';
import { ARWEAVE_SERVICE_HOST, supportedStorageServices } from './constants';
import { setup } from './services';
import FormData from 'form-data';
import superagent from 'superagent';

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
  file: File | Buffer | unknown,
  name: string,
): Promise<ArweaveResponse> => {
  if (MINTBASE_API_KEY == MINTBASE_API_ANON_USER) {
    console.warn('Warning: you are using the anonymous mintbase api key. You may want to specify yours.');
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

export const uploadBuffer = async (
  buffer: Buffer,
  contentType: string,
): Promise<string> => {
  const bundlr = setup(supportedStorageServices.arweave.bundlr);

  const uploadResult = await bundlr.uploader.upload(buffer, [
    { name: 'Content-Type', value: contentType },
  ]);

  const { data } = uploadResult;

  return data.id;
};
