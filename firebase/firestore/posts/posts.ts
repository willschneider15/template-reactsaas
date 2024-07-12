import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDocs,
} from "firebase/firestore";

export interface Post {
    id?: string; // Optional `id` property
    name: string;
    description: string;
    createdAt?: any;
    updatedAt?: any;
}

const db = getFirestore();

/**
 * Add a new Post to the Firestore database.
 */
export const addPost = async (userId: string, post: Post) => {
    try {
        const collectionRef = collection(db, "users", userId, "posts");
        const postWithTimestamp = {
            ...post,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        const docRef = await addDoc(collectionRef, postWithTimestamp);
        return docRef.id;
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Delete a Post from Firestore.
 */
export const deletePost = async (userId: string, postId: string) => {
    try {
        const docRef = doc(db, "users", userId, "posts", postId);
        await deleteDoc(docRef);
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Update an existing Post in Firestore.
 */
export const updatePost = async (
    userId: string,
    postId: string,
    update: Partial<Post>
) => {
    try {
        const docRef = doc(db, "users", userId, "posts", postId);
        await updateDoc(docRef, {
          ...update,
          updatedAt: serverTimestamp(),
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * Fetch all Posts associated with a specific user from Firestore.
 */
export const getAllPosts = async (userId: string): Promise<Post[]> => {
    try {
        const collectionRef = collection(db, "users", userId, "posts");
        const querySnapshot = await getDocs(collectionRef);

        const posts: Post[] = [];

        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() } as Post);
        });

        return posts;
    } catch (error) {
        return Promise.reject(error);
    }
};
