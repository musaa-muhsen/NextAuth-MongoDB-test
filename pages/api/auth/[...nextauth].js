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
            console.log(credentials)
           const user = {name: 'john Doe', email: 'john@doe.com'}
           return user
        }
    }),
  ],
  session: {
      jwt: true
  }

})