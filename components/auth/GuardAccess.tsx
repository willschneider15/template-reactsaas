
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

type Props = React.PropsWithChildren<{
    redirectLink?: string;
}>;

export default function GuardAccess({ children, redirectLink }: Props) {
    const router = useRouter();
    const { authStatus, emailVerificationStatus, loading } = useAuthContext();

    useEffect(() => {
        if (authStatus === 'unAuthed') {
          router.push(redirectLink || '/login');
        } 
        // If you want to add verification email check
        // else if (
        //   authStatus === 'authed' &&
        //   emailVerificationStatus === 'unVerified'
        // ) {
        // Would need to add verify page to resend link
        // Would need to send link on first sign up
        // https://firebase.google.com/docs/auth/web/email-link-auth 
        //   router.push('/verify');
        // }
    }, [router, authStatus, redirectLink, emailVerificationStatus, loading]);

    if (loading || authStatus === 'initial' || authStatus === 'unAuthed') {
        return null; // Prevent rendering until auth status is determined
    }
    else{
        return <>{children}</>;
    }
}