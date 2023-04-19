import { MINTBASE_CONNECT_HOST } from '@mintbase-js/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const COOKIES_KEY = 'session-token';

export default async function sessionHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cookies = new Cookies(req, res);

  if (req.method === 'POST') {
    const session = await fetch(`${MINTBASE_CONNECT_HOST}/auth`, {
      method: 'POST',
      headers: {
        'mb-api-key': 'anon',
        'content-type':'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const { token } = await session.json();
    cookies.set(COOKIES_KEY, token, {
      httpOnly: true, // true by default
    });
    res.send({ token });
    return;
  }

  // attempt to validate session from authorization header token
  const token = cookies.get(COOKIES_KEY);
  const session = await fetch(`${MINTBASE_CONNECT_HOST}/session`, {
    headers: {
      'mb-api-key': 'anon',
      'content-type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  res.send(await session.json());
}
