"use client";

import { selected_products } from "@/stripe/typings";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Welcome  from "@/components/examples/Welcome";
import GuardAccess from "@/components/auth/GuardAccess";
import PaidAccess from "@/components/auth/PaidAccess";
import Pricing from "@/components/payments/Pricing";

const product_one = selected_products[0].pricingId; // This is the first product in your array

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
                    <PaidAccess pricingIds={['test']} unPaid={true}>
                        <Pricing/>
                    </PaidAccess>
                </div>
            </div>
        </GuardAccess>
    );
}
