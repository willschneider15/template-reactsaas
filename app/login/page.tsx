"use client";

import Login from "@/components/auth/Login";
import RouteUser from "@/components/auth/RouteUser";

export default function LoginPage() {
    return (
        // If the user is authenticated, redirect to the dashboard
        <RouteUser>
            <Login />
        </RouteUser>
    );
}
