"use client";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { createConfig, WagmiConfig, configureChains } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import React, { useState, useEffect } from "react";

const { publicClient, chains } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_BSC_RPC,
      }),
    }),
  ]
);

const config = createConfig(
  getDefaultConfig({
    chains,
    publicClient,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  })
);

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="rounded">
        {mounted && children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
