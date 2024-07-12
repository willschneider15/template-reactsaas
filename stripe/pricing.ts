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
import firebase_app from '@/firebase/config';
// For retrieving Stripe pricing data from Firestore which is synced with Stripe
// A stripe product can have multiple price objects under it
// We assume you only have one active price object per product for simplicity 

// Get pricing IDs at a specific path
const extractPricingIds = async (db: Firestore, collectionPath: string): Promise<string[]> => {
    const collectionRef = collection(db, collectionPath);

    // Query for status 'active' = Subscriptions
    const activeQuery = query(collectionRef, where('status', '==', 'active'));
    const activeSnapshot = await getDocs(activeQuery);
  
    // Query for status 'succeeded' = One-time Payments
    const succeededQuery = query(collectionRef, where('status', '==', 'succeeded'));
    const succeededSnapshot = await getDocs(succeededQuery);
  
    // Combine snapshots
    const allSnapshots = [succeededSnapshot, activeSnapshot];
  
    return allSnapshots.flatMap((snapshot: QuerySnapshot) =>
        snapshot.docs.flatMap(doc => {
            const data = doc.data();
            if (data.items && data.items[0] && data.items[0].price && data.items[0].price.id) {
                if(data.items[0].price.id){
                    return [data.items[0].price.id]; // For subscriptions and one time payments
                }
            }
            return [];
        })
    );
};
    
// Getting active pricing from a customer
export const getActivePricing = async (): Promise<string[]> => {
    const auth = getAuth(firebase_app);
    const userId = auth.currentUser?.uid;

    if (!userId) throw new Error("User not logged in");

    const db: Firestore = getFirestore(firebase_app);

    // Extract price.product IDs from payments
    const paymentPriceIds = await extractPricingIds(db, `customers/${userId}/payments`);
    
    // Extract price.product IDs from subscriptions
    const subscriptionPriceIds = await extractPricingIds(db, `customers/${userId}/subscriptions`);

    // Combine and deduplicate price.product IDs
    const uniquePriceIds = Array.from(new Set([ ...paymentPriceIds, ...subscriptionPriceIds]));
    // console.log("Unique Price IDs:", uniquePriceIds);

    return uniquePriceIds;
};

// Get current pricing and type data for a product
export const getActivePrice = async (db: Firestore, productId: string): Promise<{ pricingId: string, price: string, type: string } | null> => {
    const pricesRef = collection(db, `products/${productId}/prices`);
    const pricesSnapshot = await getDocs(pricesRef);
  
    for (const priceDoc of pricesSnapshot.docs) {
        const priceData = priceDoc.data();
        if (priceData.active) { // Assuming each product has only one active price
            const pricingId = priceDoc.id;
            const price = priceData.unit_amount ? (priceData.unit_amount / 100).toFixed(2) : ""; // Assuming unit_amount is in cents
            const type = priceData.type || ""; // Each price object can be of type 'one_time' or 'recurring'
            return { pricingId, price, type };
        }
    }
    return null;
  }