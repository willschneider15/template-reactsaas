import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
    <header className="w-full bg-background/70 py-4 fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-filter backdrop-blur-md bg-opacity-70">
        <div className="container px-6 lg:px-24 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <Link href="/">
                    <span className="text-xl font-bold tracking-tight cursor-pointer text-foreground">
                        {/* TODO: Replace with your product name */}
                        React SaaS
                    </span>
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
                </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                    <Button className="shadow-lg hover:shadow-xl transition-shadow" size="sm" variant="secondary">
                        Login
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="shadow-lg hover:shadow-xl transition-shadow" size="sm" variant="default">
                        Sign Up
                    </Button>
                </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden px-6 py-4 space-y-4 mt-4 text-center">
                <Link href="/pricing" className="block text-lg font-medium text-muted-foreground hover:text-foreground">Pricing</Link>
                <div className="flex gap-6 mx-10 mt-4 items-center justify-center">
                    <Link href="/login" className="flex-1 mt-4">
                        <Button className="w-full shadow-lg hover:shadow-xl transition-shadow" size="sm" variant="secondary">
                            Login
                        </Button>
                    </Link>
                    <Link href="/signup" className="flex-1 mt-4">
                        <Button className="w-full shadow-lg hover:shadow-xl transition-shadow" size="sm" variant="default">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        )}
    </header>
    )
}