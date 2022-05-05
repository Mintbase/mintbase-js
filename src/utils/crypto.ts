const hash = async (buffer: ArrayBuffer) => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const base64 = btoa(
    hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  )
  return base64
}

export { hash }
