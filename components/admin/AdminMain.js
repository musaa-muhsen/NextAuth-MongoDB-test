import React, {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import Link from 'next/link'
import useSWR from 'swr'
import fetch from 'unfetch';
import AdminHeader from './AdminHeader';
import NewUser from './NewUser';



export default function AdminMain() {

    const [session, loading] = useSession();
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR('/api/users', fetcher);
    const [dataState, setDataState] = useState(null);
    const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);
  const [form, setForm] = useState({userName: '', password: '', roles: 'client', id: ''});
  const [edit, setEdit] = useState(false)
console.log(form)
  const deleteUser = async (userId) => {     
    toggleChecked()

    try {
        await fetch(`/api/users/${userId}`, {
            method: "Delete"
        });



    } catch (error) {
        console.log(error)
    }
}
    useEffect(() => {
        setDataState(data)
    })
    //console.log(dataState)

    return (
        <>
       <AdminHeader /> 
       <NewUser setForm={setForm} form={form} edit={edit} setEdit={setEdit}/>    

<div>
{dataState && dataState.data.map((user, index) => {
     return (
       <div key={index}>
         <section>
           <div>
               <p>user name: {user?.userName}</p>
               <p>password: {user?.password}</p>
               <p>database id: {user?._id}</p>
               <p>role: {user?.roles}</p>
           </div>
           <div>                 
               <button onClick={() => deleteUser(user?._id)}>Delete</button>                                
               <button onClick={() => {
                      setForm({userName: user?.userName, password: user?.password, roles: user?.roles, id: user?._id });
                      setEdit(true);
               }}>Edit</button>                  
           </div>
         </section>
       </div>
     )
   })}

 </div> 
        </>
    )
}
