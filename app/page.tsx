"use client";


import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Pricing from '@/components/payments/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';

// This is the landing page for the application
export default function Home() {
    return (
        <div className='bg-background'>
            <div className="min-h-screen">
                <Header />
                <Hero/>
            </div>
            <ProblemSolution />
            <Pricing />
            <FAQ />
            <Footer />
        </div>
    );
}
