import Link from 'next/link'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';


export default function AdminHeader() {
    const [session, loading] = useSession();

    return <><h1>Admin only</h1>
    <header>
        <ul>
          <li>{session && <> 
           <Link href="/">
              <a>home</a>
           </Link>
           </>}
           </li>
          <li></li>
          <li>
          {!session && <>
             Not signed in <br/>
             <button onClick={() => signIn()}>Sign in</button>
           </>}
           {session && <>
          
          <button onClick={() => signOut()}>Sign out</button>
             </>}
          </li>
        </ul>
      </header> </>
  }