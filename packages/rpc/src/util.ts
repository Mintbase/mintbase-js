import { mbjs } from '@mintbase-js/sdk';
import fetch from 'isomorphic-unfetch';

export const requestFromNearRpc = async (
  body: Record<string, any>,
): Promise<Record<string, any> | undefined> => {
  const fetchUrl =  mbjs.keys.nearRpcUrl;

  const res = await fetch(fetchUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-type': 'application/json' },
  });

  return res.json();
};
