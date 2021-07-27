import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
//import axios from 'axios'

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

// const refreshAccessToken = async (prevToken) => {
//   const token = await refreshEndpoint(prevToken);

//   // Do what you want

//   return {
//     accessToken: token.accessToken,
//     accessTokenExpires: Date.now() + token.expiresIn * 1000,
//   };
// }


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
                email: filteredUser[0]._id
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
      maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt(token) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    }, async session(session, token) {
      // Add property to session, like an access_token from a provider.
      // so these will be created as object literials 
      session.accessToken = token.accessToken
      return session
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
    
       
     // async jwt(prevToken, token) {
        // Initial call
      //   if (token) {
      //     return {
      //       accessToken: token.accessToken,
      //       // Assuming you can get the expired time from the API you are using
      //       // If not you can set this value manually
      //       accessTokenExpires: Date.now() + token.expiresIn * 1000,
      //     };
      //   }
    
      //   // Subsequent calls
      //   // Check if the expired time set has passed
      //   if (Date.now() < prevToken.accessTokenExpires) {
      //     // Return previous token if still valid
      //     return prevToken;
      //   }
    
      //   // Refresh the token in case time has passed
      //   return refreshAccessToken(prevToken);
      // },
      /*
      signIn: async (user, account, profile) => {
        //console.log(user, 'this is user')
        console.log('this is the profile:', profile);
         debugger;
        return true;
      },
      */
      // async jwt(token, user, account, profile, isNewUser) {
      //   //console.log(token, user, account, profile, isNewUser)
      //   if (account?.accessToken) {
      //     token.accessToken = account.accessToken
      //   }
      //   if (user?.roles) {
      //     token.roles = user.roles
      //   }
      //   return token
      // },
      // async session(session, token) {
      //   //console.log('this is session & token:' ,session, token)
      //   if(token?.accessToken) {
      //     session.accessToken = token.accessToken
      //   }
      //   if (token?.roles) {
      //     session.user.roles = token.roles
      //   }
      //   return session
      // }
      
},
};

export default (req, res) => NextAuth(req, res, options);
