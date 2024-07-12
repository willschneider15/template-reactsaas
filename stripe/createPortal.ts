import { getFunctions, httpsCallable } from 'firebase/functions';
import firebase_app from '@/firebase/config';

// Define an interface for the expected response data from the Cloud Function
interface PortalLinkResponse {
  url: string;
}

// Takes in user ID and creates a portal link for the user to manage their subscription
export default async function createPortal(uid: string,): Promise<string> {
    // Initialize Cloud Functions
    const functions = getFunctions(firebase_app, 'us-central1');
    let portalLinkData: PortalLinkResponse = { url: '' };

    // Get a reference to the Cloud Function
    const createPortalLinkFunction = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createPortalLink"
    );

    try {
        // Call the Cloud Function to create the portal link
        const { data } = await createPortalLinkFunction({
            customerId: uid,
            returnUrl: window.location.origin + "/billing",
        });

        // Cast the response data to the expected shape (PortalLinkResponse)
        portalLinkData = data as PortalLinkResponse;

    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }

    return new Promise<string>((resolve, reject) => {
        if (portalLinkData.url) { // Navigate to the portal link if it exists
            resolve(portalLinkData.url);
        } else {
            reject(new Error("No url returned"));
        }
    });
}
