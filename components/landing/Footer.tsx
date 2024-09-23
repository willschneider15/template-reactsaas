import React, { useState, useEffect } from 'react';
import TermsOfServiceModal from '@/components/legal/TermsOfServiceModal';
import PrivacyPolicyModal from '@/components/legal//PrivacyPolicyModal';


const Footer: React.FC = () => {
    const [isTermsOpen, setTermsOpen] = useState(false);
    const [isPrivacyOpen, setPrivacyOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#terms-of-service') {
                setTermsOpen(true);
            } else if (hash === '#privacy-policy') {
                setPrivacyOpen(true);
            }
        };

        // Check hash on initial load
        handleHashChange();

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div>
            <footer className="w-full py-12 text-foreground">
                <div className="container mx-auto px-6 md:px-8">
                    <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
                        <div className="text-center md:text-left">
                            <p>
                                <button
                                    id="terms-of-service"
                                    className="hover:underline"
                                    onClick={() => setTermsOpen(true)}
                                >
                                    Terms of Service
                                </button>
                                {' | '}
                                <button
                                    id="privacy-policy"
                                    className="hover:underline"
                                    onClick={() => setPrivacyOpen(true)}
                                >
                                    Privacy Policy
                                </button>
                            </p>
                        </div>
                        <div className="text-center">
                            <p>Built with: React SaaS</p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Modals */}
            <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setTermsOpen(false)} />
            <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setPrivacyOpen(false)} />
        </div>
      
    );
};

export default Footer;
