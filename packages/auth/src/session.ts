import { MINTBASE_CONNECT_HOST } from './constants';
import { MintbaseSession } from './wallet';


type RequestLike = {
  body: object;
}

export const proxySessionTokenRequest = async (req: RequestLike, useEndpoint?: string): Promise<string> => {
  const session = await fetch(useEndpoint || `${MINTBASE_CONNECT_HOST}/auth`, {
    method: 'POST',
    headers: {
      'mb-api-key': 'anon',
      'content-type':'application/json',
    },
    body: JSON.stringify(req.body),
  });
  const { token } = await session.json();
  return token;
};

export const validateSessionToken = async (token: string, useEndpoint?: string): Promise<MintbaseSession> => {
  const session = await fetch(useEndpoint || `${MINTBASE_CONNECT_HOST}/session`, {
    headers: {
      'mb-api-key': 'anon',
      'content-type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return {
    token,
    ...await session.json(),
  };
};
