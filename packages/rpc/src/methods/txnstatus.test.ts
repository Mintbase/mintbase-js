import { getTxnStatus } from './txnstatus';
import fetch from 'cross-fetch';

jest.mock('cross-fetch');

describe('getTxnStatus', () => {

  const mockResponseWithReceipts = (receipts_outcome: unknown): void => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          receipts_outcome,
        },
      }),
    });
  };

  it('recognizes successful transactions (multiple receipts)', async () => {
    // mock response
    mockResponseWithReceipts([
      { outcome: { status: true } },
      { outcome: { status: true } },
    ]);
    let txnHash = '9Nieji1G1d9iUmkMindAAdwz7mcESG2NFxredjv9cWrZ';
    let senderId = 'reginanogueira.near';

    const status = await getTxnStatus(txnHash, senderId, 'rpc');
    expect(status).toStrictEqual('success');
  });

  it('recognizes successful transactions (single receipt)', async () => {
    mockResponseWithReceipts([
      { outcome: { status: true } },
    ]);
    let txnHash = 'DfePCY1bRdCn8BsBjod4kP3sW6Uc1VYV4yJxnFNy5Vui';
    let senderId = 'yoneru.near';

    const status = await getTxnStatus(txnHash, senderId, 'rpc');
    expect(status).toStrictEqual('success');
  });

  it('recognizes failed transactions', async () => {
    mockResponseWithReceipts([
      { outcome: { status:  { Failure: true } } },
    ]);
    let txnHash = 'test.txn.hash';
    let senderId = 'foo.near';

    const status = await getTxnStatus(txnHash, senderId, 'rpc');
    expect(status).toStrictEqual('failure');
  });

  // TODO: more coverages.
});
