import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  //globalStore.set('baseUrl', 'some url 1');

  return <Component {...pageProps} />
}

export default MyApp
