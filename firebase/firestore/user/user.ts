import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserMetadata } from './typings'; // Importing custom typings for UserMetadata

// A class to handle storage under your 'users' collection
export class UserCollection {
    // Static property for the collection name
    static readonly COLLECTION_NAME = 'users';

    // Function to get user metadata from Firestore
    getMetadata = async (uid: string): Promise<UserMetadata> => {
        const docRef = this.getDocRef(uid);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot#exists
                return docSnap.data() as UserMetadata; // https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot#data
            }

            throw new Error('User not found'); // Custom error if the user document does not exist
        } catch (e) {
            return Promise.reject(e);
        }
    };

    // Function to update user metadata and then retrieve the updated data
    updateAndGetMetadata = async (uid: string, data: Partial<UserMetadata>) => {
        const docRef = this.getDocRef(uid);

        try {
            await updateDoc(docRef, data); // https://firebase.google.com/docs/reference/js/firestore_lite.md#updatedoc_51a65e3
            return this.getMetadata(uid);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    // Private helper function to get a document reference
    private getDocRef = (uid: string) => {
        const db = getFirestore(); // https://firebase.google.com/docs/reference/js/firestore_.md#getfirestore
        return doc(db, UserCollection.COLLECTION_NAME, uid); // returns the document reference
    };
}

// Creating an instance of UserCollection
const userCollection = new UserCollection();

export default userCollection;
