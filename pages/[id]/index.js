//import fetch from 'isomorphic-unfetch'; //Switches between unfetch & node-fetch for client & server.
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import { Confirm, Button, Loader } from 'semantic-ui-react';
import axios from 'axios';

const User = ({ user }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteUser();
        }
    }, [isDeleting])


    const deleteUser = async () => {
        const userId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    return (
        <div>
            {isDeleting
                ? <p> loading </p>
                :
                <>
                    <h1>{user.data.userName}</h1>
                    <p>{user.data.password}</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            }
         
        </div>
    )
}

export const getServerSideProps  = async ({ query: { id } }) => {

    try {

        const res = await axios.get(`http://localhost:3000/api/users/${id}`);
        console.log(res.data)
        return {
            props: {
              user: res.data
            }
          }
    } catch(err) {
        console.log(err)
        return {
            props: {
                user: []
            }
        }
    }
    //console.log(res.data)
    
}

export default User;