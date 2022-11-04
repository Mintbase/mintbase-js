import { buy, depositStorage, list } from './market';

describe('token method calls', () => {
  const marketAddress = 'test.market';
  const nftContractId = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('deposit storage for one listing', () => {
    const args = depositStorage({
      listAmount: 1,
      marketAddress: marketAddress,
    });

    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: 'deposit_storage',
      args: {},
      deposit: '10000000000000000000000',
      gas: '225000000000000',
    });
  });

  test('deposit storage for two listings', () => {
    const args = depositStorage({
      listAmount: 2,
      marketAddress: marketAddress,
    });

    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: 'deposit_storage',
      args: {},
      deposit: '20000000000000000000000',
      gas: '225000000000000',
    });
  });

  test('deposit storage for ten listings', () => {
    const args = depositStorage({
      listAmount: 10,
      marketAddress: marketAddress,
    });

    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: 'deposit_storage',
      args: {},
      deposit: '100000000000000000000000',
      gas: '225000000000000',
    });
  });

  test('buy a token', () => {
    const args = buy({
      nftContractId: nftContractId,
      tokenId: tokenId1,
      referrerId: receiverId,
      marketAddress: marketAddress,
      price: {
        amount: '1',
      },
    });

    expect(args).toEqual({
      contractAddress: marketAddress,
      methodName: 'buy',
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        nft_contract_id: nftContractId,
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
        // eslint-disable-next-line @typescript-eslint/camelcase
        referrer_id: receiverId,
      },
      deposit: '1',
      gas: '225000000000000',
    });
  });

  test('list a token', () => {
    const args = list({
      nftContractId: nftContractId,
      tokenId: tokenId1,
      approvedAccountId: marketAddress,
      price: {
        amount: '1',
      },
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: 'nft_approve',
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_id: marketAddress,
        msg: JSON.stringify({
          price: '1',
        }),
      },
      deposit: '1',
      gas: '225000000000000',
    });
  });

});
