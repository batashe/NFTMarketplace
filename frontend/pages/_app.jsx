import '../styles/globals.css';
import Layout from '../components/layout/Layout';
//import dynamic from "next/dynamic";
import { TransactionProvider } from '../context/TransactionContext';

//const DynamicTransactionProviderComponent = dynamic(() => import('../context/TransactionContext').then((mod) => mod.TransactionProvider),{ ssr: false })
//const DynamicLayoutComponent = dynamic(() => import('../components/layout/Layout'), { ssr: false });


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
