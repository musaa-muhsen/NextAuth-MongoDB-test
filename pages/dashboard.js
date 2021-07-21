import { signIn, signOut, useSession } from 'next-auth/client';
import moment from 'moment';
//import dynamic from 'next/dynamic'

// const UnauthenticatedComponent = dynamic(() =>
//   import('../components/unauthenticated')
// )
// const AuthenticatedComponent = dynamic(() =>
//   import('../components/authenticated')
// )


const Dashboard = ({dataFinal}) => {
    const [session, loading] = useSession()
    //if (typeof window !== 'undefined' && loading) return <p>Loading...</p>

  console.log(dataFinal)
   
  const momentOutcome = moment(dataFinal[0].createdTime).format('DD-MM-YYYY')

  //const [ session, loading ] = useSession()

  return <>
    {/* {!session && <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>} */}

  </>
}

export default Dashboard

//export const getServerSideProps = async (context) => {
// you wouldn't have this on this page you would have it on the dashboard page 
export const getServerSideProps = async (context) => {


  //console.log(globalStore.get('baseUrl'));

  // add things to routes maybe?
  const {google} = require('googleapis');
  const path = require('path');
  const fs = require('fs');
  //const async = require("async");
  
  // remember to hide these in .env 
  const CLIENT_ID = '638223286014-v1vks5ge9070m6o94eksa0upm1k2sktg.apps.googleusercontent.com',
  CLIENT_SECRET = 're2pjUAcoPenWNo0U2AZmX3O',
  REDIRECT_URI = 'https://developers.google.com/oauthplayground',
  REFRESH_TOKEN = '1//04Qb_d15fB5HjCgYIARAAGAQSNwF-L9IrGR9yR6-CuMOl2VjXEu2tRngJGMcCCxi6tCw2tuoQJPT782VRsFkQwaoYQmAT78FkvsA';
  
  // const CREDENTIALS = {
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     redirectUri: process.env.REDIRECT_URI,
  //     refreshToken: process.env.REFRESH_TOKEN
  // }
   //console.log(parseInt(process.env.CLIENT_ID))
  
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
  
  //console.log(filepath)
  // get mimiType extension 
  
  // need to add that are deleted @@@@@@@@@@@@@@
  
/*
  const driver = drive.files.list({ 
      //q : 'fullText contains "index.js"',
      // below would be dynamic so ${} 
      q: qString,
      //pageSize: 5,
      fields: 'files(id,name,webViewLink)', // this is what gets returned 
      //orderBy: 'createdTime desc'
  }, 
  // this is callback can we make this async await 
  (err, res) => {
      if (err) throw err;
      const files = res.data.files;
     // getData(files)
      if (files.length) {
      files.map(async (file) => {
          // file.id , file.name
       var gpu =  generatePublicUrl(file.id);
        
         return hello;
        // console.log(file)
      });
      } else {
        console.log('No files found');
      }
  });
*/
// the api call will get this for us from sanity 
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
      // const mapped = res.data.files.map(async (data, i) => {
      //  return awaitgeneratePublicUrl(data.id)
      // })
    // console.log(res.data.files);
   // console.log(await mapped)
        resolve(res.data.files);
    });
  });

  //,webViewLink

  //console.log(res[0].id);

    // use this to create permission 
  // the technique i want is to search the name and children and access the fileID then use that fileId to change the permission for only that request  
  const generatePublicUrl = async (file) => {
      //const newFile = '"1rC3Epgh3n7jqXLqYiWtXOCReL_AgJB4Z" in parents';
      const newFile = file;
    try {
  // currently the permissions is only for the user who uploaded this file 
          await drive.permissions.create({
              fileId: newFile,
              requestBody: {
                  role: 'reader',
                  type: 'anyone',
              }
          })
        //console.log(response);
         // Gets a file's metadata or content by ID.
         const result = await drive.files.get({
          fileId: newFile,
          fields: 'id,name,webViewLink,webContentLink,createdTime,description'
      });
      //console.log(result.data)
      return result.data


    } catch (error) {
       console.log(error.message)
    }  
   }

   let dataFinal = [];
for (let i = 0; i < res.length; i++) {
   dataFinal.push(await generatePublicUrl(res[i].id));
}

//console.log(dataFinal, 'poo');

// this can just be an id 
   //const fineResult = await generatePublicUrl(res[0].id);
   //const fineResult2 = await generatePublicUrl(res[1].id);

  return {
    props: {
      dataFinal
       //newData: getData()
    }, 
  }
}