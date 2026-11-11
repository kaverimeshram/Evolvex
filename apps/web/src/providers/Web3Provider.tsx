'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { reactiveKopli, sepoliaTestnet } from '@evolvex/blockchain';

export const wagmiConfig = createConfig({
  chains: [reactiveKopli, sepoliaTestnet],
  transports: {
    [reactiveKopli.id]: http(),
    [sepoliaTestnet.id]: http(),
  },
  ssr: true,
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

