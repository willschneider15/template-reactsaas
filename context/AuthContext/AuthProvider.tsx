// Wrapping the entire application in the AuthProvider in the layout.tsx file
import  { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import AuthContext from './AuthContext';
import type { UserAuthData, Props, UserAuthStatus, EmailVerificationStatus } from './typings';
import userCollection, { type UserMetadata } from '@/firebase/firestore/user';

const AuthProvider = ({ children }: Props) => {
    // State variables
    // https://react.dev/reference/react/useState 
    const [authStatus, setAuthStatus] = useState<UserAuthStatus>('initial');
    const [metadata, setMetadata] = useState<UserMetadata>();
    const [user, setUser] = useState<UserAuthData>();
    const [emailVerificationStatus, setEmailVerificationStatus] = useState<EmailVerificationStatus>('unknown');
    const [loading, setLoading] = useState(true);
  
    // Initialize Firebase Authentication instance
    const auth = getAuth(firebase_app);
  
    // Set up an observer for authentication state changes
    // https://react.dev/reference/react/useEffect
    useEffect(() => {
        setAuthStatus('changing');
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthStatus(user ? 'authed' : 'unAuthed');
            if (user?.email) {
                setEmailVerificationStatus(user.emailVerified ? 'verified' : 'unVerified');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [auth]);
  
    // Fetch and save user metadata from Firestore when user changes
    useEffect(() => {
        if (user) {
            const getAndSaveUserMetadata = async () => {
              try {
                  const metadata = await userCollection.getMetadata(user.uid);
                  setMetadata(metadata);
              } catch (e) {
                // Handle error fetching metadata
              }
            };
            getAndSaveUserMetadata();
        }
    }, [user]);
  
    // Memoize the AuthContext value
    // https://react.dev/reference/react/useMemo 
    const value = useMemo(
        () => ({
            authStatus,
            emailVerificationStatus,
            metadata,
            setMetadata,
            user,
            loading,
        }),
        [authStatus, emailVerificationStatus, metadata, user, loading]
    );
  
    // Provide the AuthContext value to child components
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
  
export default AuthProvider;