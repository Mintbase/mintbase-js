import { getTxnStatus } from './txnstatus';
import fetch from 'cross-fetch';
import { mbjs } from '@mintbase-js/sdk';

jest.mock('cross-fetch');

describe('getTxnStatus', () => {

  // eslint-disable-next-line @typescript-eslint/camelcase
  const mockResponseWithReceipts = (receipts_outcome: object): void => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        result: {
          // eslint-disable-next-line @typescript-eslint/camelcase
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
    if (mbjs.keys.debugMode) {
      txnHash = '6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm';
      senderId = 'sender.testnet';
    }
    const status = await getTxnStatus(txnHash, senderId);
    expect(status).toStrictEqual('success');
  });

  it('recognizes successful transactions (single receipt)', async () => {
    mockResponseWithReceipts([
      { outcome: { status: true } },
    ]);
    let txnHash = 'DfePCY1bRdCn8BsBjod4kP3sW6Uc1VYV4yJxnFNy5Vui';
    let senderId = 'yoneru.near';
    if (mbjs.keys.debugMode) {
      txnHash = '35jBJFY566f4Jk5JzwTnoyJoFCdfRgPuCaJLtrNrFamE';
      senderId = 'yadda.testnet';
    }
    const status = await getTxnStatus(txnHash, senderId);
    expect(status).toStrictEqual('success');
  });

  it('recognizes failed transactions', async () => {
    mockResponseWithReceipts([
      { outcome: { status:  { Failure: true } } },
    ]);
    let txnHash = 'test.txn.hash';
    let senderId = 'foo.near';
    if (mbjs.keys.debugMode) {
      txnHash = 'not.a.real.txn';
      senderId = 'bar.testnet';
    }
    const status = await getTxnStatus(txnHash, senderId);
    expect(status).toStrictEqual('failure');
  });

  // TODO: more coverages.
});
