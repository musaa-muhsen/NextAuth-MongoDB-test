import { Provider } from 'next-auth/client';
//import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // this is now wrapped around 
  return (
    <Layout>
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
     </Layout>
  )
}