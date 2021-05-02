import { uploadToArweave, uploadMetadata } from './utils/storage'
import {
  BASE_ARWEAVE_URI,
  FILE_UPLOAD_SIZE_LIMIT,
  REGEX_URL,
  VALID_FILE_FORMATS,
  ERROR_MESSAGES,
  MIME_TYPES,
} from './constants'
import { MetadataField } from './types'
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
      throw new Error(ERROR_MESSAGES.metadataEmpty)

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
  public setField(
    key: MetadataField,
    value: unknown,
    override?: boolean
  ): void {
    try {
      this.fieldChecks(key, value)
    } catch (error) {
      return error
    }

    if (override && this.currentMint[key]) this.currentMint[key] = value
  }

  public setMetadata(metadata: any, override?: boolean): void {
    try {
      Object.keys(metadata).forEach((field) => {
        this.setField(field as MetadataField, metadata[field], override)
      })
    } catch (error) {
      throw new Error(ERROR_MESSAGES.metadataSet)
    }
  }

  /**
   * Uploads file and sets its corresponding URI to a field.
   * @param field The metadata field.
   * @param file The file to upload.
   */
  public async uploadField(field: string, file: File): Promise<void> {
    if (!VALID_FILE_FORMATS[field].includes(file.type))
      throw new Error(ERROR_MESSAGES.fileTypeNotAccepted)

    try {
      const url = await this.upload(file)

      this.currentMint[field] = url
    } catch (error) {
      return error
    }
  }

  /**
   * Uploads file and returns corresponding URI.
   * @param file The file to upload.
   */
  public async upload(file: File): Promise<string> {
    try {
      // corrects MIME type
      const tFile = await _correctType(file)

      if (tFile.size > FILE_UPLOAD_SIZE_LIMIT)
        throw new Error(ERROR_MESSAGES.fileSizeExceeded)

      const result = await uploadToArweave(file, this.apiKey)

      return `${BASE_ARWEAVE_URI}/${result?.id}`
    } catch (error) {
      return error
    }
  }

  // TODO: implement all checks
  private fieldChecks(key: MetadataField, value: any): void {
    switch (key) {
      case MetadataField.Youtube_url:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        if (!value.match(REGEX_URL)) throw new Error(ERROR_MESSAGES.badUrl)
        break

      case MetadataField.Image:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        if (!value.match(REGEX_URL)) throw new Error(ERROR_MESSAGES.badUrl)
        break

      case MetadataField.Name:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        break

      case MetadataField.Description:
        if (typeof value !== 'string') throw new Error(ERROR_MESSAGES.notString)
        break

      default:
        break
    }
  }
}

const _correctType = async (file: File): Promise<File> => {
  const fileExtension = _getFileExtension(file.name)

  if (!fileExtension) throw new Error(ERROR_MESSAGES.fileNoExtension)

  if (fileExtension === 'glb') return _setMimeType(MIME_TYPES.glb, file)
  if (fileExtension === 'gltf') return _setMimeType(MIME_TYPES.gltf, file)

  return file
}

const _setMimeType = async (type: string, file: File): Promise<File> => {
  return new File([new Blob([await file.arrayBuffer()])], file.name, {
    type: type,
  })
}

const _getFileExtension = (fileName: string): string | undefined => {
  return fileName.split('.').pop()
}
