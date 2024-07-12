"use client";

import  { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Notification from '@/components/ui/Notification';
import resetPassword from '@/firebase/auth/resetPassword';

export default function Security() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        setErrors('');
        setSuccess('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setErrors("Passwords do not match.");
        }
        else if(currentPassword === newPassword){
            setErrors("Current password is the same as the new password.");
        }
        else{
            const { result, error } = await resetPassword(currentPassword, newPassword);
            if (error) {
                setErrors("Failed to update password: " + error);
            }
            else{
                setSuccess("Password changed successfully");
            }
        }
        setLoading(false);
    };

    if (!isClient) {
        return null;  // Ensure nothing is rendered on the server
    }

    return (
        <div className="flex w-full flex-col p-10 md:px-52"> 
            <Card>
            <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage your account privacy settings.</CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input 
                                id="currentPassword" 
                                type="password" 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input 
                                id="newPassword" 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input 
                                id="confirmPassword" 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required  
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Changing..." : "Change Password"}
                        </Button>
                    </div>
                </CardContent>
            </form>
            </Card>
            {errors && (
                <Notification
                    message={errors}
                    type="error"
                    onClose={() => setErrors('')}
                />
            )}
            {success && (
                <Notification
                    message={success}
                    type="success"
                    onClose={() => setSuccess('')}
                />
            )}
        </div>
    );
}