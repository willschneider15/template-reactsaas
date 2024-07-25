"use client";

import Hero from '@/components/landing/Hero';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Pricing from '@/components/payments/Pricing';
// Recommend creating a component to highlight the problem and how your app solves it

// This is the landing page for the application
export default function Home() {
    return (
        <div className='bg-gray-100'>
            <div className="min-h-screen">
                <Header />
                <Hero/>
            </div>
            <Pricing />
            <Footer />
        </div>
    );
}
