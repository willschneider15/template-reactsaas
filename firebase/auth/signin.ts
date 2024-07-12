import {
    signInWithEmailAndPassword, 
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
import router from 'next/router';
import firebase_app from '@/firebase/config';

// Gets the Auth for your Firebase App
// Docs: https://firebase.google.com/docs/auth/web/start
const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            await GoogleAuthProvider.credentialFromResult(result);
            router.push('/');
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // // The signed-in user info.
            // const user = result.user;
            // console.log({ credential, token, user });
        })
        .catch((error) => {
            // Handle Errors here.
            
            // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log({ errorCode, errorMessage });
      });
};

// Email and password sign in
export default async function signIn(email: string, password:string) {

    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

  return { result, error };
}
