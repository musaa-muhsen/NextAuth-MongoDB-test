import React, {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import Link from 'next/link'
import useSWR from 'swr'
import fetch from 'unfetch';
import AdminHeader from './AdminHeader';
import NewUser from './NewUser';
import useForceUpdate from 'use-force-update';
import { deleteUser } from '../../utils/usersFetch';
import axios from 'axios'



export default function AdminMain() {

    const [session, loading] = useSession();
   
    const [dataState, setDataState] = useState(false);
    // const [checked, setChecked] = useState(false);
    // const toggleChecked = () => setChecked(value => !value);
    const [form, setForm] = useState({userName: '', password: '', roles: 'client', id: ''});
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState(false);

    
    //const forceUpdate = useForceUpdate();

    // const [mounted, setMounted] = useState(false);
    // const fetcher = (url) => fetch(url).then((res) => res.json());
    // const { data, error } = useSWR(mounted ? '/api/users': null, fetcher);
    const [list, setList] = useState([]);
    let mounted = true;

//     console.log(list.data);
// console.log
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
    console.log(dataState)

    // useEffect(() => {


    //     getUsers()
    //     .then(items => {
    //         if(mounted) {
    //           setList(items)
    //         }
    //     })

    //     return () => mounted = false;
    // },[alert,list])

    // useEffect(() => {
    //     if(alert) {
    //       setTimeout(() => {
    //         if(mounted) {
    //           setAlert(false);
    //         }
    //       }, 1000)
    //     }
    //   }, [alert])

    return (
        <>
       <AdminHeader /> 
       <NewUser form={form} setForm={setForm} edit={edit} setEdit={setEdit} alert={alert} setAlert={setAlert}/>    

<div>
{dataState.data && dataState.data.map((user, index) => {
     return (
       <div key={index}>
         <section>
           <div>
               <p><span>🦄</span> {user?.userName}</p>
               <p><span>🔒</span> {user?.password}</p>
               <p><span>👁</span> {user?._id}</p>
               <p><span>🎭</span> {user?.roles}</p>
           </div>
           <div>                 
                                              
               <button onClick={() => {
                      setForm({userName: user?.userName, password: user?.password, roles: user?.roles, id: user?._id });
                      setEdit(true);
                      //setDataState(!dataState)
                      
               }}>✏️</button>  
               <button onClick={() => {
                   
                   deleteUser(user?._id)
                   //forceUpdate();
                   //setDataState(!dataState)
            }}> 🗑</button>                 
           </div>
         </section>
       </div>
     )
   })} 

 </div> 
        </>
    )
}
