import retry from 'retry'

export async function retryFetch(
  url: string,
  fetchOptions?: RequestInit,
  retryOptions?: retry.OperationOptions
) {
  const operation = retry.operation(retryOptions)

  return new Promise<Response>((resolve, reject) => {
    operation.attempt(() => {
      fetch(url, fetchOptions)
        .then(async (data) => {
          resolve(data)
        })
        .catch((error) => {
          if (operation.retry(error)) reject(error)
        })
    })
  })
}
