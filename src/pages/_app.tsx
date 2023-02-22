import Layout from '@/modules/layout/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Layout title='Search-app'>
			<Component {...pageProps} />
		</Layout>
	)
}

export default App
