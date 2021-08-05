import React, {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import styles from '../../styles/AdminMain.module.scss';
import Link from 'next/link';
import AdminHeader from './AdminHeader';
import NewUser from './NewUser';
import { deleteUser } from '../../utils/usersFetch';
import axios from 'axios'



export default function AdminMain() {

    const [session, loading] = useSession();
   
    const [dataState, setDataState] = useState(false);
    const [form, setForm] = useState({userName: '', password: '', roles: 'client', id: ''});
    const [edit, setEdit] = useState(false);
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertCreate, setAlertCreate] = useState(false);
    const [alertUpdate, setAlertUpdate] = useState(false);

     
    useEffect(() => {
        let t;
        if(alertDelete) {
          t = setTimeout(() => {
            setAlertDelete(false);
          }, 4000)    
        }
       
        if(alertCreate) {
           t =  setTimeout(() => {
             setAlertCreate(false);
            }, 4000)
          }

          if(alertUpdate) {
          t = setTimeout(() => {
             setAlertUpdate(false);
            }, 4000)
          }

          return()=>clearTimeout(t)
      }, [alertDelete,alertCreate,alertUpdate])


    const getUsers = async () => {
        try {
          const userPosts = await axios.get("/api/users")
          return userPosts.data
        
        } catch (err) {
          console.error(err.message);
        }
      };
      
    useEffect(async () => {

        setDataState(await getUsers());

        const interval=setInterval(async ()=>{
            setDataState(await getUsers());
           },500)

        return()=>clearInterval(interval)
    },[])
   
    return (
        <>
        <>{alertDelete && <div className={`${styles.alertDanger} ${styles.alertContainer}`}><p>🚨 deleted!</p></div>}</>
        <>{alertCreate && <div className={`${styles.alertSuccess} ${styles.alertContainer}`}><p>💾 created!</p></div>}</>
        <>{alertUpdate && <div className={`${styles.alertSuccess} ${styles.alertContainer}`}><p>✅ updated!</p></div>}</>

       <AdminHeader /> 
       <div className={styles.formContainer}>
           <NewUser form={form} setForm={setForm} edit={edit} setEdit={setEdit} alertCreate={alertCreate} setAlertCreate={setAlertCreate} alertUpdate={alertUpdate} setAlertUpdate={setAlertUpdate} />    
       </div>

<div className={styles.usersWrapper}>
{dataState.data && dataState.data.map((user, index) => {
     return (
       <div className={styles.userCardContainer} key={index}>
       
           <div className={styles.topContainer}>
               <div><div className={`${styles.makeBigger} ${styles.emojiContainer}`}>🦄</div><div className={`${styles.outputContainer}`}>{user?.userName}</div></div>
               <div><div className={`${styles.makeBigger} ${styles.emojiContainer}`}>🔑</div><div className={`${styles.outputContainer}`}>{user?.password}</div></div>
               <div><div className={`${styles.makeBigger} ${styles.emojiContainer}`}>👁</div><div className={`${styles.outputContainer}`}>{user?._id}</div></div>
               <div><div className={`${styles.makeBigger} ${styles.emojiContainer}`}>🎭</div><div className={`${styles.outputContainer}`}>{user?.roles}</div></div>

           </div>
           <div className={styles.buttonsContainer}>            
           <div className={styles.buttonsWrapper}>            
                        
               <button onClick={() => {
                      setForm({userName: user?.userName, password: user?.password, roles: user?.roles, id: user?._id });
                      setEdit(true);
                     
               }}>✏️</button>  
               <button 
               onClick={() => {  
                   deleteUser(user?._id)
                   setAlertDelete(true)
               }}
               className={styles.make}
            >🗑️</button>                 
           </div>
           </div>
         
       </div>
     )
   })} 

 </div> 
        </>
    )
}
