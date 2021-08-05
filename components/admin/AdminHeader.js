import Link from 'next/link'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import styles from '../../styles/AdminHeader.module.scss';


export default function AdminHeader() {
    const [session, loading] = useSession();

    return <>
            <div className={styles.adminHeader}><p>Admin 🚫nly</p></div>

    <header className={`${styles.header}`} >
       
        <ul className={`${styles.ulHeader}`}>
          <li>{session && <> 
           <Link href="/">
              <a>home</a>
           </Link>
           </>}
           </li>
          <li>|</li>
          <li>
          {!session && <>
             <button onClick={() => signIn()}>ign in</button>
           </>}
           {session && <>
          
          <a onClick={() => signOut()}>sign out</a>
             </>}
          </li>
        </ul>
      </header> </>
  }