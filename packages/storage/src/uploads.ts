import {
  ANON_USER_WARNING,
  ARWEAVE_SERVICE_HOST,
  MAX_UPLOAD_BYTES,
  MAX_UPLOAD_ERROR_MSG,
  MINTBASE_API_ANON_USER,
  MINTBASE_API_KEY_HEADER,
  OBJECT_IS_EMPTY_ERROR,
} from './constants';
import { mbjs } from '@mintbase-js/sdk';
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
};

type ReferenceObject = {
  title?: string;
  description?: string;
  media?: File | string;
  media_type?: string;
  animation_url?: File | string;
  document?: File | string;
  attributes?: Trait[];
  category?: string;
  tags?: string[];
  extra?: Trait[];
}

type Trait = {
  display_type: string;
  trait_type: string;
  value: number;
}


/**
 * (NodeJS) upload a file via POST to upload service
 * @param file A file to upload
 * @param name The name of the file to upload
 */
export const uploadBuffer = async (
  file: Buffer,
  name: string,
): Promise<ArweaveResponse> => {
  if (mbjs.keys.apiKey == MINTBASE_API_ANON_USER) {
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
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      })
      .attach('file', file, name);
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

  if (mbjs.keys.apiKey == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_UPLOAD_ERROR_MSG);
  }

  const formData = new FormData();
  formData.append('file', file, 'file');

  try {
    const request = await fetch(ARWEAVE_SERVICE_HOST, {
      method: 'POST',
      headers: {
        [MINTBASE_API_KEY_HEADER]: mbjs.keys.apiKey,
      },
      body: formData,
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
/**
 * (Browser) upload a json reference object via POST to upload service
 * @param ReferenceObject A json reference object to upload
 */
export const uploadReference = async (
  referenceObject: ReferenceObject,
): Promise<ArweaveResponse> => {

  if (Object.keys(referenceObject).length == 0) {
    throw new Error(OBJECT_IS_EMPTY_ERROR);
  }

  const formData = getFormDataFromJson(referenceObject);

  try {
    const request = await fetch(`${ARWEAVE_SERVICE_HOST}/reference`, {
      method: 'POST',
      headers: {
        'mb-api-key': mbjs.keys.apiKey,
      },
      body: formData,
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
      media_hash: string;
    };

    return result;
  } catch (error: unknown) {
    console.error('Uploading file to arweave failed');
    throw error;
  }
};

export function getFileFromObject(referenceObject: unknown): File {
  const str = JSON.stringify(referenceObject);
  return new File([str], 'file', {
    type: 'application/json;charset=utf-8',
  });
}

export function getFormDataFromJson(referenceObject: ReferenceObject): FormData {
  const formData = new FormData();

  console.log({ formData });
  Object.entries(referenceObject).forEach((entry) => {

    console.log({ entry });
    const [key, value] = entry;
    const hasCorrectMediaType = (key == 'document' || key == 'media' || key == 'animation_url');
    const notMedia = !hasCorrectMediaType && !(value instanceof File);
    const canBeUploaded = value instanceof File && value.size < MAX_UPLOAD_BYTES;
    const invalidFile = !hasCorrectMediaType && (value instanceof File);
    const mediaTypeWithoutFile = hasCorrectMediaType && (typeof(value) == 'string');

    console.log({ hasCorrectMediaType, notMedia, canBeUploaded, invalidFile, mediaTypeWithoutFile });

    if (invalidFile) {
      // example title: File
      throw new Error('The provided field has a key that is not recognized by our service and will not be uploaded to arweave, try using media, animation_url or document');
    }

    if (mediaTypeWithoutFile) {
      // example: media: ""  -> upload anyways
      console.warn('The provided media type will not be uploaded because its a string and not a file, try attaching files to the following keys: media, animation_url or document');
      formData.append(key, value);
    }
    console.log(typeof(value));
    if (notMedia) {
      if ( typeof(value) == 'string') {
        //fields
        formData.append(key, value);
      } else if (typeof(value) == 'object') {
        //fields
        formData.append(key, JSON.stringify(value));
      }
    } else if (canBeUploaded) {
      //media
      formData.append(key, value);
    }

    console.log('finalFormDATA:', formData);
  });
  return formData;
}
