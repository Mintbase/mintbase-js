import { NextPage } from 'next';
import { useRouter } from 'next/router';

const WalletCallback: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const type =
    query && query.meta ? JSON.parse(query?.meta as string)?.type : undefined;

  const handleAuth = (): void => {
    alert('get auth token by sending these to firebase');
  };

  return (
    <div>
      {type === 'signature' && (
        <div>
          <div>Type: {type}</div>
          <div>Account Id: {query?.accountId}</div>
          <div>Pub Key: {query?.publicKey}</div>
          <div>Message: {query?.message}</div>
          <div>Signature: {query?.signature}</div>
          <button onClick={handleAuth}>Authenticate</button>
        </div>
      )}
    </div>
  );
};

export default WalletCallback;
