import {
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

/**
 * Reauthenticate the user with the current password.
 * @param currentPassword The user's current password.
 * @returns Promise<void> Resolves if reauthentication is successful.
 */
export const reauthenticate = async (currentPassword: string) => {
    const user = auth.currentUser;
    
    if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    } else {
        throw new Error("User is not authenticated");
    }
}

/**
 * Resets the user's password.
 * @param currentPassword The user's current password.
 * @param newPassword The new password to be set.
 * @returns Promise<{ result: any; error: any }> The result of the password reset operation.
 */
export default async function resetPassword(currentPassword: string, newPassword: string) {
    let result = null;
    let error = null;
    const user = auth.currentUser;

    try {
        await reauthenticate(currentPassword);
        if (user) {
            await updatePassword(user, newPassword);
            result = "Password updated successfully";
        } else {
            throw new Error("User is not authenticated");
        }
    } catch (e) {
        error = e;
    }
    return { result, error };
}
    