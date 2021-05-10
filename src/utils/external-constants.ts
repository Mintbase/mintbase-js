import 'isomorphic-unfetch'
import { Constants, Network } from 'src/types'
import { CLOUD_URI, API_VERSION } from '../constants'

export const initializeExternalConstants = async ({
  apiKey,
  networkName,
}: {
  apiKey?: string
  networkName?: Network
}): Promise<Constants> => {
  const response = await fetch(`${CLOUD_URI}/developer`, {
    headers: {
      'api-key': apiKey || 'anonymous',
      'api-version': !networkName
        ? API_VERSION
        : `${API_VERSION}-${networkName}`,
    },
  })

  return await response.json()
}
