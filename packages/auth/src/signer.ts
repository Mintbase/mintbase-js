
import { getWallet } from './wallet';
import { binary_to_base58 as BinaryToBase58 } from 'base58-js';
import { VerifiedOwner } from '@near-wallet-selector/core';
import { utils } from 'near-api-js';
import { sha256 } from 'js-sha256';


const getVerifiedOwner = async (message: string): Promise<VerifiedOwner | undefined> => {
  const wallet = await getWallet();

  console.log(wallet);

  const owner = await wallet.verifyOwner({
    message: message,
  }) as VerifiedOwner;
  
  console.log(owner);

  return owner;
};

// returns a signature of message
export const signMessage = async (message: string): Promise<string> => {
  const owner = await getVerifiedOwner(message);

  return owner.signature;
};
  
  
export const verifyMessage = async (signature: string): Promise<boolean> => {

  const owner = await getVerifiedOwner(signature);
  
  const publicKeyString = `ed25519:${BinaryToBase58(Buffer.from(owner.publicKey, 'base64'))}`;

  const createdPublicKey = utils.PublicKey.from(publicKeyString);

  const stringified = JSON.stringify(owner);

  const verified = createdPublicKey.verify(new Uint8Array(sha256.array(stringified)), Buffer.from(signature, 'base64'));

  return verified;
};
  
