import { ReactElement, useState, useEffect, SetStateAction } from 'react';
import { useWallet } from '@mintbase-js/react';
import { ownedTokens, Token } from '@mintbase-js/data';
import { execute, transfer } from '@mintbase-js/sdk';
import type { FinalExecutionOutcome } from '@mintbase-js/sdk';

export const TransferTest = (): ReactElement => {
  const { selector, activeAccountId } = useWallet();
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [transferResult, setTransferResult] = useState<FinalExecutionOutcome>(null);
  const [token, setToken] = useState<Token>(null);
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    (async function load(): Promise<void> {
      const result = await ownedTokens(activeAccountId, { limit: 1 })
        .catch((err: SetStateAction<Error>) => setError(err));
      setToken(result[0]);
      return;
    })();
  }, []);

  const handleTransfer = async (): Promise<void> => {
    setIsTransferring(true);
    const wallet = await selector.wallet();
    const result = await execute(
      transfer({
        nftContractId: token.contractId,
        transfers: [{
          receiverId: 'mb_carol.testnet',
          tokenId: token.tokenId,
        }],
      }),
      { wallet },
    );
    setTransferResult(result as FinalExecutionOutcome);
  };

  if (!token) {
    return <div>TokenTest Waiting for token owned by {activeAccountId}</div>;
  }

  return (
    <div>
      {error
        ? <p>{error.message}</p>
        : null
      }
      {isTransferring
        ? <p>Transferring...</p>
        : <button onClick={handleTransfer}>
            Transfer {token.tokenId} of {token.contractId} to mb_carol.testnet
        </button>
      }

      {transferResult ? <div>{JSON.stringify(transferResult)}</div> : null}
    </div>
  );
};
