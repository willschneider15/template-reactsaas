"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Security from "@/components/dashboard/settings/Security";
import GuardedPage from "@/components/auth/GuardAccess";

export default function SecurityPage() {
    return (
        <GuardedPage>
            <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr] overflow-hidden">
                <div className="hidden lg:grid">
                    <Sidebar />
                </div>
                
                <div className="flex flex-col">
                    <Header Name={"Security"} />
                    <Security />
                </div>
            </div>
        </GuardedPage>
    );
}