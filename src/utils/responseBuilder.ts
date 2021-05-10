
interface ResponseParams<T> {
  data?:  T,
  error?: string
}

export interface ResponseData<T> {
  data: T
  error: string
}

export const formatResponse = <T>(params: ResponseParams<T>): ResponseData<T> => {
  const { data = {} as T , error = "" } = params

  return {
    data,
    error, 
  }
}
