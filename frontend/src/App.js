import './App.css';
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiClient } from "./context/config";
import Router from "./pages";
import { AgreementFormProvider } from './context/agreementForm';

function App() {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<AgreementFormProvider>
				<Router />
				</AgreementFormProvider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default App;
