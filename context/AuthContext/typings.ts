// Possible types for each Users AuthContext
import { User } from 'firebase/auth';
import { UserMetadata } from '@/firebase/firestore/user';

export type UserAuthData = User | null | undefined;
export type UserAuthStatus = 'initial' | 'changing' | 'authed' | 'unAuthed';
export type EmailVerificationStatus = 'unknown' | 'verified' | 'unVerified';

export type AuthContextType = {
    authStatus: UserAuthStatus;
    emailVerificationStatus: EmailVerificationStatus;
    user: User | null | undefined;
    metadata: UserMetadata | undefined;
    loading: boolean;
    setMetadata: (metadata: UserMetadata) => void;
};

export type Props = {
    children: React.ReactNode;
};