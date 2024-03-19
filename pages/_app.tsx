import "../src/styles/globals.scss";
import Header from "../src/components/header";
import ActionMenu from "../src/components/UI/actionMenu";
import AuthGuard from "../src/guards/authGuard";
import React from "react";
import { AppProps } from "next/app";
import { AuthProvider } from "../src/contexts/useAuth";
import Head from "next/head";
import { SnackbarProvider } from "../src/contexts/useSnackbar";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Head>
                <title>Arhivica</title>
                <meta name="description" content="Archivica project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <AuthGuard>
                    <SnackbarProvider>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </AuthGuard>
                {/* <ActionMenu /> */}
            </main>
        </AuthProvider>
    );
};

export default App;
