import 'isomorphic-unfetch'
import firebase from 'firebase/app'
import 'firebase/storage'
import { isNode } from 'browser-or-node'
import { v4 as uuidv4 } from 'uuid'
import {
  CLOUD_GET_FILE_METADATA_URI,
  CLOUD_POST_METADATA_URI,
  CLOUD_STORAGE_CONFIG,
} from '../constants'

if (!firebase.apps.length) {
  firebase.initializeApp(CLOUD_STORAGE_CONFIG)
}

const storage = firebase.storage()
const ARWEAVE_FOLDER = 'arweave'

const headers = {
  apiKey: 'api-key',
}

/**
 * Uploads raw binary data to the cloud. This method is useful because
 * we can trigger an arweave upload via an http request with the returned file name.
 * @param buffer the raw binary data of the file to upload
 * @param contentType the content type
 * @returns the filename
 */
const _uploadCloud = async (
  buffer: ArrayBuffer | Buffer,
  contentType: string
): Promise<string> => {
  if (isNode) throw new Error('Node environment does not yet supports uploads.')

  const fileName = uuidv4()

  try {
    await storage
      .ref(`${ARWEAVE_FOLDER}/${fileName}`)
      .put(buffer, { contentType: contentType })
  } catch (error) {
    return error
  }

  return fileName
}

/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */
export const uploadToArweave = async (
  file: File,
  apiKey?: string
): Promise<{ id: string; contentType: string }> => {
  if (isNode) throw new Error('Node environment does not yet supports uploads.')

  const buffer = await file.arrayBuffer()
  const contentType = file.type

  try {
    // Uploads to google cloud
    const fileName = await _uploadCloud(buffer, contentType)

    // Fetches arweave id. This request will trigger an upload in the cloud
    const request = await fetch(CLOUD_GET_FILE_METADATA_URI(fileName), {
      headers: {
        [headers.apiKey]: apiKey || 'anonymous',
      },
    })

    const data = await request.json()

    return { id: data?.id, contentType: data?.contentType }
  } catch (error) {
    return error
  }
}

/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */
export const uploadMetadata = async (
  metadata: unknown,
  apiKey?: string
): Promise<string> => {
  try {
    const request = await fetch(CLOUD_POST_METADATA_URI(), {
      method: 'POST',
      body: JSON.stringify(metadata),
      headers: {
        [headers.apiKey]: apiKey || 'anonymous',
      },
    })
    const data = await request.json()

    return data?.id as string
  } catch (error) {
    return error
  }
}
