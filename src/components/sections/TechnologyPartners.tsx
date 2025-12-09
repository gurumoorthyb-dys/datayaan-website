"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TechnologyPartnersProps {
    logos?: string[];
}

export const TechnologyPartners = ({ logos = [] }: TechnologyPartnersProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted || logos.length === 0) return null;

    // Split into two rows
    const midpoint = Math.ceil(logos.length / 2);
    const row1 = logos.slice(0, midpoint);
    const row2 = logos.slice(midpoint);

    return (
        <section className="py-10 bg-white border-neutral-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <h2 className="text-center text-2xl sm:text-3xl font-semibold text-neutral-900 mb-14">
                    Technology & Cloud Partners
                </h2>

                {/* TWO MOVING ROWS */}
                <div className="space-y-10">

                    {/* Row 1 - scroll left */}
                    <div className="overflow-hidden">
                        <div className="flex gap-14 animate-partner-left whitespace-nowrap">
                            {[...row1, ...row1].map((src, i) => (
                                <div key={i} className="relative h-12 w-28 sm:h-14 sm:w-32 flex-shrink-0">
                                    <Image fill src={src} alt="" className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - scroll right */}
                    <div className="overflow-hidden">
                        <div className="flex gap-14 animate-partner-right whitespace-nowrap">
                            {[...row2, ...row2].map((src, i) => (
                                <div key={i} className="relative h-12 w-28 sm:h-14 sm:w-32 flex-shrink-0">
                                    <Image fill src={src} alt="" className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
