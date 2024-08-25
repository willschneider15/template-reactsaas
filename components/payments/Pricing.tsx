import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { selected_products } from '@/stripe/typings';
import { useState } from 'react';
import createCheckoutSession from "@/stripe/createCheckoutSession"
import Spinner from "@/components/ui/Spinner"; // Import Spinner component

export default function Pricing() {
    const [buttonLoading, setButtonLoading] = useState<string | null>(null); // Single loading state for buttons
    const { user } = useAuthContext();
    const router = useRouter();
    const button_one = selected_products[0];
    const button_two = selected_products[1];
    // Create a checkout session for a given priceId
    const createCheckout = async (priceId: string, type: string) => {
        if (user) {
            setButtonLoading(priceId);
            const checkoutUrl = await createCheckoutSession(priceId, user.uid, type);
            setButtonLoading(null);
            if (checkoutUrl) router.push(checkoutUrl);
        } else {
            router.push('/signup'); // User not logged in
        }
      };

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-8 px-4 md:px-6 max-w-4xl mx-auto">
                <div className="grid gap-2 text-center mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl md:leading-tight">Pricing</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl md:leading-relaxed lg:text-base lg:leading-relaxed xl:text-xl xl:leading-relaxed">
                        Choose the plan that best fits your needs. No hidden fees, ever.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="flex flex-col justify-between">
                        <CardHeader> {/* Title, Description, Features, and Call To Action Button */}
                            <CardTitle>Start</CardTitle>
                            <CardDescription>Get lifetime access to our SaaS template.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="text-4xl font-bold">$99</div>
                            <ul className="grid gap-2 text-sm">
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Unlimited access to all features
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Free updates for life
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    In-depth documentation
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Easy deployment
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full shadow-lg"
                                onClick={() => createCheckout(button_one.pricingId, button_one.type)}
                                disabled={buttonLoading === button_one.pricingId}
                            >
                                {buttonLoading === button_one.pricingId ? <Spinner /> : "Buy Now"}
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="flex flex-col justify-between">
                        <CardHeader> {/* Second product option */}
                            <CardTitle>Support</CardTitle>
                            <CardDescription>
                                Get our help to launch your SaaS fast.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="text-4xl font-bold">$4,999/month</div>
                            <ul className="grid gap-2 text-sm">
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Professional support
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Weekly meetings available
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    One request at a time
                                </li>
                                <li>
                                    <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                                    Pause or cancel anytime
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full shadow-lg"
                                onClick={() => createCheckout(button_two.pricingId, button_two.type)}
                                disabled={buttonLoading === button_two.pricingId}
                            >
                                {buttonLoading === button_two.pricingId ? <Spinner /> : "Subscribe"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}