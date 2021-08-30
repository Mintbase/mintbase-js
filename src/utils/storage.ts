import 'isomorphic-unfetch'
import firebase from 'firebase/app'
import 'firebase/storage'
import { isNode } from 'browser-or-node'
import { v4 as uuidv4 } from 'uuid'
import { CLOUD_URI, CLOUD_STORAGE_CONFIG, ERROR_MESSAGES } from '../constants'
import { Constants } from 'src/types'
import { formatResponse, ResponseData } from './responseBuilder'

const FIREBASE_MJS_ID = 'FIREBASE_MJS_ID'
const ARWEAVE_FOLDER = 'arweave'
const headers = {
  apiKey: 'api-key',
}

interface StorageConfigProps {
  apiKey?: string
  constants?: Constants
}

export class Storage {
  public firebase: firebase.app.App | undefined
  public storage: firebase.storage.Storage | undefined

  public apiKey: string

  public constants: Constants

  constructor(storageConfig: StorageConfigProps = {}) {
    this.constants = storageConfig.constants || {}
    this.apiKey = storageConfig.apiKey || 'anonymous'

    const mintbaseJSFirebase = firebase.apps.find(
      ({ name }) => name === FIREBASE_MJS_ID
    )

    this.firebase =
      mintbaseJSFirebase ??
      firebase.initializeApp(
        this.constants.CLOUD_STORAGE_CONFIG || CLOUD_STORAGE_CONFIG,
        FIREBASE_MJS_ID
      )

    this.storage = this.firebase.storage()
  }

  /**
   * Uploads metadata to Arweave via a cloud function
   * @param metadata metadata object
   * @returns arweave content identifier
   */
  public async uploadMetadata(
    metadata: unknown
  ): Promise<ResponseData<{ id: string }>> {
    try {
      const request = await fetch(`${CLOUD_URI}/arweave/metadata/`, {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          [headers.apiKey]: this.apiKey || 'anonymous',
        },
      })

      const data: { id: string } = await request.json()

      return formatResponse({ data })
    } catch (error) {
      return formatResponse({ error: ERROR_MESSAGES.uploadMetadata })
    }
  }

  /**
   * Upload file to Arweave via a cloud function
   * @param file the file to upload
   * @returns retunrns an object containing the arweave content identifier and the content type.
   */
  public async uploadToArweave(
    file: File
  ): Promise<ResponseData<{ id: string; contentType: string }>> {
    if (isNode)
      return formatResponse({
        error: 'Node environment does not yet supports uploads.',
      })

    const buffer = await file.arrayBuffer()
    const contentType = file.type

    try {
      // Uploads to google cloud
      const { data: fileName, error } = await this.uploadCloud(
        buffer,
        contentType
      )

      if (error) {
        return formatResponse({ error })
      }

      try {
        // Fetches arweave id. This request will trigger an upload in the cloud
        const request = await fetch(`${CLOUD_URI}/arweave/file/${fileName}`, {
          headers: {
            [headers.apiKey]: this.apiKey || 'anonymous',
          },
        })

        const { id, contentType } = await request.json()

        const data = { id, contentType }

        if (!id || !contentType)
          throw new Error(ERROR_MESSAGES.decentralizedStorageFailed)

        return formatResponse({ data })
      } catch (error) {
        return formatResponse({
          error: ERROR_MESSAGES.decentralizedStorageFailed,
        })
      }
    } catch (error: any) {
      return formatResponse({ error: error.message })
    }
  }

  /**
   * Uploads raw binary data to the cloud. This method is useful because
   * we can trigger an arweave upload via an http request with the returned file name.
   * @param buffer the raw binary data of the file to upload
   * @param contentType the content type
   * @returns the filename
   */
  private async uploadCloud(
    buffer: ArrayBuffer | Buffer,
    contentType: string
  ): Promise<ResponseData<string>> {
    if (isNode)
      return formatResponse({
        error: 'Node environment does not yet supports uploads.',
      })
    try {
      const fileName = uuidv4()

      if (!this.storage)
        return formatResponse({ error: 'Storage is not initialized' })

      await this.storage
        .ref(`${ARWEAVE_FOLDER}/${fileName}`)
        .put(buffer, { contentType: contentType })

      return formatResponse({ data: fileName })
    } catch (error) {
      return formatResponse({ error: ERROR_MESSAGES.uploadCloud })
    }
  }
}
