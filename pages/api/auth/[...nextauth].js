import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
        name: 'Custom Provider',
        credentials : {
            username: {label: "Username", type: 'text', placeholder: 'username'},
            password: {label: "Password", type: 'password' , placeholder : 'password'}
        },
        async authorize(credentials, req) {
          //const user = { email: credentials.username, password: credentials.password }
          // here is where we connect to the api 
            //console.log(credentials); //'token username password returned'
            //console.log('@@@@@@@@@@@@@@@@@@@@@@@')
           // console.log(req.body.username);
            const users = await axios.get(`http://localhost:3000/api/users/`);
           // const trueUser = users.data.map(d => console.log(d));
            //console.log(trueUser);
           const user = {username: 'john doe', password: '1111'}
           //console.log(user);
           // the return value is the validation 
      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null or false then the credentials will be rejected
        return null
        // You can also Reject this callback with an Error or with a URL:
        // throw new Error('error message') // Redirect to error page
        // throw '/path/to/redirect'        // Redirect to a URL
      }
        }
    }),
  ],
  session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // callbacks: {
  //   redirect: async (url, _) => {
  //     if (url === '/api/auth/signin') {
  //       return Promise.resolve('/dashboard')
  //     }
  //     return Promise.resolve('/api/auth/signin')
  //   },
  //   // database goes here maybe 
  // }

})