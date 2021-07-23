import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

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
          const usersDB = await axios.get(`http://localhost:3000/api/users/`);
          
          // console.log(userCredentials);
          // console.log('@@@@@@@@@@@@@@@@@@@@@@')
          // console.log(usersDB.data.data);  

          const filteredUser = usersDB.data.data.filter((e,i,a) => {
            return e.userName === credentials.username && e.password === credentials.password
            });
           console.log(filteredUser._id)
           // or !emails || emails.length === 0
            if (filteredUser.length > 0) {
              const user = { 
                             name: filteredUser[0].userName,
                             email: filteredUser[0].password , 
                             image: filteredUser[0]._id
                            }
              return Promise.resolve(user);
            } else {
              console.log('no user')
              return null
            }
        }
    }),
  ],
  session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
  
    redirect: async (url, baseUrl) => {
      // if (url === '/api/auth/signin') {
      //   // if we're on this page redirect 
      //   return Promise.resolve('/dashboard')
      // }
        // startsWith is 
        return url.startsWith(baseUrl)
        ? Promise.resolve('/dashboard')
        : Promise.resolve(url);    
      },
      signIn: async (user, account, profile) => {
        //console.log(user, 'this is user')
        console.log('this is the profile:', profile);
         debugger;
        return true;
      },
      async jwt(token, user, account, profile, isNewUser) {
        //console.log(token, user, account, profile, isNewUser)
        if (account?.accessToken) {
          token.accessToken = account.accessToken
        }
        if (user?.roles) {
          token.roles = user.roles
        }
        return token
      },
      async session(session, token) {
        console.log('this is session & token:' ,session, token)
        if(token?.accessToken) {
          session.accessToken = token.accessToken
        }
        if (token?.roles) {
          session.user.roles = token.roles
        }
        return session
      }
},
  

    

};

export default (req, res) => NextAuth(req, res, options);
