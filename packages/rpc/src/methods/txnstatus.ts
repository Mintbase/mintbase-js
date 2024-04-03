import { Network } from '@mintbase-js/sdk';
import { RPC_OPTIONS, requestFromNearRpc } from '../util';

export type TxnStatus = 'pending' | 'success' | 'failure';

type ReceiptOutcome = {
  outcome: {
    status: {
      Unknown: unknown;
      Failure: unknown;
      Success: unknown;
    }
  }
}

export const getTxnStatus = async (
  txnHash: string,
  senderId: string,
  network?: Network,
  rpc?: RPC_OPTIONS,
): Promise<TxnStatus> => {
  const res = await requestFromNearRpc({
    jsonrpc: '2.0',
    id: 'dontcare',
    method: 'tx',
    params: [txnHash, senderId],
  }, network, rpc);
  if (res?.error) {
    throw res.error;
  }

  let failure = false;
  let pending = false;
  if (!(res.result?.receipts_outcome instanceof Array)) {
    throw new Error(`Malformed response: ${JSON.stringify(res)}`);
  }
  res.result?.receipts_outcome?.forEach((outcome: ReceiptOutcome) => {
    if (!outcome?.outcome?.status) {
      throw new Error(`Malformed response: ${JSON.stringify(res)}`);
    }
    if (outcome.outcome.status.Unknown) {
      pending = true;
    }
    if (outcome.outcome.status.Failure) {
      failure = true;
    }
  });
  if (failure) {
    return 'failure';
  }
  if (pending) {
    return 'pending';
  }
  return 'success';
};
