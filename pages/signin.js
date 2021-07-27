import { getCsrfToken } from 'next-auth/client'
import styles from '../styles/SignInPage2.module.scss';
import { useRouter } from "next/router";

const errors = {
  Signin: "Try signing with a different account.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};
const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div>{errorMessage}</div>;
};

export default function SignIn({ csrfToken }) {
  const { error } = useRouter().query;

  return (
    <section className={styles.mainContainer}>

    <div className={styles.signFormWrapper}>
      {/* <p className={styles.title}>sign in</p> */}
    <form method='post' action='/api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
      
        <input className={ `${styles.inputs} ${styles.userInput}`} placeholder='User Name' name='username' type='text'/>
      
 
        <input className={ `${styles.inputs} ${styles.passwordInput}`} placeholder='Password' name='password' type='password'/>
  
      <button className={styles.btn}type='submit'>Sign in</button>
    </form>
    {error && <SignInError error={error} />}
    </div>
    
    </section>
    
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}