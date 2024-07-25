"use client";

import React from 'react';

interface PrivacyPolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl max-h-full relative overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    ✕ {/* This represents the "X" symbol */}
                </button>
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <div className="prose">
                    {/* Terms of Service content */}
                    <p>Your privacy is important to us. It is React SaaS&apos;s policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                    <br/>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we&apos;re collecting it and how it will be used.</p>
                    <br/>
                    {/* <p>You can sign up with your Google account so your React SaaS&apos;s account username will be prefilled with your name and your public profile picture.</p>
                    <br/> */}
                    <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we&apos;ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
                    <br/>
                    <p>We don&apos;t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
                    <br/>
                    <p>We act in the capacity of a data controller and a data processor with regard to the personal data processed through React SaaS and the services in terms of the applicable data protection laws, including the EU General Data Protection Regulation (GDPR).</p>
                    <br/>
                    <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
                    <br/>
                    <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
                    <br/>
                    <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
                    <br/>
                    <p><em>This policy is effective as of 16 July 2023.</em></p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;
