"use client";

import DashBoardLayout from "@/components/dashboard/Layout";
import Posts from "@/components/examples/FirebasePosts";
import GuardAccess from "@/components/auth/GuardAccess";

// Create, Read, Update, and Destroy Firebase Example
export default function ExamplePage() {
    return (
        <GuardAccess>
            <DashBoardLayout name="Firebase Example">
                <Posts />
            </DashBoardLayout>
        </GuardAccess>
    );
}