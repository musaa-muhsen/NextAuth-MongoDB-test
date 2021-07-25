import { Provider } from 'next-auth/client';
//import 'semantic-ui-css/semantic.min.css';
//import Layout from '../components/Layout';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  const [session, loading] = useSession();
  // this is now wrapped around 
  return (
   
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
     
  )
}