import Link from 'next/link'
import {useState, useEffect} from 'react'
import axios from 'axios'
//import {Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
//import fetch from 'isomorphic-unfetch';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';



const EditUser = ({user}) => {
    if (user) {
        console.log(user)
    }

  //const [form, setForm] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userState, setUserState] = useState(null);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [session, loading] = useSession();
    const [form, setForm] = useState({});
    

    

    useEffect(() => {
        if (isSubmitting) {
           // console.log(true)
            if (Object.keys(errors).length === 0) {
                updateUser();
            }
            else {
               // console.log(false)
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    useEffect(()=>{
        let mounted = true;

        const fetchData = async () => {
          const res = await fetch(`/api/users/${router.query.id}`)
          const json = await res.json()
          setUserState(json)
        }
        fetchData()
        return function cleanup() {
            mounted = false
           }
      },[])



    // console.log(userState)

    const updateUser = async () => {
        try {
            const res = await fetch(`/api/users/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.userName) {
            err.userName = 'User name is required';
            console.log(err.userName)
        }
        if (!form.password) {
            err.password = 'Password is required';
        }

        return err;
    }
 
    

return (
    <div>
        <div>  {
              userState &&
                    <form onSubmit={handleSubmit}>
                            <input
                               type="text"
                                label='User Name'
                                placeholder='User Name'
                                name='userName'
                                onChange={handleChange}
                                value={form.userName}
                            />

                            <input   
                                label='Password'
                                placeholder='Password'
                                name='password'                             
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                            />
                            <button type='submit'>Create</button>
                        </form>
                }
            </div>
    </div>
)
}
export default EditUser;

/*
export const getServerSideProps  = async (context) => {
    console.log(context)
    //   try {
    //     const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    //     //console.log(res.data)
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
}

*/
          // this is for node behavour
    //    const user = await axios({
    //         method: 'get',
    //         url: `http://localhost:3000/api/users/${id}`,
    //         responseType: 'stream'
    //       })
        //const res = await fetch(`http://localhost:3000/api/users/${id}`);
       // const { data } = await res.json();
        //console.log(hello)

        export async function getServerSideProps(context) {
            const session = await getSession(context);
            console.log(session)
            return {
              props: {
        
              }
            }
        }