import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';

// Gets the Auth for your Firebase App
// Docs: https://firebase.google.com/docs/auth/web/start
const auth = getAuth(firebase_app);

// async function sendEmailVerification(user: User) {
//   try {
//     await sendEmailVerification(user);
//     console.log("Email verification sent!");
//   } catch (error) {
//     console.error("Error sending email verification:", error);
//   }
// }

export default async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        // sendEmailVerification(result.user)
        //   .then(() => {
        //     console.log("Email verification sent!");
        //   })
        //   .catch((error) => {
        //     console.error("Error sending email verification:", error);
        //   });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
