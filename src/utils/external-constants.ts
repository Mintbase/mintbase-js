import 'isomorphic-unfetch'
import { Constants, Network } from 'src/types'
import { CLOUD_BASE_URI, API_VERSION } from '../constants'

export const initializeExternalConstants = async ({
  apiKey,
  networkName,
}: {
  apiKey?: string
  networkName?: Network
}): Promise<Constants> => {
  const response = await fetch(`${CLOUD_BASE_URI}/developer`, {
    headers: {
      'api-key': apiKey || 'anonymous',
      'api-version': API_VERSION,
    },
  })

  return await response.json()
}
