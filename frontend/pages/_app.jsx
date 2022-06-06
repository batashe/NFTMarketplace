import '../styles/globals.css';
import "../styles/home.css"
import Layout from '../components/layout/Layout';
import { TransactionProvider } from '../context/TransactionContext';


function MyApp({ Component, pageProps }) {
  return (
    <TransactionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TransactionProvider>
  )
}

export default MyApp;
