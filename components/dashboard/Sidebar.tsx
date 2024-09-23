"use client";

import { MdHome, MdInfo } from "react-icons/md";
import Link from "next/link";
import NavLink from "@/components/dashboard/NavLink";

export default function Sidebar() {
    return (
        <div className="h-full overflow-y-auto lg:border-r lg:block bg-secondary">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        {/* <Image src="/logo.webp" alt="Logo" width="32" height="32" /> */}
                        <p className="text-foreground">React Saas - Template</p>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <NavLink href="/dashboard" icon={<MdHome className="h-4 w-4" />}>
                            Dashboard
                        </NavLink>
                        {/* CRUD Firebase Example */}
                        <NavLink href="/examples/firebase_example" icon={<MdInfo className="h-4 w-4" />}>
                            Firebase Example
                        </NavLink>
                        {/* Dynamic Stripe Example */}
                        <NavLink href="/examples/stripe_example" icon={<MdInfo className="h-4 w-4" />}>
                            Stripe Example
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}
