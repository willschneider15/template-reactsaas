import { Button } from "@/components/ui/button"
import Link from "next/link"
// The first section below the header the visitor sees on the landing page

export default function Hero() {
    return (
        <section className="w-full py-36 md:py-32 lg:py-48 xl:py-52 dark:bg-gray-900">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Revolutionize Your Business with Our SaaS Platform
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
                        Unlock the power of our cutting-edge SaaS solution to streamline your operations, boost productivity, and
                        drive growth.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href="/signup">
                            <Button className="shadow-lg hover:shadow-xl transition-shadow" size="lg" variant="default">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}