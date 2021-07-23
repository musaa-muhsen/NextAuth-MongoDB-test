import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client';

const SignIn = () => {
    React.useEffect(() => {
       
        (function () {
            signIn()
          })();
    }, [])
    return ( 
    <>
    </>
  
     );
}
 
export default SignIn;
