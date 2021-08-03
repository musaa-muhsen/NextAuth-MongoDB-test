//import fetch from 'isomorphic-unfetch'; //Switches between unfetch & node-fetch for client & server.
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import axios from 'axios';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import useSWR from 'swr';
import Link from 'next/link'

const User = ({userIdz}) => {

    const router = useRouter();
    const userId = router.query.id;
    const [userState, setUserState] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [session, loading] = useSession();
    

    useEffect(() => {
        if (isDeleting) {
            deleteUser();
        }
    }, [isDeleting])

    // useEffect(()=>{
    //     let mounted = true;

    //     const fetchData = async () => {
    //       const res = await fetch(`/api/users/${userId}`)
    //       const json = await res.json()
    //       setUserState(json)
    //     }
    //     fetchData()
    //     return function cleanup() {
    //         mounted = false
    //        }
    //   },[session])

    //   console.log(userState);
    //const fetcher = (...args) => fetch(...args).then(res => res.json());
  
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data } = useSWR(`/api/users/${userIdz}`, fetcher);
    
    useEffect(() => {
        setUserState(data);
    }, [])
  
  

    const deleteUser = async () => {
      
        try {
            const deleted = await fetch(`/api/users/${userId}`, {
                method: "Delete"
            });

            router.push("/dashboard");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
    }
console.log(userState)
    return (
        <div>
               <header className={'header'}>
              <ul className={'ulHeader'}>
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
          {userState && <p>Delete {userState.data.userName}</p>}
                 <>      
                    <button onClick={handleDelete}>Delete</button>
                </>
           
        </div>
    )
}

export const getServerSideProps  = async ({ query: { id } }) => {

    // try {

    //     const res = await fetch(`http://localhost:3000/api/users/${id}`);
    //     console.log(res.data)
    //     return {
    //         props: {
    //           user: res.data
    //         }
    //       }
    // } catch(err) {
    //     console.log(err)
    //     return {
    //         props: {
    //             user: []
    //         }
    //     }
    // }
    //console.log(res.data)
    return {
        props: {
          userIdz: id
        }
      }
}

export default User;