"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Notification from '@/components/ui/Notification';
import signUp from "@/firebase/auth/signup";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isClient, setIsClient] = useState(false);  // New state to ensure client-side rendering
    const [errors, setErrors] = useState('');
    const router = useRouter();// https://nextjs.org/docs/app/api-reference/functions/use-router

    // Ensure the component renders only on the client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        // Email and password to sign in: @/firebase/auth/signup.ts
        const { result, error } = await signUp(email, password);

        if (error) {
            setErrors("Login Error:" + error);
            return;
        }

        return router.push("/dashboard"); // Navigate to the dashboard on successful signup
    };

    if (!isClient) {
        return null;  // Ensure nothing is rendered on the server
    }

    return (
        <div className="w-full lg:grid lg:min-h-[100vh] h-screen lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <form
                    onSubmit={handleFormSubmit}
                    className="mx-auto grid w-[350px] gap-6"
                >
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter information to create an account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                    {errors && ( // Displaying error message
                        <Notification
                            message={errors}
                            type="error"
                            onClose={() => setErrors('')}
                        />
                    )}
                </form>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                  src="/image-example.webp"
                  alt="Image"
                  width="1920"
                  height="1080"
                  className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
