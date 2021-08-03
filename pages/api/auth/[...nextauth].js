import NextAuth, {NextAuthOptions} from 'next-auth'
import Providers from 'next-auth/providers'
//import axios from 'axios'

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

const options = {
  providers: [
    Providers.Credentials({
        name: 'Custom Provider',
        credentials : {
            username: {label: "Username", type: 'text', placeholder: 'username'},
            password: {label: "Password", type: 'password' , placeholder : 'password'}
        },
      
        authorize: async (credentials, req) => {
          dbConnect();
          const queryResult = await User.find({});
          const queryConverted = JSON.parse(JSON.stringify(queryResult));
          const plainData = {
            ...queryConverted
          }
        
        const data = Object.values(plainData);
        
        const filteredUser = data.filter((e,i,a) => {
          //console.log(e.userName);
          return e.userName == credentials.username && e.password == credentials.password
          });
        console.log(filteredUser);
         
           // or !emails || emails.length === 0
            if (filteredUser.length > 0) {
              const user = {
                //name: filteredUser[0].userName,
                userName: filteredUser[0].userName,
                DB_id: filteredUser[0]._id,
                roles: filteredUser[0].roles
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
     // jwt: true,
      //maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    jwt: async (token, user, account) => {


      if (user?.DB_id) {
        token.DB_id = user.DB_id
      }     
      if (user?.userName) {
        token.userName = user.userName
      }
      if (user?.roles) {
        token.roles = user.roles
      }
      //console.log('account:',account);

      return Promise.resolve(token)
    },
    session: async (session, token) => {

      if (token?.DB_id) {
        session.DB_id = token.DB_id
      }

      if (token?.userName) {
        session.userName = token.userName
      }

      if (token?.roles) {
        session.roles = token.roles
      }

      return Promise.resolve(session)
    },
    redirect: async (url, baseUrl) => {
        return url.startsWith(baseUrl)
        ? Promise.resolve(`${baseUrl}/dashboard`)
        : Promise.resolve(url);    
      }, 
} // end of callback
} // end of options 

export default (req, res) => NextAuth(req, res, options);

