import Link from 'next/link'
import {useState, useEffect} from 'react'
//import axios from 'axios'
//import {Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';


const NewUser = () => {
    const [form, setForm] = useState({userName: '', password: '', roles: 'client'});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [errorMsgUser, setErrorMsgUser] = useState(null)
    const [errorMsgPassword,setErrorMsgPassword] = useState(null)
    const [session, loading] = useSession();

// need to figure out how this works VVV
    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createUser();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createUser = async () => {
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
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
        //console.log('e.target:',e.target); // current element 
       // console.log(e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.userName) {
            err.userName = 'User Name is required';
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
                {
                    isSubmitting
                        ? <p>loading...</p>
                        : <div className="form-wrapper-edit">
                        <form className="form-container-edit" onSubmit={handleSubmit}>
                            <input
                               type="text"
                                label='User Name'
                                placeholder='User Name'
                                name='userName'
                                onChange={handleChange}
                            />

                            <input 
                                label='Password'
                                placeholder='Password'
                                name='password'                             
                                onChange={handleChange}
                                type="password"
                            />
                            <div>
                            <select name="roles" onChange={handleChange}>
                            {/* <option selected hidden>Choose here</option> */}
                                  <option value="client">Client</option>
                                  <option value="admin">Admin</option>
                            </select>
                            </div>
                          
                            <button type='submit'>Create</button>
                        </form>
                        <div>
                            <p>{errorMsgUser }</p> 
                            <p>{errorMsgPassword }</p> 
                            </div>
                            </div>
                }
            </div>
 
)
}
export default NewUser;