//import fetch from 'isomorphic-unfetch'; //Switches between unfetch & node-fetch for client & server.
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import axios from 'axios';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';

const User = () => {

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

    useEffect(()=>{
        let mounted = true;

        const fetchData = async () => {
          const res = await fetch(`/api/users/${userId}`)
          const json = await res.json()
          setUserState(json)
        }
        fetchData()
        return function cleanup() {
            mounted = false
           }
      },[session])

      console.log(userState);


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

    return (
        <div>
          {
              userState &&
                 <>
                    <h1>{userState.data.userName}</h1>
                    <p>{userState.data.password}</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
                
               
            }
         
        </div>
    )
}

// export const getServerSideProps  = async ({ query: { id } }) => {

//     try {

//         const res = await axios.get(`http://localhost:3000/api/users/${id}`);
//         console.log(res.data)
//         return {
//             props: {
//               user: res.data
//             }
//           }
//     } catch(err) {
//         console.log(err)
//         return {
//             props: {
//                 user: []
//             }
//         }
//     }
//     //console.log(res.data)
    
// }

export default User;