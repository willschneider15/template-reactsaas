// Config for you Stripe products in dev and prod

// Stripe Pricing IDs are safe to expose on the client side
interface Product {
    pricingId: string;
    type: "one-time" | "recurring";
}

// Can add or remove products (e.g one or three options)
export const dev_products: Product[] = [
    {
        pricingId: "price_1PVS2oINqvSrNcSJFvDDuHux", // UPDATE THESE IDs
        type: "one-time", // one-time or recurring
    },
    {
        pricingId: "price_1PVRSCINqvSrNcSJ7KlPF2a2",
        type: "recurring",
    },
];

// Goto typings to switch from dev to prod in the app
export const prod_products: Product[] = [
    {
        pricingId: "price_1Po6aXINqvSrNcSJNWDNqTFR", // UPDATE THESE IDs
        type: "one-time", // one-time or recurring
    },
    {
        pricingId: "price_1Po6bEINqvSrNcSJjacxNw9S",
        type: "recurring",
    },
];
