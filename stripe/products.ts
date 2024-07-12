import {
    collection,
    Firestore,
    getFirestore,
    query,
    where,
    getDocs,
    QuerySnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Product } from '@/stripe/typings';
import { getActivePrice } from '@/stripe/pricing';
import firebase_app from '@/firebase/config';
// For retrieving Stripe product data from Firestore which is synced with Stripe
// A stripe product can have multiple price objects under it
// We assume you only have one active price object per product for simplicity 

// Getting Product IDs at a specific path
const extractProductsIds = async (db: Firestore, collectionPath: string): Promise<string[]> => {
    const collectionRef = collection(db, collectionPath);

    // Query for status 'active' = Subscriptions
    const activeQuery = query(collectionRef, where('status', '==', 'active'));
    const activeSnapshot = await getDocs(activeQuery);

    // Query for status 'succeeded' = One-time Payments
    const succeededQuery = query(collectionRef, where('status', '==', 'succeeded'));
    const succeededSnapshot = await getDocs(succeededQuery);

    // Combine snapshots One-time Payments and Subscriptions
    const allSnapshots = [succeededSnapshot, activeSnapshot];

    return allSnapshots.flatMap((snapshot: QuerySnapshot) =>
    snapshot.docs.flatMap(doc => {
        const data = doc.data();
        if (data.items && data.items[0] && data.items[0].price && data.items[0].price.product) {
            if(data.items[0].price.product.id){
                return [data.items[0].price.product.id]; // For subscriptions
            }
            else{
                return [data.items[0].price.product]; // For one time payments
            }
        }
        return [];
    })
  );
};
  
// Getting active products from the signed in customer
export const getActiveProducts = async (): Promise<string[]> => {
    const auth = getAuth(firebase_app);
    const userId = auth.currentUser?.uid;
  
    if (!userId) throw new Error("User not logged in");
  
    const db: Firestore = getFirestore(firebase_app);
  
    // Extract price.product IDs from payments
    const paymentProductIds = await extractProductsIds(db, `customers/${userId}/payments`);
    
    // Extract price.product IDs from subscriptions
    const subscriptionProductIds = await extractProductsIds(db, `customers/${userId}/subscriptions`);
  
    // Combine and deduplicate price.product IDs
    const uniquePriceIds = Array.from(new Set([ ...paymentProductIds, ...subscriptionProductIds]));
  
    return uniquePriceIds;
};

// Get all products from the database synced with Stripe
export const getAllProducts = async (): Promise<Product[]> => {
    const db: Firestore = getFirestore(firebase_app);
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);

    const products_all: Product[] = (await Promise.all(querySnapshot.docs.map(async (doc) => {
        const { name, description } = doc.data();
        const productId = doc.id;
        const activePrice = await getActivePrice(db, productId);
        
        if(activePrice){
            const { pricingId, price, type } = activePrice;
            return { productId, pricingId, name, description, price, type };
        }
    }))).filter((product): product is Product => (product !== null && product !== undefined));

    // Filter out any null values in the result
    return products_all
};
