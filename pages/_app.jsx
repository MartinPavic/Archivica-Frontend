import '../styles/globals.scss'
import { useRouter } from 'next/router'
import Header from '../components/header';
import ActionMenu from '../components/UI/actionMenu';

const App = ({ Component, pageProps }) => {
	const router = useRouter();

	return(
		<>
			{router.asPath !== '/login' && router.asPath !== '/register'  && <Header />}
			<main>
				<Component {...pageProps} />
				<ActionMenu />
			</main>
		</>
	);
}

export default App
