import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.hardhat, chain.polygonMumbai],
    [alchemyProvider({ apiKey: process.env.REACT_APP_POLYGON_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "Executable Agreement",
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

export {chains, wagmiClient}
