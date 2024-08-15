"use client";

import { selected_products } from "@/stripe/typings";
import DashBoardLayout from "@/components/dashboard/Layout";
import Welcome  from "@/components/examples/Welcome";
import GuardAccess from "@/components/auth/GuardAccess";
import PaidAccess from "@/components/payments/PaidAccess";
import Pricing from "@/components/payments/Pricing";

const product_one = selected_products[0].pricingId; // This is the first product in your array
const product_two = selected_products[1].pricingId; // This is the second product in your array

export default function DashboardPage() {
    return (
        <GuardAccess>
            <DashBoardLayout name="Dashboard">
                <Welcome/>
                <PaidAccess pricingIds={[product_one]} unPaid={true}>
                    <Pricing/>
                </PaidAccess>
            </DashBoardLayout>
        </GuardAccess>
    );
}
