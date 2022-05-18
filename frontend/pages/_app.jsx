import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import dynamic from 'next/dynamic';
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
