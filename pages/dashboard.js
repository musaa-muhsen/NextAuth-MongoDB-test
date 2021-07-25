import React from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import moment from 'moment';
import Link from 'next/link'
import axios from 'axios';
import styles from '../styles/Dashboard.module.scss';
//import dynamic from 'next/dynamic'

// const UnauthenticatedComponent = dynamic(() =>
//   import('../components/unauthenticated')
// )
// const AuthenticatedComponent = dynamic(() =>
//   import('../components/authenticated')
// )

const Dashboard = ({dataFinal, users}) => {

    const [session, loading] = useSession();
    //console.log(session.user)
    //if (typeof window !== 'undefined' && loading) return <p>Loading...</p>
  //console.log(dataFinal)
//   React.useEffect(async () => {
//     console.log(session)
//     const hello = await getSession()
//     console.log(hello);
//  }, [])
   
  //const momentOutcome = moment(dataFinal[0].createdTime).format('DD-MM-YYYY')
  //if (typeof window !== 'undefined' && loading) return null

  if (loading) {
    return <p>Loading...</p>;
  }
  if (session) {
      return <>
  <div className={styles.navContainer}>
   <nav>
        <div> <Link href="/dashboard">
            <a>All Users</a>
        </Link></div>
       <div>
       <Link href="/new">
            <a>Create User</a>
        </Link>
       </div>
      
    </nav>

    {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
    </div>
  {/* <p>Welcome, {session.user}</p> */}
  <div>
        {users.data.map(user => {
          return (
            <div key={user._id}>
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
}
}

export default Dashboard

export const getServerSideProps = async (context) => {
  const resUsers = await axios.get('http://localhost:3000/api/users');


  const {google} = require('googleapis');
  const path = require('path');
  const fs = require('fs');

  const session = await getSession(context)
  if (!session) {
    context.res.writeHead(302, { Location: '/' })
    context.res.end()
    return {}
  }

  //console.log('This is the session:', session)

  const CLIENT_ID = '638223286014-v1vks5ge9070m6o94eksa0upm1k2sktg.apps.googleusercontent.com',
  CLIENT_SECRET = 're2pjUAcoPenWNo0U2AZmX3O',
  REDIRECT_URI = 'https://developers.google.com/oauthplayground',
  REFRESH_TOKEN = '1//04Qb_d15fB5HjCgYIARAAGAQSNwF-L9IrGR9yR6-CuMOl2VjXEu2tRngJGMcCCxi6tCw2tuoQJPT782VRsFkQwaoYQmAT78FkvsA';
  
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

  return {
    props: {
      dataFinal,
      user: session,
      users: resUsers.data
       //newData: getData()
    }, 
  }
}



