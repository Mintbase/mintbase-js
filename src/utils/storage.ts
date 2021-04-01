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

/**
 * Uploads raw binary data to the cloud. This method is useful because
 * we can trigger an arweave upload via an http request with the returned file name.
 * @param buffer the raw binary data of the file to upload
 * @param contentType the content type
 * @returns the filename
 */
export const uploadCloud = async (
  buffer: ArrayBuffer | Buffer,
  contentType: string
): Promise<string> => {
  if (isNode) throw new Error('Node environment does not yet supports uploads.')

  const fileName = uuidv4()

  await storage
    .ref(`${ARWEAVE_FOLDER}/${fileName}`)
    .put(buffer, { contentType: contentType })

  return fileName
}

/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */
export const uploadToArweave = async (
  file: File
): Promise<{ id: string; contentType: string }> => {
  if (isNode) throw new Error('Node environment does not yet supports uploads.')

  const buffer = await file.arrayBuffer()
  const contentType = file.type

  // Uploads to google cloud
  const fileName = await uploadCloud(buffer, contentType)

  // Fetches arweave id. This request will trigger an upload in the cloud
  const request = await fetch(CLOUD_GET_FILE_METADATA_URI(fileName))

  const data = await request.json()

  return { id: data?.id, contentType: data?.contentType }
}

/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */
export const uploadMetadata = async (metadata: unknown): Promise<string> => {
  const request = await fetch(CLOUD_POST_METADATA_URI(), {
    method: 'POST',
    body: JSON.stringify(metadata),
  })
  const data = await request.json()

  return data?.id as string
}
