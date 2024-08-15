import {dev_products, prod_products} from '@/stripe/config';

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';

// Selects products from your config based on if in DEV or PROD
export const selected_products = isProduction ? prod_products : dev_products;

export type AddDocData = {
    price: string;
    success_url: string;
    cancel_url: string;
    allow_promotion_codes: boolean;
    mode?: string; // Mode is optional
};

export type Product = {
    productId: string;
    pricingId: string;
    name: string;
    description: string;
    price: string;
    type: string;
}