import '../styles/globals.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { store, persistor } from '../store/storeConfig';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from '../components/header';
import ActionMenu from '../components/UI/actionMenu';
import { useEffect } from 'react';
import { UNSAFE_RouteContext } from 'react-router-dom';
import { RouteGuard } from '../components/routeGuard';

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	return(
		<>
		<RouteGuard>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{router.asPath !== '/login' && router.asPath !== '/register'  && <Header />}
					<main>
						<Component {...pageProps} />
						<ActionMenu />
					</main>
				</PersistGate>
			</Provider>
		</RouteGuard>
		</>
	);
}

export default App
