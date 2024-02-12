import { callViewMethod } from '../util';
import { Network, mbjs } from '@mintbase-js/sdk';

export const NEAR_SOCIAL_IPFS_GATEWAY = 'https://ipfs.near.social/ipfs/';

type ProfileImage = {
  ipfs_cid: string;
  url?: string;
  nft?: {
    contractId: string;
    tokenId: string;
  };
}

type NearSocialProfile = {
  name?: string;
  description?: string;
  image?: ProfileImage;
  imageUrl?: string;
  backgroundImageUrl?: string;
  linktree?: {
    twitter: string;
    github: string;
    telegram: string;
    website: string;
  };
  tags?: Record<string, string>;
};

const getImageUrl = (image: ProfileImage): string | null => {
  let imageUrl = null;
  if (image && image.ipfs_cid) {
    imageUrl = `${NEAR_SOCIAL_IPFS_GATEWAY}${image.ipfs_cid}`;
  }

  if (image && image.url) {
    imageUrl = image.url;
  }

  // TODO: if we have an nft, we will want to resolve the media from the contract
  // a better pattern here may be just invoking the new API account method
  // if (profile.image && profile.image.nft) { }
  return imageUrl;
};

export const nearSocialProfile = async (
  accountId: string,
  network?: Network,
): Promise<NearSocialProfile> => {

  const finalNetwork = network ||  mbjs.keys.network;

  const contractId = finalNetwork === 'testnet'
    ? 'v1.social08.testnet'
    : 'social.near';

  try {
    const data = await callViewMethod<NearSocialProfile>({
      contractId,
      method: 'get',
      args: {
        keys: [`${accountId}/profile/**`],
      },
      network,
    });


    const profile = data[accountId]?.profile;
    if (!profile) {
      // return empty profile
      return {};
    }

    return {
      ...profile,
      imageUrl: getImageUrl(profile.image),
      backgroundImageUrl: getImageUrl(profile.backgroundImage),
    };
  } catch (err) {
    console.error(`Error calling near social RPC methods ${err}`);
    throw err;
  }
};

