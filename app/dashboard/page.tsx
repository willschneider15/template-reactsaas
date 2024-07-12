"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Welcome  from "@/components/examples/Welcome";
import GuardAccess from "@/components/auth/GuardAccess";
// TODO: Give example of rendering Welcome for paid and Pricing for unpaid

export default function DashboardPage() {
    return (
        <GuardAccess>
            <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr] overflow-hidden">
                <div className="hidden lg:grid">
                    <Sidebar />
                </div>
                <div className="flex flex-col">
                    <Header Name={"Dashboard"} />
                    <Welcome/>
                </div>
            </div>
        </GuardAccess>
    );
}
