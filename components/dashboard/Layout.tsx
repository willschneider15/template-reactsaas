"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";


// It gives the default dashboard layout
interface DashBoardLayoutProps {
    children: React.ReactNode;
    name: string; // Add this line
}

export default function DashBoardLayout({
    children,
    name, // Add this line
}: Readonly<DashBoardLayoutProps>) {
    return (
        <div className="h-screen flex overflow-hidden">
            <div className="hidden lg:block fixed lg:w-[280px] h-full">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col w-full lg:ml-[280px]">
                <Header Name={name} />
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
