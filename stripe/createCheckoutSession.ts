import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import type { AddDocData } from '@/stripe/typings';

// Completed first test
export default async function createCheckoutSession(
    myPriceId: string,
    uid: string,
    type: string
): Promise<string> {

    const db = getFirestore();
    const collectionRef = collection(db, 'customers', uid, 'checkout_sessions');

  // Create the document data
    const docData: AddDocData = {
        price: myPriceId,
        success_url: window.location.origin + "/billing",
        cancel_url: window.location.origin + "/billing",
        allow_promotion_codes: true,
    };

    if (type !== "recurring") {
        docData.mode = "payment"; // Only include 'mode' if type is not 'subscription'
    }

    // Add the document to Firestore
    const docRef = await addDoc(collectionRef, docData);

    return new Promise<string>((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() as {
                error?: { message: string };
                url?: string;
            };
            if (error) {
                unsubscribe();
                reject(new Error(`An error occurred: ${error.message}`));
            }
            if (url) {
                // console.log("Stripe Checkout URL:", url);
                unsubscribe();
                resolve(url);
            }
        });
    });
}
