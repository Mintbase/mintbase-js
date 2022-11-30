import { deployContract } from '../deployContract/deployContract';
import { DEPOSIT_CONSTANTS, GAS_CONSTANTS, TOKEN_METHOD_NAMES } from '../constants';
import { revoke } from './token';

describe('token method calls', () => {
  const nftContractId = 'test.nft.contract';
  const receiverId = 'test.account';
  const tokenId1 = '1';

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
      gas: GAS_CONSTANTS.DEFAULT_GAS,
      deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
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
      gas: GAS_CONSTANTS.DEFAULT_GAS,
      deposit: DEPOSIT_CONSTANTS.ONE_YOCTO,
    });
  });
});
