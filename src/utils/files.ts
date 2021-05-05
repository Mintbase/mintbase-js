/** @hidden @module */


import { ERROR_MESSAGES, MIME_TYPES } from '../constants'

export const correctFileType = async (file: File): Promise<File> => {
  const fileExtension = getFileExtension(file.name)

  if (!fileExtension) throw new Error(ERROR_MESSAGES.fileNoExtension)

  if (fileExtension === 'glb') return setMimeType(MIME_TYPES.glb, file)
  if (fileExtension === 'gltf') return setMimeType(MIME_TYPES.gltf, file)

  return file
}

export const setMimeType = async (type: string, file: File): Promise<File> => {
  return new File([new Blob([await file.arrayBuffer()])], file.name, {
    type: type,
  })
}

export const getFileExtension = (fileName: string): string | undefined => {
  return fileName.slice(
    (Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1
  )
}
