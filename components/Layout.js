import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>from Layout.js</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;