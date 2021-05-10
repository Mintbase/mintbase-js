import 'isomorphic-unfetch'
import firebase from 'firebase/app'
import 'firebase/storage'
import { isNode } from 'browser-or-node'
import { v4 as uuidv4 } from 'uuid'
import { CLOUD_URI, CLOUD_STORAGE_CONFIG, ERROR_MESSAGES } from '../constants'
import { Constants } from 'src/types'

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

    if (!firebase.apps.length) {
      this.firebase = firebase.initializeApp(
        this.constants.CLOUD_STORAGE_CONFIG || CLOUD_STORAGE_CONFIG
      )

      this.storage = this.firebase.storage()
    }
  }

  /**
   * Uploads metadata to Arweave via a cloud function
   * @param metadata metadata object
   * @returns arweave content identifier
   */
  public async uploadMetadata(metadata: unknown): Promise<string> {
    try {
      const request = await fetch(`${CLOUD_URI}/arweave/metadata/`, {
        method: 'POST',
        body: JSON.stringify(metadata),
        headers: {
          [headers.apiKey]: this.apiKey || 'anonymous',
        },
      })
      const data = await request.json()

      return data?.id as string
    } catch (error) {
      throw new Error(ERROR_MESSAGES.uploadMetadata)
    }
  }

  /**
   * Upload file to Arweave via a cloud function
   * @param file the file to upload
   * @returns retunrns an object containing the arweave content identifier and the content type.
   */
  public async uploadToArweave(
    file: File
  ): Promise<{ id: string; contentType: string }> {
    if (isNode)
      throw new Error('Node environment does not yet supports uploads.')

    const buffer = await file.arrayBuffer()
    const contentType = file.type

    try {
      // Uploads to google cloud
      const fileName = await this.uploadCloud(buffer, contentType)

      try {
        // Fetches arweave id. This request will trigger an upload in the cloud
        const request = await fetch(`${CLOUD_URI}/arweave/file/${fileName}`, {
          headers: {
            [headers.apiKey]: this.apiKey || 'anonymous',
          },
        })

        const data = await request.json()

        return { id: data?.id, contentType: data?.contentType }
      } catch (error) {
        throw new Error(ERROR_MESSAGES.decentralizedStorageFailed)
      }
    } catch (error) {
      throw new Error(error.message)
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
  ): Promise<string> {
    if (isNode)
      throw new Error('Node environment does not yet supports uploads.')
    try {
      const fileName = uuidv4()

      if (!this.storage) throw new Error('Storage is not initialized')

      await this.storage
        .ref(`${ARWEAVE_FOLDER}/${fileName}`)
        .put(buffer, { contentType: contentType })

      return fileName
    } catch (error) {
      throw new Error(ERROR_MESSAGES.uploadCloud)
    }
  }
}
