"use client";

import Login from "@/components/auth/Login";
import RouteUser from "@/components/auth/RouteUser";

export default function LoginPage() {
    return (
        <RouteUser>
            <Login />
        </RouteUser>
    );
}
