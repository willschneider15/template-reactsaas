// Example Component Hooked up to Firestore

import {
    addPost,
    deletePost,
    updatePost,
    Post,
    getAllPosts,
} from "@/firebase/firestore/posts/posts"; // Adjust path accordingly
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/context/AuthContext';

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useAuthContext();
    const userId = user?.uid ?? ''; // Update this accordingly or fetch from context/auth

    const fetchPosts = useCallback(async () => {
      if (!userId) {
            console.warn("No user is currently logged in");
            return;
      }
      try {
            const fetchedPosts = await getAllPosts(userId);
            setPosts(fetchedPosts);
      } catch (error) {
            console.error("Error fetching posts:", error);
      }
    }, [userId]);

    const handleCreate = async () => {
        const newPost: Post = {
            name: "New Post",
            description: "Description of the new post",
        };
        const id = await addPost(userId, newPost);
        setPosts((prev) => [...prev, { ...newPost, id }]);
    };

    const handleDelete = async (id: string) => {
        await deletePost(userId, id);
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    const handleUpdate = async (id: string, update: Partial<Post>) => {
        await updatePost(userId, id, update);
        setPosts((prev) =>
            prev.map((post) => (post.id === id ? { ...post, ...update } : post))
        );
    };

    useEffect(() => {
        fetchPosts();
    }, [userId, fetchPosts]);

    return (
        <div className="overflow-x-auto bg-card rounded-lg border border-border overflow-hidden m-5 md:m-10 p-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post, index) => (
                      <TableRow key={index}>
                          <TableCell className="text-foreground">{post.name}</TableCell>
                          <TableCell className="text-foreground">{post.description}</TableCell>
                          <TableCell>
                              <div className="flex space-x-2">
                                  <Button variant="secondary" onClick={() => handleUpdate(post.id!, { name: "Updated Name" })}>
                                        Update
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleDelete(post.id!)}>
                                        Delete
                                  </Button>
                              </div>
                          </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4">
                <Button onClick={handleCreate}>Create Post</Button>
            </div>
        </div>
    );
}