import Link from 'next/link'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
//import fetch from 'isomorphic-unfetch';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';

import useSWR from 'swr'
//import fetch from 'unfetch';

const EditUser = () => {

  //const [form, setForm] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userState, setUserState] = useState({});
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [session, loading] = useSession();
    const [errorMsgUser, setErrorMsgUser] = useState(null)
    const [errorMsgPassword,setErrorMsgPassword] = useState(null)
    //const fetcher = (url) => fetch(url).then((res) => res.json());
    //const { data, error } = useSWR(`/api/users/${router.query.id}`, fetcher)
    const fetcher = (...args) => fetch(...args).then(res => res.json());

    //const initialData = props.data
    const { data } = useSWR(`/api/users/${router.query.id}`, fetcher)
  
    //const initialState = userState !== undefined ? {userName: userState.data.userName, password: data.data.password} : {};
    //const initialState = data == undefined ? {} : {userName: data.data?.userName, password: data.data?.password};
   // console.log(initialState)
    const [form, setForm] = useState({roles: 'client'});

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

    // useEffect(()=>{
    //     let mounted = true;

    //     const fetchData = async () => {
    //       const res = await fetch(`/api/users/${router.query.id}`)
    //       const json = await res.json()
    //       setUserState(json)
    //     }
    //     fetchData()
    //     return function cleanup() {
    //         mounted = false
    //        }
    //   },[])
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
            setErrorMsgUser(err.userName)
        }
        if (!form.password) {
            err.password = 'Password is required';
            setErrorMsgPassword(err.password)
        }

        return err;
    }

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
        <div className={'form-wrapper-edit'}>  
        {
                    isSubmitting
                        ? <p>loading...</p>
                        :<>
                    <form className={'form-container-edit'} onSubmit={handleSubmit}>
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
                                <div>
                            <select name="roles" onChange={handleChange}>
                            {/* <option selected hidden>Choose here</option> */}
                                  <option name="client" value="client">Client</option>
                                  <option name="admin" value="admin">Admin</option>
                            </select>
                            </div>
                            <button type='submit'>Edit</button>
                        </form>
                       <p>{errorMsgUser }</p> 
                       <p>{errorMsgPassword }</p> 
                       </>
                  }
            </div>
    </div>
)
}
export default EditUser;

// export async function getServerSideProps() {
//     const fetcher = (...args) => fetch(...args).then(res => res.json());

//     const data = await fetcher('http://localhost:3000/api/users')
//     return { props: { data } }
//   }
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