
interface ResponseParams<T> {
  data?:  T | unknown,
  error?: string
}

export interface ResponseData<T> {
  data: T | unknown,
  error: string
}

export const formatResponse = <T>(params: ResponseParams<T>): ResponseData<T> => {
  const { data, error = "" } = params

  return {
    data,
    error, 
  }
}
