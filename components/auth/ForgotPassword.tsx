"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Notification from '@/components/ui/Notification'; 
import emailPasswordReset from '@/firebase/auth/forgotPassword';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        setErrors(null);
        setSuccess(null);
        setLoading(true);

        const { result, error } = await emailPasswordReset(email);
        if (error) {
            setErrors("Failed to send password reset email:" + error);
        }
        else{
            setSuccess("Password reset email sent.");
        }
        setLoading(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    &#x2715; {/* This represents the "X" symbol */}
                </button>
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleFormSubmit}>
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
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </div>
                </form>
            </div>
            <div className="relative">
                {errors && (
                    <Notification
                    message={errors}
                    type="error"
                    onClose={() => setErrors(null)}
                    />
                )}
                {success && (
                    <Notification
                    message={success}
                    type="success"
                    onClose={() => setSuccess(null)}
                    />
                )}
            </div>  
        </div>
    );
};

export default ForgotPasswordModal;
