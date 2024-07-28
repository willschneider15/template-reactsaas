"use client";

import { selected_products } from "@/stripe/typings";
import DashBoardLayout from "@/components/dashboard/Layout";
import StripeTesting from "@/components/examples/StripeTesting";
import PaidAccess from "@/components/auth/PaidAccess";
import GuardAccess from "@/components/auth/GuardAccess";

const product_one = selected_products[0].pricingId;
const product_two = selected_products[1].pricingId;

// Dynamically shows the state of all products synced between firebase and stripe
// Showcases using the PaidAccess component to restrict access to a Component
// PaidAccess redirects the user to redirectLink if they do not have pricingIds
export default function ExamplePage() {
    return (
        <GuardAccess>
            <DashBoardLayout name="Stripe Example">
                    {/* Dynamically displays all valid products and state if user is paid or not */}
                    <StripeTesting />
                    {/* One or more pricingIds={[product_one, ...]} and optional redirectLink */}
                    {/* <PaidAccess pricingIds={[product_one, product_two, "fake_id"]} redirectLink="/pricing"> */}
                    <PaidAccess pricingIds={[product_one, product_two]}>
                        <h1 className="m-6 font-bold underline text-center">You have access to product one and two</h1>
                    </PaidAccess>
            </DashBoardLayout>
        </GuardAccess>
    );
}