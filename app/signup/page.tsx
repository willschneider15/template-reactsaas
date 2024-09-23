'use client';

import SignUp from '@/components/auth/SignUp';
import RouteUser from "@/components/auth/RouteUser";

export default function SignUpPage() {
    return (
        // If the user is authenticated, redirect to the dashboard
        <RouteUser>
            <SignUp />
        </RouteUser>
    );
}