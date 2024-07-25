"use client";

import React from 'react';

interface TermsOfServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
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
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <div className="prose">
                    {/* Terms of Service content */}
                    <h2 className='font-bold'>1. Introduction</h2>
                    <p>By using React SaaS, you confirm your acceptance of, and agree to be bound by, these terms and conditions.</p>
                    <br/>
                    <h2 className='font-bold'>2. Agreement to Terms and Conditions</h2>
                    <p>This Agreement takes effect on the date on which you first use the React SaaS application.</p>
                    <br/>
                    <h2 className='font-bold'>3. Unlimited Access Software License with Termination Rights</h2>
                    <p>The React SaaS Software License facilitates the acquisition of React SaaS software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent creators, entrepreneurs, and small businesses, React SaaS empowers users to create compelling web pages and online portfolios.</p>
                    <p>This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization. Opting for the React SaaS Software License enables users to enjoy the benefits of the software while recognizing the licensor&apos;s unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.</p>
                    <br/>
                    <h2 className='font-bold'>4. Refunds</h2>
                    <p>Due to the nature of digital products, the React SaaS boilerplate cannot be refunded or exchanged once access is granted.</p>
                    <br/>
                    <h2 className='font-bold'>5. Disclaimer</h2>
                    <p>It is not warranted that React SaaS will meet your requirements or that its operation will be uninterrupted or error free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption or loss of contracts), so far as such exclusion or disclaimer is permitted under the applicable law are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.</p>
                    <br/>
                    <h2 className='font-bold'>6. Warranties and Limitation of Liability</h2>
                    <p>React SaaS does not give any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. React SaaS shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition or other term, or any duty at common law, for any loss of profit or any indirect, special or consequential loss, damage, costs, expenses or other claims (whether caused by React SaaS&apos;s negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by React SaaS. React SaaS shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that React SaaS is deemed liable to you for breach of this Agreement, you agree that React SaaS&apos;s liability is limited to the amount actually paid by you for your services or software, which amount calculated in reliance upon this clause. You hereby release React SaaS from any and all obligations, liabilities, and claims in excess of this limitation.</p>
                    <br/>
                    <h2 className='font-bold'>7. Responsibilities</h2>
                    <p>React SaaS is not responsible for what the user does with the user-generated content.</p>
                    <br/>
                    <h2 className='font-bold'>8. Price Adjustments</h2>
                    <p>As we continue to improve React SaaS and expand our offerings, the price may increase. The discount is provided to help customers secure the current price without being surprised by future increases.</p>
                    <br/>
                    <h2 className='font-bold'>9. General Terms and Law</h2>
                    <p>This Agreement is governed by the laws of Singapore. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and React SaaS as a result of your use of these services. You agree not to hold yourself out as a representative, agent or employee of React SaaS. You agree that React SaaS will not be liable by reason of any representation, act or omission to act by you.</p>
                    <br/>
                    <p><em>Last updated: 16 July 2024.</em></p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServiceModal;
