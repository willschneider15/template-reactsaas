import Link from 'next/link'

// This is the 404 page for the application
export default function Component() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-primary p-4">
                    <span className="text-6xl font-bold text-primary-foreground">404</span>
                </div>
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Page not found</h1>
                <p className="mt-4 text-muted-foreground">The requested resource could not be found on this server.</p>
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}