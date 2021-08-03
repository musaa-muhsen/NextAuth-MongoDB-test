import React , {useRef} from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import moment from 'moment';
import Link from 'next/link'
//import axios from 'axios';
import styles from '../styles/Dashboard.module.scss';
import { useState, useEffect } from 'react';
import {sanityClient} from '../sanity'; 
//import {fetch as isoFetch} from 'isomorphic-unfetch';
//import fetch from 'isomorphic-unfetch';
import AdminMain from '../components/admin/AdminMain';


import useSWR from 'swr'
import fetch from 'unfetch';

const Dashboard = () => {

    const [session, loading] = useSession();
   
 
  if (loading) {
    return <p>Loading...</p>;
  }

    //  session.roles = 'admin';
  if (session.roles === 'admin') {
      return <>
               <style jsx global>{`body {background: #f7f7f5;}`}</style>
               <AdminMain />
            </>
  }

  if (session.roles !== 'admin') {
      return (
    <>
     
     {session && <>
      <p> Signed in as {session.userName} </p>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    </>
  
  )}
}

export default Dashboard

export const getServerSideProps = async (context) => {
 //console.log(context);
  //const resUsers = await isoFetch('http://localhost:3000/api/users/');
 

  //console.log(resUsers);
  // console.log('axe:', resUsers);
  const {google} = require('googleapis');
  const path = require('path');
  const fs = require('fs');

  const session = await getSession(context);


 // console.log('SESSION', session);
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
    /*
    const querySanity = `{
    "one": *[_type == "client" && name == "${session.roles}"],
    "two": *[_type == "footer"]
    }`
  const sanity = session?.roles !== 'admin' ? await sanityClient.fetch(querySanity) : null;
 // console.log("sanity data:",sanity);
*/

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



