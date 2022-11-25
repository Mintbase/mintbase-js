import { NEAR_RPC_URL } from './constants';
import superagent from 'superagent';

export const requestFromNearRpc = async (
  body: Record<string, any>,
): Promise<Record<string, any>> => {
  const res = await superagent
    .post(NEAR_RPC_URL)
    .send(body)
    .set('Content-type', 'application/json');

  return res.body;
};
