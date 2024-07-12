import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => {
    // Get the current pathname
    const currentPath = usePathname();

    // Utility function to determine if the path is active
    const isActive = (path: string) => currentPath === path;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive(href)
                    ? "bg-gray-200 lg:bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            }`}
        >
            {icon}
            {children}
        </Link>
    );
};

export default NavLink;
