
import { connect } from '@mintbase-js/auth';
import { authenticatedKeyStore } from '../../src/utils';
import { generateSeedPhrase } from 'near-seed-phrase';
import BN from 'bn.js';

describe('zero balance account', () => {
  test('create the account', async () => {
    const keyStore = await authenticatedKeyStore(['mb_alice.testnet']);
    const account = await connect('mb_alice.testnet', keyStore);

    // create a keypair, bonus do it with seed phrase
    const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();

    // account
    const zeroBalanceAccount = await account.createAccount(
      `zb${Math.random() * 10000}.mb_alice.testnet`,
      publicKey,
      new BN('0'),
    );

    expect(zeroBalanceAccount.receipts_outcome).toBeDefined();
    console.log('####### IF YOU WANT TO USE THIS ACCOUNT AGAIN, WRITE DOWN THE SEED / KEY INFORMATION OUTPUT BELOW #########');
    console.log('account:', zeroBalanceAccount);
    console.log('seed phrase:', seedPhrase);
    console.log('secret key:', secretKey);
  });
});
