"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Billing from "@/components/dashboard/settings/Billing";
import GuardAccess from "@/components/auth/GuardAccess";

export default function BillingPage() {
    return (
        <GuardAccess>
            <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr] overflow-hidden">
                <div className="hidden lg:grid">
                    <Sidebar />
                </div>
                <div className="flex flex-col">
                    <Header Name={"Billing"} />
                    <Billing />
                </div>
            </div>
        </GuardAccess>
    );
}