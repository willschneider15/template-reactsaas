import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/context/AuthContext';
import Link from "next/link"
// Header component for landing aka marketing page

export default function Header() {
    const { user } = useAuthContext();

    return (
    <header className="w-full dark:bg-gray-900 py-6 md:py-8">
        <div className="container px-6 md:px-8 flex justify-between items-center">
            <div>
            <a
                className="text-2xl font-bold tracking-tight cursor-pointer"
                href={user ? "/dashboard" : "/"} // Routing to dashboard if user is logged in
            >
                SaaS Template
            </a>
            </div>
            <div className="flex items-center gap-2">
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
        </div>
    </header>
  )
}