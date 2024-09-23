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
                    ? "bg-card shadow-lg border-border text-card-foreground"
                    : "hover:text-card-foreground text-muted-foreground"
            }`}
        >
            {icon}
            {children}
        </Link>
    );
};

export default NavLink;
