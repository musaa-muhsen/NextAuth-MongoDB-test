import Link from 'next/link'
import {useState, useEffect} from 'react'
import axios from 'axios'
//import {Button , Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
//import fetch from 'isomorphic-unfetch';



const EditUser = ({user}) => {
    //console.log(user)
   // console.log(user)
  //const [form, setForm] = useState({})
    const [form, setForm] = useState({userName: user.data.userName, password: user.data.password});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
console.log(form);

    useEffect(() => {
        if (isSubmitting) {
            console.log(true)
            if (Object.keys(errors).length === 0) {
                updateUser();
            }
            else {
                console.log(false)
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const updateUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })

            router.push("/");
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

        if (!form.title) {
            err.userName = 'User name is required';
        }
        if (!form.description) {
            err.password = 'Password is required';
        }

        return err;
    }
    
return (
    <div>
        <div>  {
                    isSubmitting
                        ? <p>loading...</p>
                        : <form onSubmit={handleSubmit}>
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

export const getServerSideProps  = async ({ query: { id } }) => {
    //console.log(id)

      try {
          // this is for node behavour
    //    const user = await axios({
    //         method: 'get',
    //         url: `http://localhost:3000/api/users/${id}`,
    //         responseType: 'stream'
    //       })
        //const res = await fetch(`http://localhost:3000/api/users/${id}`);
       // const { data } = await res.json();
        //console.log(hello)
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
}