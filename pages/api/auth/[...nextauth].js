import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
        name: 'Custom Provider',
        credentials : {
            username: {label: "Username", type: 'text', placeholder: 'username'},
            password: {label: "Password", type: 'password' , placeholder : 'password'}
        },
        async authorize(credentials) {
          // here is where we connect to the api 
            console.log(credentials)
           const user = {username: 'john doe', password: '1111'}
           return user
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