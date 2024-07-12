import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext'; // Assuming you have an AuthContext
import { getActivePricing } from '@/stripe/pricing';

type Props = React.PropsWithChildren<{
    redirectLink?: string;
    pricingIds: string[];
}>;

export default function PaidAccess({ children, redirectLink, pricingIds }: Props) {
    const router = useRouter();
    const { authStatus, loading} = useAuthContext();
    const [paymentLoading, setPaymentLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const checkPaymentStatus = async () => {
            if (authStatus === 'unAuthed') {
                router.push('/login');
            } else if (authStatus === 'authed') {
                const activePricing = await getActivePricing();
                const allPaid = pricingIds.every(pricingId => activePricing.includes(pricingId));
                
                if (!allPaid) {
                    // If redirectLink is not provided, do not redirect just don't render the children
                    if (redirectLink) {
                        router.push(redirectLink);
                    }
                } else {
                    setShouldRender(true); // Allow rendering only if all conditions are met
                }
            }
            setPaymentLoading(false);
        };
        if (authStatus !== 'initial') {
            checkPaymentStatus();
        }
    }, [authStatus, pricingIds, redirectLink, router]);

    if (loading || paymentLoading || authStatus === 'initial' || !shouldRender) {
        return null; // Prevent rendering until auth, payment status, and checks are determined
    }

    return <>{children}</>;
}

