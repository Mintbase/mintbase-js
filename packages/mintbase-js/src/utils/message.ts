const messageEncode = (decodedMessage: string): Uint8Array => {
  const arrayBuffer = new TextEncoder().encode(decodedMessage).buffer
  return new Uint8Array(arrayBuffer)
}

const messageDecode = (encodedMessage: ArrayBuffer): string => {
  return new TextDecoder().decode(encodedMessage)
}

export { messageEncode, messageDecode }
