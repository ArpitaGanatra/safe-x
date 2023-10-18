import Header from "@/components/header";
import { wagmiConfig } from "@/components/wagmi";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  polygonMumbai,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, polygonMumbai, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID,
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <>
      <ChakraProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Header />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}
