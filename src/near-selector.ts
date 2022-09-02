import { setupWalletSelector } from '@near-wallet-selector/core'
import { setupModal } from '@near-wallet-selector/modal-ui'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { setupSender } from '@near-wallet-selector/sender'
import { setupMathWallet } from '@near-wallet-selector/math-wallet'
import { setupNightly } from '@near-wallet-selector/nightly'
import { setupLedger } from '@near-wallet-selector/ledger'
import { setupWalletConnect } from '@near-wallet-selector/wallet-connect'
import { setupNightlyConnect } from '@near-wallet-selector/nightly-connect'
import { setupDefaultWallets } from '@near-wallet-selector/default-wallets'
import { Network } from './types'

export const init = async ({
  network,
  contractAddress,
}: {
  network: Network
  contractAddress: string
}) => {
  const selector = await setupWalletSelector({
    network: network,
    modules: [
      ...(await setupDefaultWallets()),
      setupNearWallet(),
      setupMyNearWallet(),
      setupSender(),
      setupMathWallet(),
      setupNightly(),
      setupLedger(),
    ],
  })

  const modal = setupModal(selector, {
    contractId: contractAddress,
  })

  return {
    selector,
    modal,
  }
}
