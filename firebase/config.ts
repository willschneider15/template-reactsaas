// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Production or Development Firebase Config
const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';

// Your web app's Firebase configuration
const firebaseConfig = isProduction ? {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_PROD,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PROD,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_PROD,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PROD,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PROD,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_PROD,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_PROD,
} : {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DEV,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEV,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEV,
};

// Initialize Firebase
const firebase_app 
  = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const database = getDatabase(firebase_app);
export default firebase_app;
