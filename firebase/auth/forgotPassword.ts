import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

/**
 * Sends a password reset email to the user.
 * @param email The user's email to send the password reset link to.
 * @returns Promise<void> Resolves if the email was sent successfully.
 */
export default async function emailPasswordReset(email: string) {
    let result = null;
    let error = null;
    try {
        await sendPasswordResetEmail(auth, email);
        result = "Email sent successfully";
    } catch (e) {
        error = e;
    }
    return { result, error };
}
