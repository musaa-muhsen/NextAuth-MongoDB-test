import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
//import axios from 'axios'

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

const refreshAccessToken = async (prevToken) => {
 
  const token = await prevToken;

  // Do what you want

  return {
    accessToken: token.accessToken,
    accessTokenExpires: Date.now() + token.expiresIn * 1000,
  };
}


const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
        name: 'Custom Provider',
        credentials : {
            username: {label: "Username", type: 'text', placeholder: 'username'},
            password: {label: "Password", type: 'password' , placeholder : 'password'}
        },
      
        authorize: async (credentials, req) => {
          
          //const userCredentials = { username: credentials.username, password: credentials.password }
          //const usersDB = await axios.get(`http://localhost:3000/api/users/`);
          // const token = await loginEndpoint(credentials);
          
          // const filteredUser = usersDB.data.data.filter((e,i,a) => {
          //   return e.userName === credentials.username && e.password === credentials.password
          //   });
          dbConnect();
          const queryResult = await User.find({});
          //console.log('query result:' ,queryResult);
          const queryConverted = JSON.parse(JSON.stringify(queryResult));
          const plainData = {
            ...queryConverted
          }
         //console.log(plainData)
        
        const data = Object.values(plainData);
        
        const filteredUser = data.filter((e,i,a) => {
          //console.log(e.userName);
          return e.userName == credentials.username && e.password == credentials.password
          });
        
         
           // or !emails || emails.length === 0
            if (filteredUser.length > 0) {
              const user = {
                name: filteredUser[0].userName,
                DB_id: filteredUser[0]._id
              }
              return Promise.resolve(user);
            } else {
              console.log('no user')
              return null
            }
        }
    }),
  ],
  pages: {
    signIn: "/signin",
    error: '/signin',
  },
  session: {
      jwt: true,
      //maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
      jwt: async (token, user, account, profile, isNewUser) => {
      // console.log('JWT')
      // if (account?.accessToken) {
      //   console.log('account:',account.accessToken);
      // } else {
      //   console.log(account)
      // }
      
      // console.log('token:',token);
      //console.log('user:',user);
      // const isSignIn = (user) ? true : false
      // // Add auth_time to token on signin in
      // if (isSignIn) { token.auth_time = Math.floor(Date.now() / 1000) }
      // return Promise.resolve(token)
      //user && user.DB_id
      if (user?.DB_id) {
        token.id = user.DB_id
      }
      return token
    },
    session: async (session, token) => {
      // console.log('here2');
      // console.log(token);
      // console.log(session);
      // if (!session?.user || !token?.account) {
      //   return session
      // }
  
      // session.user.id = token.account.id
      // session.accessToken = token.account.accessToken
      session.DB_id = token.id
      //return session;
  
      return Promise.resolve(session)
    },
     
   

     
    redirect: async (url, baseUrl) => {
      // if (url === '/api/auth/signin') {
      //   // if we're on this page redirect 
      //   return Promise.resolve('/dashboard')
      // }
        // startsWith is 
        return url.startsWith(baseUrl)
        ? Promise.resolve(`${baseUrl}/dashboard`)
        : Promise.resolve(url);    
      }, 
      
      /*
      signIn: async (user, account, profile) => {
        //console.log(user, 'this is user')
        console.log('this is the profile:', profile);
         debugger;
        return true;
      },
      */
  
      


} // end of callback
} // end of options 

export default (req, res) => NextAuth(req, res, options);

/*
(node:70666) UnhandledPromiseRejectionWarning: TypeError: payload must be an object
    at Object.module.exports [as sign] (/Users/musaa/Documents/work/auth-test2/node_modules/jose/lib/jwt/sign.js:61:11)
    at Object.encode (/Users/musaa/Documents/work/auth-test2/node_modules/next-auth/dist/lib/jwt.js:42:41)
    at Object.callback (/Users/musaa/Documents/work/auth-test2/node_modules/next-auth/dist/server/routes/callback.js:318:37)
    at runMicrotasks (<anonymous>)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
(node:70666) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 10)
*/

/*
async jwt(prevToken, token) {
        console.log('prevToken:',prevToken)
        console.log('token:',token)
        console.log('token.accessToken:',token.accessToken)
        //Initial call
        if (token) {
          return {
            accessToken: token.accessToken,
            // Assuming you can get the expired time from the API you are using
            // If not you can set this value manually
            accessTokenExpires: Date.now() + token.expiresIn * 1000,
          };
        }
    
        // Subsequent calls
        // Check if the expired time set has passed
        if (Date.now() < prevToken.accessTokenExpires) {
          // Return previous token if still valid
          return prevToken;
        }
       // Refresh the token in case time has passed
        return refreshAccessToken(prevToken);
      },
*/

  // async jwt( profile) {
          //console.log()
        // when returned true 
        // console.log("token:",token) // token: { name: 'admin', email: '60fedb5387987a2238336968',picture: undefined, sub: undefined }
        // console.log("user:",user)// { name: 'admin', email: '60fedb5387987a2238336968' }
        // console.log("account:",account) // account: { id: 'credentials', type: 'credentials' }
        // console.log("profile:",profile)// profile: { name: 'admin', email: '60fedb5387987a2238336968' }
        // console.log("isNewUser:",isNewUser) // false
       //  return profile
     // },