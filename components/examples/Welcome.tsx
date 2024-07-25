// Example of a welcome page with a checklist

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
// TODO: Update review documentation link to nextsaas url for docs

export default function Welcome() {
    return (
        <Card className="m-5 md:m-10 p-10">
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Welcome, Dev!</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Explore the powerful features of our SaaS platform and unlock new possibilities for your business. Get
                        started with our intuitive dashboard and streamline your workflows.
                    </p>
                    {/* Opens external link in new tab */}
                    <Link
                        href="https://github.com/willschneider15/nextsaas/blob/main/README.md"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        prefetch={false}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Review Documentation
                    </Link>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold pt-6">Onboarding Checklist</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-2">
                            <Checkbox id="got-running" defaultChecked />
                            <Label htmlFor="got-running" className="text-md">You got the template running locally <b>congrats!</b></Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="set-preferences" />
                            <Label htmlFor="set-preferences" className="text-md">Make sure you have correct Firestore rules added</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="github" />
                            <Label htmlFor="github" className="text-md">Store and track your code on Github</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="deployment" />
                            <Label htmlFor="deployment" className="text-md">Setup deployment pipeline</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="stripe-plugin" />
                            <Label htmlFor="stripe-plugin" className="text-md">Setup Stripe plugin in Firebase</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="stripe-config" />
                            <Label htmlFor="stripe-config" className="text-md">Create your Stripe products and paste their pricingIDs into <b>stripe/config.ts</b></Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="pricing-table" />
                            <Label htmlFor="pricing-table" className="text-md">Adjust <b>components/payments/Pricing.tsx</b> for the <b>/pricing</b> page to match your needs</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="test-examples" />
                            <Label htmlFor="test-examples" className="text-md">Review and test with Firebase and Stripe examples</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="create-app" />
                            <Label htmlFor="create-app" className="text-md">Modify the template and add the business logic to create your SaaS</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="production" />
                            <Label htmlFor="production" className="text-md">Deploy the working app on your production Firebase environment</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="dns" />
                            <Label htmlFor="dns" className="text-md">Update your custom domain DNS settings to point to your app</Label>
                        </li>
                        <li className="flex items-center gap-2">
                            <Checkbox id="marketing" />
                            <Label htmlFor="marketing" className="text-md">Loop: (marketing -&gt; making money -&gt; customer feedback -&gt; improving app -&gt; marketing)</Label>
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}