import { reconnect, http, createConfig } from "@wagmi/core";
import { walletConnect, injected } from "wagmi/connectors";
import { createWeb3Modal } from "@web3modal/wagmi";

const evmWalletChains = {
  testnet: {
      nearEnv: "testnet",
      chainId: 398,
      walletExplorerUrl: "https://eth-explorer-testnet.near.org",
      explorerUrl: "https://testnet.nearblocks.io",
      ethRpcForNear: "https://eth-rpc.testnet.near.org",
      nearNativeRpc: "https://rpc.testnet.near.org"
  },
  mainnet: {
      chainId: 397,
      nearEnv: "mainnet",
      walletExplorerUrl: "https://eth-explorer.near.org",
      explorerUrl: "https://nearblocks.io",
      ethRpcForNear: "https://eth-rpc.mainnet.near.org",
      nearNativeRpc: "https://rpc.mainnet.near.org"
  }
};

const EVMWalletChain = evmWalletChains.mainnet;

// see more here: https://docs.reown.com/appkit/react/core/installation#cloud-configuration
// please replace it with your own one
const reownProjectId = 'b6facfc0dfb00812382fe1b7bcc07069';

const onMainnet = true; // you need to put smth like NetworkId == "mainnet"; here
const nearChain = {
  id: EVMWalletChain.chainId,
  name: `NEAR Protocol${ onMainnet ? "" : " Testnet"}`,
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: [EVMWalletChain.ethRpcForNear] },
    public: { http: [EVMWalletChain.ethRpcForNear] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: EVMWalletChain.walletExplorerUrl,
    },
  },
  testnet: !onMainnet,
};

const metadata = {
  name: "Bitte Wallet",
  description: "Near Wallet Connect to EVM",
  url: "wallet.bitte.ai",
  icons: [],
};

export const wagmiConfig = createConfig({
  chains: [nearChain],
  transports: {
    [nearChain.id]: http(),
  },
  connectors: [
    walletConnect({ projectId: reownProjectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
});

// Needed to be called to preserve the login state if your will reload the page
reconnect(wagmiConfig);

export const web3Modal : any = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  // Get a project ID at https://cloud.walletconnect.com
  projectId: reownProjectId,
});