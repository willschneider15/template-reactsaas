"use client";

import DashBoardLayout from "@/components/dashboard/Layout";
import Security from "@/components/dashboard/settings/Security";
import GuardedPage from "@/components/auth/GuardAccess";

export default function SecurityPage() {
    return (
        <GuardedPage>
            <DashBoardLayout name="Security">
                    <Security />
            </DashBoardLayout>
        </GuardedPage>
    );
}