import { callNearRpc } from '../util';

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
  rpcUrl: string,
): Promise<TxnStatus> => {

  const res = await callNearRpc({params:[txnHash, senderId],method:'tx',rpcUrl})

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
