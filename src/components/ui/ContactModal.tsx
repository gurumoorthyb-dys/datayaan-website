'use client';

import Link from 'next/link';

export default function ContactModal() {
    return (
        <>
            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Request for Services Card */}
                <Link
                    href="/request-services"
                    className="group bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Request for Services</h3>
                    <p className="text-neutral-600 text-sm">Get in touch about our services</p>
                </Link>

                {/* Book a Demo Card */}
                <Link
                    href="/book-demo"
                    className="group bg-white border-2 border-neutral-200 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Product Information</h3>
                    <p className="text-neutral-600 text-sm">Schedule a product demo</p>
                </Link>
            </div>
        </>
    );
}
