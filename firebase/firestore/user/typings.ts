export type UserMetadata = {
    // Ideas for user metadata to store in Firestore
    hasUsedFreeCredit: boolean; // Giving a free credit checking if it was used
    disclaimerAccepted: boolean; // Saving if a user accepted a disclaimer
    profilePicture: string;   // Saving URL for image uploaded by user to Firebase Storage and link it here
};
