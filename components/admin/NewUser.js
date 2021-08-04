import Link from 'next/link'
import {useState, useEffect} from 'react'
//import axios from 'axios'
//import {Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import useForceUpdate from 'use-force-update';


const NewUser = ({setForm, form, setEdit,edit, alert, setAlert}) => {

    //const [form, setForm] = useState({userName: '', password: '', roles: 'client'});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMsgUser, setErrorMsgUser] = useState(null)
    const [errorMsgPassword,setErrorMsgPassword] = useState(null)
    const [session, loading] = useSession();

console.log(form)
   // const router = useRouter();
   // need to figure out how this works VVV
    const updateUser = async () => {
        try {
            const res = await fetch(`/api/users/${form.id}`, {
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
            //toggleChecked()
        } catch (error) {
            console.log(error);
        }
    }
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ used by both @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                edit === true ? updateUser() : createUser();
                setEdit(false);
                setForm({userName: '', password: '', roles: 'client', id: ''});
                setAlert(true)
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

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
        <>
                 <div>
                        <form className="form-container-edit" onSubmit={handleSubmit}>
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
                                type="password"
                                value={form.password}
                            />
                            <div>
                            <select name="roles" onChange={handleChange}>
                            {/* <option selected hidden>Choose here</option> */}
                                  <option value="client">Client</option>
                                  <option value="admin">Admin</option>
                            </select>
                            </div>
                          
                          {edit === true ? <button type='submit'>Edit</button> : <button type='submit'>Create</button>} 
                        </form>
                        <div>
                            <p>{errorMsgUser }</p> 
                            <p>{errorMsgPassword }</p> 
                            <>{alert && <h2> Submit Successful</h2>}</>
                            </div>
                </div>
                
            </>
 
)
}
export default NewUser;