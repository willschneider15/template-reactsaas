
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
// TODO: Refactor to one dynamic component that handles if a user is authed, unAuthed, paid, or unPaid

export default function RouteUser({ children, redirectLink }: Props) {
    const router = useRouter();
    const { authStatus, emailVerificationStatus, loading } = useAuthContext();

    useEffect(() => {
        if (!loading && authStatus === 'authed') {
            router.push(redirectLink || '/dashboard'); // If user is authed then route to correct page
        } 
    }, [router, authStatus, redirectLink, emailVerificationStatus, loading]);

    if (authStatus === 'initial' || authStatus === 'authed' || loading) {
        return null; // Route user should not render if the user is authenticated
    }

    return <>{children}</>; // Render the children for non-authenticated users
}

type Props = React.PropsWithChildren<{
    redirectLink?: string;
}>;