import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import moment from 'moment';
import Link from 'next/link'
//import axios from 'axios';
import styles from '../styles/Dashboard.module.scss';
import { useState, useEffect } from 'react';
import {sanityClient} from '../sanity'; 
//import {fetch as isoFetch} from 'isomorphic-unfetch';
//import fetch from 'isomorphic-unfetch';

import useSWR from 'swr'
import fetch from 'unfetch';



//import dynamic from 'next/dynamic'

// const UnauthenticatedComponent = dynamic(() =>
//   import('../components/unauthenticated')
// )
// const AuthenticatedComponent = dynamic(() =>
//   import('../components/authenticated')
// )

const Dashboard = () => {

    const [session, loading] = useSession();
    const [userState, setUserState] = useState('');
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR('/api/users', fetcher)

  if (loading) {
    return <p>Loading...</p>;
  }
    //console.log(dataFinal);
    //if (typeof window !== 'undefined' && loading) return <p>Loading...</p>
  //console.log(dataFinal)
//   React.useEffect(async () => {
//     console.log(session)
//     const hello = await getSession()
//     console.log(hello);
//  }, [])
   
  //const momentOutcome = moment(dataFinal[0].createdTime).format('DD-MM-YYYY')

  // When rendering client side don't display anything until loading is complete
  //if (typeof window !== 'undefined' && loading) return null
  // Fetch content from protected route
  // if (session.data.name === 'admin') {
  //   console.log('ello')

  // }
//  if(session.user.name === 'admin') {
//   console.log('ello')
//   }


  if (session.user.name == 'admin') {
    console.log()

  // useEffect(()=>{
  //   let mounted = true

  //   const fetchData = async () => {
  //     try {
  //     const res = await fetch('/api/users')
  //     const json = await res.json()
    
  //     setUserState(json)
  //   } catch (err) {
  //     console.log(err)
  // }
  //   }
  //   fetchData()
  //   return function cleanup() {
  //     mounted = false
  //    }
  // },[session])
  
return <>
     <header className={styles.header}>
              <ul className={styles.ulHeader}>
                <li>{session && <> 
                 <Link href="/">
                    <a>home</a>
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

    {/* <p>Welcome, {session.user}</p> */}
    <nav style={{marginBottom: '50px'}}>
       <div>
       <Link href="/new">
            <a>Create User</a>
        </Link>
       </div>
      
    </nav>
  <div>
  {data && data.data.map(user => {
          return (
            <div style={{marginBottom: '30px'}} key={user._id}>
              <section>
                <div>
                    {/*<Link href={`/${user._id}`}>
                       <a>{user.userName}</a> 
                      <a>{user.password}</a>
                    </Link>*/}
                    <p>user name: {user.userName}</p>
                    <p>password: {user.password}</p>
                    <p>database id: {user._id}</p>
                </div>
                <div>
                  <Link href={`/${user._id}`}>
                    <button>Delete</button>
                  </Link>
                  <Link href={`/${user._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                </div>
              </section>
            </div>
          )
        })}

      </div>


  </>
} // end of if statement 

if (session !== 'admin') {
  return (
    <>
     
     {session && <>
      <p> Signed in as {session.user.name} </p>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    </>
  
  )
}
}

export default Dashboard

export const getServerSideProps = async (context) => {

  //const resUsers = await isoFetch('http://localhost:3000/api/users/');
 

  //console.log(resUsers);
  // console.log('axe:', resUsers);
  const {google} = require('googleapis');
  const path = require('path');
  const fs = require('fs');

  const session = await getSession(context);
  //console.log('SESSION', session);
  //console.log(context);

  if (!session) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return {}
  }

  // if (session) {
  //   fetch('http://localhost:3000/api/users')
  //   .then( r => r.json() )
  //   .then( data => {
  //     console.log(data);
  //   });
  // }

  //important to return only result, not Promise
//const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data, error } = useSWR('/api/users');
  // console.log('userSWR:', data);
    
    const querySanity = `{
    "one": *[_type == "client" && name == "${session.user.name}"],
    "two": *[_type == "footer"]
    }`
  const sanity = session.user.name !== 'admin' ? await sanityClient.fetch(querySanity) : null;
  console.log("sanity data:",sanity);


   // GOOGLE DRIVE API TEST CONTENT TOKEN NEEDS REFRESHING
   // https://stackoverflow.com/questions/66058279/token-has-been-expired-or-revoked-google-oauth2-refresh-token-gets-expired-i
  /*
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  const oauth2client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
  );
  
  oauth2client.setCredentials({refresh_token: REFRESH_TOKEN})
  
  const drive = google.drive({
      version: 'v3',
      auth: oauth2client
  })
  
 
const qString = '"1rC3Epgh3n7jqXLqYiWtXOCReL_AgJB4Z" in parents';

let res = await new Promise((resolve, reject) => {
    drive.files.list({
      q: qString,
      fields: 'files(id,name)', 
      orderBy: 'createdTime desc'
    }, function (err, res) {
      if (err) {
        reject(err);
      }
        resolve(res.data.files);
    });
  });

  
  const generatePublicUrl = async (file) => {
      const newFile = file;
    try {
          await drive.permissions.create({
              fileId: newFile,
              requestBody: {
                  role: 'reader',
                  type: 'anyone',
              }
          })
 
         const result = await drive.files.get({
          fileId: newFile,
          fields: 'id,name,webViewLink,webContentLink,createdTime,description'
      });

      return result.data
    } catch (error) {
       console.log(error.message)
    }  
   }

   let dataFinal = [];
for (let i = 0; i < res.length; i++) {
   dataFinal.push(await generatePublicUrl(res[i].id));
}
*/


  return {
    props: {
     // dataFinal,
      user: null,
      // users: resUsers.data
       //newData: getData()
    }, 
  }
}



