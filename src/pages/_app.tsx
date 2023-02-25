import Layout from '@/modules/layout/Layout'
import { store } from '@/store/store'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Layout title='Search-app'>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default App
