import { createPublicClient, http, type PublicClient } from 'viem';
import { reactiveKopli, sepoliaTestnet } from './chains.js';

export function getReactivePublicClient(rpcUrl?: string): PublicClient {
  return createPublicClient({
    chain: reactiveKopli,
    transport: http(rpcUrl || reactiveKopli.rpcUrls.default.http[0]),
  });
}

export function getDestinationPublicClient(rpcUrl?: string): PublicClient {
  return createPublicClient({
    chain: sepoliaTestnet,
    transport: http(rpcUrl || sepoliaTestnet.rpcUrls.default.http[0]),
  });
}

