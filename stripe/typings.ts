import {dev_products, prod_products} from '@/stripe/config';

// Change this to prod_products when ready to goto production
export const selected_products = dev_products

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