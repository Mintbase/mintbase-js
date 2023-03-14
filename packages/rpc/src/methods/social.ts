import { callViewMethod } from '../util';
import { mbjs } from '@mintbase-js/sdk';

export const NEAR_SOCIAL_IPFS_GATEWAY = 'https://ipfs.near.social/ipfs/';

type NearSocialProfile = {
  name?: string;
  description?: string;
  image?: {
    ipfs_cid: string;
    url?: string;
    nft?: {
      contractId: string;
      tokenId: string;
    };
  };
  imageUrl?: string;
  linktree?: {
    twitter: string;
    github: string;
    telegram: string;
    website: string;
  };
  tags?: Record<string, string>;
};

export const nearSocialProfile = async (
  accountId: string,
): Promise<NearSocialProfile> => {

  const contractId = mbjs.keys.network === 'testnet'
    ? 'v1.social08.testnet'
    : 'social.near';

  try {
    const data = await callViewMethod<NearSocialProfile>({
      contractId,
      method: 'get',
      args: {
        keys: [`${accountId}/profile/**`],
      },
    });

    const profile = data[accountId].profile;

    // append the near ipfs gateway to the image if there is an image
    let imageUrl = null;
    if (profile.image && profile.image.ipfs_cid) {
      imageUrl = `${NEAR_SOCIAL_IPFS_GATEWAY}${profile.image.ipfs_cid}`;
    }

    if (profile.image && profile.image.url) {
      imageUrl = profile.image.url;
    }

    // TODO: if we have an nft, we will want to resolve the media from the contract
    // a better pattern here may be just invoking the new API account method
    // if (profile.image && profile.image.nft) { }

    return {
      ...profile,
      imageUrl,
    };
  } catch (err) {
    console.error(`Error calling near social RPC methods ${err}`);
    throw err;
  }
};

