"use client";

import DashBoardLayout from "@/components/dashboard/Layout";
import Billing from "@/components/dashboard/settings/Billing";
import GuardAccess from "@/components/auth/GuardAccess";

export default function BillingPage() {
    return (
        <GuardAccess>
            <DashBoardLayout name="Billing">
                    <Billing />
            </DashBoardLayout>
        </GuardAccess>
    );
}