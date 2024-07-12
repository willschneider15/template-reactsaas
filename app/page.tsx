"use client";

import Hero from '@/components/landing/Hero';
import Header from '@/components/landing/Header';
// TODO:(Problem = Keep it Simple) into (Solution = Features), Pricing, and Footer

// This page is the landing page for the application
export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Hero/>
        </div>
    );
}
