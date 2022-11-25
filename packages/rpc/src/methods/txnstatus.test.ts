import { getTxnStatus } from './txnstatus';

describe('getTxnStatus', () => {
  it('recognizes successful transactions (multiple receipts)', async () => {
    let txnHash = '9Nieji1G1d9iUmkMindAAdwz7mcESG2NFxredjv9cWrZ';
    let senderId = 'reginanogueira.near';
    if (process.env.NEAR_ENV === 'testnet') {
      txnHash = '6zgh2u9DqHHiXzdy9ouTP7oGky2T4nugqzqt9wJZwNFm';
      senderId = 'sender.testnet';
    }
    const status = await getTxnStatus(txnHash, senderId);
    expect(status).toStrictEqual('success');
  });

  it('recognizes successful transactions (single receipt)', async () => {
    let txnHash = 'DfePCY1bRdCn8BsBjod4kP3sW6Uc1VYV4yJxnFNy5Vui';
    let senderId = 'yoneru.near';
    if (process.env.NEAR_ENV === 'testnet') {
      txnHash = '35jBJFY566f4Jk5JzwTnoyJoFCdfRgPuCaJLtrNrFamE';
      senderId = 'yadda.testnet';
    }
    const status = await getTxnStatus(txnHash, senderId);
    expect(status).toStrictEqual('success');
  });

  // TODO: failed transactions
});
