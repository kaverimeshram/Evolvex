import { defineChain } from 'viem';

/**
 * Reactive Network Kopli Testnet
 * Chain ID: 5318008
 * Native Currency: REACT
 */
export const reactiveKopli = defineChain({
  id: 5318008,
  name: 'Reactive Kopli',
  nativeCurrency: {
    name: 'REACT',
    symbol: 'REACT',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://kopli-rpc.reactive.network'],
    },
    public: {
      http: ['https://kopli-rpc.reactive.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Reactive Kopli Explorer',
      url: 'https://kopli.reactscan.net',
    },
  },
  testnet: true,
});

export const sepoliaTestnet = defineChain({
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: {
    name: 'Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.org'],
    },
    public: {
      http: ['https://rpc.sepolia.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan Sepolia',
      url: 'https://sepolia.etherscan.io',
    },
  },
  testnet: true,
});

