import "../src/styles/globals.scss";
import Header from "../src/components/header";
import ActionMenu from "../src/components/UI/actionMenu";
import AuthGuard from "../src/guards/authGuard";
import React from "react";
import { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/useAuth";

const App = ({ Component, pageProps }: AppProps) => {
    return (
		<AuthProvider>
			<AuthGuard>
				<Header />
				<main>
					<Component {...pageProps} />
					{/* <ActionMenu /> */}
				</main>	
			</AuthGuard>
		</AuthProvider>
    );
};

export default App;
