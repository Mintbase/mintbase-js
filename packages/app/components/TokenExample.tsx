import Image from 'next/image';
import { useTokenById } from '@mintbase-js/react';

export const TokenExample = (): JSX.Element => {
  const { data, error, loading } = useTokenById('1', 'grants.mintbase1.near');

  const { animationUrl, media, title, minter } = data?.mb_views_nft_tokens[0];

  return (
    <>
      <h1>{title} </h1>
      <p>minter: {minter} </p>
      <Image src={animationUrl || media} width="400" height="200" />{' '}
    </>
  );
};
