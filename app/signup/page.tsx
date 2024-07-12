'use client';

import SignUp from '@/components/auth/SignUp';
import RouteUser from "@/components/auth/RouteUser";

export default function SignUpPage() {
    return (
        <RouteUser>
            <SignUp />
        </RouteUser>
    );
}