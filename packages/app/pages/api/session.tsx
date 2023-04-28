import { proxySessionTokenRequest, validateSessionToken } from '@mintbase-js/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

const COOKIES_KEY = 'session-token';

export default async function sessionHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cookies = new Cookies(req, res);

  if (req.method === 'POST') {
    const token = await proxySessionTokenRequest(req);
    cookies.set(COOKIES_KEY, token, {
      httpOnly: true,
    });
    res.send({
      token,
    });
  }

  // attempt to validate session from authorization header token
  const token = cookies.get(COOKIES_KEY);
  if (!token) {
    res.send(null);
    return;
  }
  try {
    const session = await validateSessionToken(token);
    console.log('wtf========', session);
    res.send(session);
  } catch (err) {
    console.log(`Failed to get session from cookie w token ${token}`);
    res.send(null);
  }
}
