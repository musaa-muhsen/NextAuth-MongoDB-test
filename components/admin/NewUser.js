import Link from 'next/link'
import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import styles from '../../styles/NewUser.module.scss';



const NewUser = ({setForm, form, setEdit,edit, alertCreate, setAlertCreate ,alertUpdate,setAlertUpdate}) => {

    //const [form, setForm] = useState({userName: '', password: '', roles: 'client'});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorMsgUser, setErrorMsgUser] = useState(null)
    const [errorMsgPassword,setErrorMsgPassword] = useState(null)
    const [session, loading] = useSession();


   // const router = useRouter();
   // need to figure out how this works VVV
    const updateUser = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
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
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ used in both @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                if (edit === true) {
                    updateUser(form.id);
                    setAlertUpdate(true) 
                    setEdit(false);
                } else {
                    createUser();
                    setAlertCreate(true)
                }         
                setForm({userName: '', password: '', roles: 'client', id: ''});
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

    const inputRef = useRef(null);

    const showPassword = () => {
      //inputRef.current.classList.add("green");
      const currentType = inputRef.current.type;
      inputRef.current.type = currentType === "text" ? "password" : "text";
    };
    
return (
        <>
                        <form className={styles.formContainer} onSubmit={handleSubmit}>
                        {/* <div className={styles.borderTop}>
                            </div> */}
                            <div className={styles.formWrapper}>
                            <input
                               type="text"
                                label='User Name'
                                placeholder='User Name'
                                name='userName'
                                onChange={handleChange}
                                value={form.userName}
                                className={styles.userNameInput}

                            />
                            <div className={styles.borderTop}>
                            </div >
                            <div className={styles.passwordContainer}>
                            <input 
                                label='Password'
                                placeholder='Password'
                                name='password'                             
                                onChange={handleChange}
                                ref={inputRef} 
                                type={"password"}
                                value={form.password}
                                className={styles.passwordInput}
                            />
                            <div className={styles.showPasswordContainer} onClick={showPassword}><div >👀</div></div>
                            </div>
                            {/* <div className={styles.borderTop}>
                            </div> */}
                            </div>
                            <div>
                            <select className={styles.selector} name="roles" onChange={handleChange}>
                             <option selected hidden>Choose Role</option>  
                                  <option value="client">client</option>
                                  <option value="admin">admin</option>
                            </select>
                            </div>
                            <div className={styles.submitContainer}>
                          {edit === true ? <button className={styles.updateBtn} type='submit'>Update</button> : <button className={styles.saveBtn} type='submit'>Save</button>}
                          </div> 
                        </form>
                        <div>
                            <p>{errorMsgUser }</p> 
                            <p>{errorMsgPassword }</p> 
                            </div>
                
            </>
 
)
}
export default NewUser;