import Link from 'next/link'
import {useState, useEffect} from 'react'
//import axios from 'axios'
//import {Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';


const NewUser = () => {
    const [form, setForm] = useState({userName: '', password: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    
//console.log(form)

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
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.userName) {
            err.userName = 'User Name is required';
        }
        if (!form.password) {
            err.password = 'Password is required';
        }

        return err;
    }
    
return (
    <div>
        <h1>Create User</h1>
        <div>
                {
                    isSubmitting
                        ? <p>loading...</p>
                        : <form onSubmit={handleSubmit}>
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
                            <button type='submit'>Create</button>
                        </form>
                }
            </div>
    </div>
)
}
export default NewUser;