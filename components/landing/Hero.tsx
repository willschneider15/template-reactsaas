import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeroVideoDialog from "@/components/landing/HeroVideo";
// The first section below the header the visitor sees on the landing page

export default function Hero() {
    return (
        <section className="w-full py-36 md:py-32 lg:py-48 xl:py-52 bg-background">
            <div className="container px-4 md:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        {/* TODO: Replace with your key value proposition */}
                        Key value proposition to your target audience
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground">
                        {/* TODO: Explain how your product delivers value */}
                     [Product Name] helps [target audience] to [achieve specific goal] by [key feature or benefit].
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href="/signup">
                            <Button className="shadow-lg hover:shadow-xl transition-shadow" size="lg" variant="default">
                                {/* TODO: Customize your Call to Action */}
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="my-16 relative mx-6">
            
                <div className="bg-white/30 backdrop-blur-sm rounded-lg shadow-xl p-2 md:p-4 max-w-5xl mx-auto">
                    {/* TODO: Replace with your product demo and image */}
                    <HeroVideoDialog
                        className="block"
                        animationStyle="from-center"
                        videoSrc="https://www.youtube.com/embed/Y_-z3tXfPBw?si=5CYh66VhHaGwgAYq&autoplay=1"
                        thumbnailSrc="/dashboard-screenshot.webp"
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </div>
        </section>
    )
}