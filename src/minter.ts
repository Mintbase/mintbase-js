import { uploadToArweave, uploadMetadata } from './utils/storage'
import { BASE_ARWEAVE_URI } from './constants'
import { MetadataField } from './types'

const validFileFormat: { [key: string]: string[] } = {
  [MetadataField.Image]: ['image/jpeg', 'image/png', 'image/gif'],
  [MetadataField.Animation_url]: [
    'audio/ogg',
    'video/webm',
    'video/mp4',
    'audio/mpeg',
    'audio/mp3',
  ],
}

interface MinterConfigProps {
  apiKey?: string
}

/**
 * A programmatic metadata generator.
 */
export class Minter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public latestMints: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public currentMint: any

  public apiKey: string

  constructor(minterConfig: MinterConfigProps) {
    this.latestMints = {}
    this.currentMint = {}

    this.apiKey = minterConfig.apiKey || 'anonymous'
  }

  /**
   * Uploads the current metadata object and returns its content identifier.
   */
  public async getMetadataId(): Promise<string> {
    if (
      this.currentMint &&
      Object.keys(this.currentMint).length === 0 &&
      this.currentMint.constructor === Object
    )
      throw new Error('Metadata is empty.')

    const id = await uploadMetadata(this.currentMint, this.apiKey)

    this.latestMints = { ...this.latestMints, [id]: this.currentMint }
    this.currentMint = {}

    return id
  }

  /**
   * Set a field in metadata.
   * @param key The field key.
   * @param value The field value.
   */
  public setField(key: MetadataField, value: unknown): void {
    // this.fieldChecks(key, value)
    this.currentMint[key] = value
  }

  public setMetadata(metadata: any, override?: boolean): void {
    if (override) {
      this.currentMint = {
        ...this.currentMint,
        ...metadata,
      }
    } else {
      this.currentMint = {
        ...metadata,
        ...this.currentMint,
      }
    }
  }

  /**
   * Uploads file and sets its corresponding URI to a field.
   * @param field The metadata field.
   * @param file The file to upload.
   */
  public async uploadSet(field: string, file: File): Promise<void> {
    // TODO: allowedFiles
    // if (!validFileFormat[field].includes(file.type))
    //   throw new Error('File type not accepted.')

    // TODO: validateFile

    // TODO: check file size limits

    const result = await uploadToArweave(file, this.apiKey)

    this.currentMint[field] = `${BASE_ARWEAVE_URI}/${result?.id}`
  }

  /**
   * Uploads file and returns corresponding URI.
   * @param file The file to upload.
   */
  public async upload(file: File): Promise<string> {
    // TODO: allowedFiles
    // if (!validFileFormat[field].includes(file.type))
    //   throw new Error('File type not accepted.')

    // TODO: validateFile

    // TODO: check file size limits

    const result = await uploadToArweave(file, this.apiKey)

    return `${BASE_ARWEAVE_URI}/${result?.id}`
  }

  // TODO: implement all checks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private fieldChecks(key: MetadataField, value: any): void {
    switch (key) {
      case MetadataField.Youtube_url:
        if (typeof value !== 'string')
          throw new Error('Value is not of type string.')

        // eslint-disable-next-line no-case-declarations
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        // eslint-disable-next-line no-case-declarations
        const regex = new RegExp(urlRegex)

        if (!value.match(regex)) throw new Error('URL is not well formatted.')
        break
      case MetadataField.Name:
        if (typeof value !== 'string')
          throw new Error('Value is not of type string.')

        break

      case MetadataField.Description:
        if (typeof value !== 'string')
          throw new Error('Value is not of type string.')

        break

      default:
        break
    }
  }
}
