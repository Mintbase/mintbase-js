import { ANON_USER_WARNING, ARWEAVE_SERVICE_HOST, MAX_UPLOAD_ERROR_MSG, MINTBASE_API_ANON_USER, MINTBASE_API_KEY, MINTBASE_API_KEY_HEADER } from './constants';
import superagent from 'superagent';

export const MAX_UPLOAD_BYTES = 31_457_280;
export const OBJECT_IS_EMPTY_ERROR = 'Provided object is empty';
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

type ReferenceObject = any & {
  title?: string;
  description?: string;
  media?: File;
  animation_url?: File;
  document?: File;
  attributes?: Trait[];
  category?: string;
  tags?: string[];
  extra?: Trait[] | any;
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

  if (MINTBASE_API_KEY == MINTBASE_API_ANON_USER) {
    console.warn(ANON_USER_WARNING);
  }


  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(MAX_UPLOAD_ERROR_MSG);
  }

  const formdata = new FormData();
  formdata.append('file', file, 'file');

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
  
  const formdata = getFormDataFromJson(referenceObject);
  

  try {
    const request = await fetch(`${ARWEAVE_SERVICE_HOST}/reference`, {
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

export function getFileFromObject(referenceObject: unknown): File {
  const str = JSON.stringify(referenceObject);
  return new File([str], 'file', {
    type: 'application/json;charset=utf-8',
  });
}

export function getFormDataFromJson(referenceObject: ReferenceObject): FormData {
  const formdata = new FormData();
  Object.entries(referenceObject).forEach((entry) => {
    const [key, value] = entry;
    const hasCorrectMediaType = (key == 'document' || key == 'media' || key == 'animation_url');
    const notMedia = !hasCorrectMediaType && !(value instanceof File);
    const canBeUploaded = value instanceof File && value.size < MAX_UPLOAD_BYTES; 
    const invalidFile = !hasCorrectMediaType && (value instanceof File);
    const mediaTypeWithoutFile = hasCorrectMediaType && (typeof(value) == 'string');

    if (invalidFile) {
      // example title: File 
      throw new Error('The provided field has a key that is not recognized by our service and will not be uploaded to arweave, try using media, animation_url or document');
    }

    if (mediaTypeWithoutFile) {
      // example: media: ""  -> upload anyways
      console.warn('The provided media type will not be uploaded because its a string and not a file, try attaching files to the following keys: media, animation_url or document');
      formdata.append(key, value);
    }

    if (notMedia && typeof(value) == 'string') {
      //fields
      formdata.append(key, value);
    } else if (canBeUploaded) {
      //media
      formdata.append(key, value);
    }
  });
  return formdata;
}
