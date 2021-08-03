import { Provider } from 'next-auth/client';
import '../styles/fonts.css';

//import 'semantic-ui-css/semantic.min.css';
//import Layout from '../components/Layout';

import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
   
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
     
  )
}