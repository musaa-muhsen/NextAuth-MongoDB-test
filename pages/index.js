import { signIn, signOut, useSession,getSession } from 'next-auth/client';
import Link from 'next/link'
import React from 'react';
import styles from '../styles/Home.module.scss';
// import { useRouter } from 'next/router'
// import axios from 'axios';
//null, { callbackUrl: 'http://localhost:3000/dashboard' }

// import dbConnect from '../utils/dbConnect';
// import User from '../models/User';


export default function Page() {
//   const plainData = {
//     ...queryConverted
//   }
// console.log(plainData)

// const data = Object.values(plainData);
// console.log(data)
// const filtered = data.filter((e,i,a) => {
//   return e.userName === 'admin' && e.password === '7691769199'
//   });

// console.log(filtered)

    const [ session, loading ] = useSession();

    if (loading) {
      return <p>Loading...</p>;
    }

    // const userCred = { username: 'tom ford', password: '76917691hhh' }
    // //console.log(userCred.username);
    // //const mapped = users.data.map((i) => console.log(i.password));

    // const filtered = users.data.filter((e,i,a) => {
    // return  e.userName === userCred.username && e.password === userCred.password
    // });
    

  return ( 
        <div>


     <header className={styles.header}>
              <ul className={styles.ulHeader}>
                <li>{session && <> 
                 <Link href="/dashboard">
                    <a>Dashboard</a>
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
            </header> 
    
   
    {/* <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link> */}

  </div>
  )
}


export const getServerSideProps  = async (context) => {
    // const res = await axios.get('http://localhost:3000/api/users');
     //console.log(res.data)
     //const {data} = await res.json();
    
      //const queryResult = await User.find({}).lean();
     // const queryConverted = JSON.parse(JSON.stringify(queryResult));

//dbConnect();

     return {
      props: {

      }
    }
}


