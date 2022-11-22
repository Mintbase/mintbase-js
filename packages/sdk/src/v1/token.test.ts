import { TOKEN_METHOD_NAMES } from '../constants';
import { deployContract, revoke } from './token';

describe('token method calls', () => {
  const nftContractId = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';
  const tokenId2 = '2';

  test('revoke token one account', () => {
    const args = revoke({
      nftContractId: nftContractId,
      tokenId: tokenId1,
      accountToRevokeId: receiverId,
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
        // eslint-disable-next-line @typescript-eslint/camelcase
        account_id: receiverId,
      },
    });
  });

  test('revoke token all accounts', () => {
    const args = revoke({
      nftContractId: nftContractId,
      tokenId: tokenId1,
    });

    expect(args).toEqual({
      contractAddress: nftContractId,
      methodName: TOKEN_METHOD_NAMES.TOKEN_ACCOUNT_REVOKE_ALL,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        token_id: tokenId1,
      },
    });
  });

  test('deploy contract set all values', () => {
    const factoryContractId = 'test.factory';
    const name = 'test';
    const symbol = 'TST';
    const icon = 'test';
    const baseUri = 'test';
    const reference = 'test';
    const referenceHash = 'test';
    const ownerId = 'test';

    const inp = {
      name: name,
      factoryContractId: factoryContractId,
      ownerId: ownerId,
      metadata: {
        symbol: symbol,
        icon: icon,
        baseUri: baseUri,
        reference: reference,
        referenceHash: referenceHash,
      },
    };

    const args = deployContract(inp);

    expect(args).toEqual({
      contractAddress: factoryContractId,
      methodName: TOKEN_METHOD_NAMES.DEPLOY_TOKEN_CONTRACT,
      args: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        owner_id: ownerId,
        metadata: {
          spec: 'nft-1.0.0',
          name: name,
          symbol: 'tst',
          icon: icon,
          // eslint-disable-next-line @typescript-eslint/camelcase
          base_uri: baseUri,
          reference: reference,
          // eslint-disable-next-line @typescript-eslint/camelcase
          reference_hash: referenceHash,
        },
      },
    });
  });
});
