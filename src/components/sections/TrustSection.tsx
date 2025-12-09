"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
    customerName: string;
    customerPhoto?: { url: string };
    review: string;
    rating?: number;
}

interface TrustSectionProps {
    clientsTitle?: string;
    clientLogos?: string[];
    testimonialsTitle?: string;
    testimonialsSubtitle?: string;
    testimonials?: Testimonial[];
}

export const TrustSection = ({
    clientsTitle = "Brands that trust us",
    clientLogos = [],
    testimonialsTitle = "Client Testimonials",
    testimonialsSubtitle = "",
    testimonials = [],
}: TrustSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance testimonials every 5 seconds
    useEffect(() => {
        if (testimonials.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length, isPaused]);

    if (clientLogos.length === 0 && testimonials.length === 0) return null;

    // Dynamic column count based on logo availability to minimize repetition
    // < 8 logos: 2 columns
    // < 15 logos: 3 columns
    // >= 15 logos: 4 columns
    const numCols = clientLogos.length < 8 ? 2 : clientLogos.length < 15 ? 3 : 4;
    const gridClass = numCols === 2 ? 'grid-cols-2' : numCols === 3 ? 'grid-cols-3' : 'grid-cols-4';

    const rows = [];
    for (let i = 0; i < numCols; i++) {
        // Use the FULL list of logos for every column to maximize vertical uniqueness
        // Shift start index to create diagonal variety (Col 0 starts at A, Col 1 starts at D, etc.)
        const shift = Math.floor(i * (clientLogos.length / numCols));
        const rowLogos = [...clientLogos.slice(shift), ...clientLogos.slice(0, shift)];

        // Ensure "Unit" is tall enough to fill viewport (approx 480px)
        // Item height ~80px (65px + 12px gap). Need ~6-7 items.
        // If full list is short (<6), repeat it until tall enough
        let unit = [...rowLogos];
        if (unit.length > 0) {
            while (unit.length < 6) {
                unit = [...unit, ...rowLogos];
            }
        } else {
            continue;
        }

        // Duplicate Unit exactly once for standard -50% loop
        rows.push([...unit, ...unit]);
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes scrollDown {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          @keyframes scrollUp {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
        `
            }} />

            <section className="py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Common Heading */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            What Our Clients Say
                        </h2>
                    </div>

                    {/* Side-by-side grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* LEFT: Client Logos */}
                        {clientLogos.length > 0 && (
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                                    {clientsTitle}
                                </h3>

                                {/* Dynamic Grid Columns */}
                                <div className={`grid ${gridClass} gap-3 h-[480px] overflow-hidden mask-gradient-y`}>
                                    {rows.map((rowLogos, rowIndex) => (
                                        <div key={rowIndex} className="relative overflow-hidden h-full">
                                            <div
                                                className="flex flex-col gap-3"
                                                style={{
                                                    animation: `${rowIndex % 2 === 0 ? 'scrollDown' : 'scrollUp'} ${20 + rowIndex * 5}s linear infinite`,
                                                }}
                                            >
                                                {rowLogos.map((logo, i) => (
                                                    // Constrained Max Width Card to prevent stretching in 2-col layout
                                                    <div
                                                        key={i}
                                                        className="relative h-[65px] w-full max-w-[200px] mx-auto bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex-shrink-0"
                                                    >
                                                        <Image
                                                            src={logo}
                                                            alt={`Client logo ${i + 1}`}
                                                            fill
                                                            className="object-contain p-2.5 transition-transform duration-300 hover:scale-105"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RIGHT: Testimonials */}
                        {testimonials.length > 0 && (
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                                    {testimonialsTitle}
                                </h3>

                                {/* Horizontal Testimonial Carousel - Fixed Height */}
                                <div className="relative h-[480px] flex flex-col">
                                    <div className="overflow-hidden flex-1">
                                        <div
                                            className="flex transition-transform duration-300 ease-in-out h-full"
                                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                        >
                                            {testimonials.map((testimonial, idx) => (
                                                <div key={idx} className="min-w-full h-full flex items-center">
                                                    {/* Testimonial Card - Fixed Height */}
                                                    <div
                                                        className="bg-white rounded-xl border-l-4 border-orange-500 p-8 md:p-10 shadow-lg w-full min-h-[450px] flex flex-col justify-center"
                                                        onMouseEnter={() => setIsPaused(true)}
                                                        onMouseLeave={() => setIsPaused(false)}
                                                    >
                                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                                            {/* Left: Large Profile Photo with name below */}
                                                            <div className="flex flex-col items-center justify-center gap-4 md:w-2/5">
                                                                <div className="relative h-30 w-30 md:h-50 md:w-50 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                                                                    {testimonial.customerPhoto?.url ? (
                                                                        <Image
                                                                            src={testimonial.customerPhoto.url}
                                                                            alt={testimonial.customerName}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                                            <svg
                                                                                className="w-16 h-16 md:w-24 md:h-24 text-gray-400"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="text-center">
                                                                    <h4 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                                                                        {testimonial.customerName}
                                                                    </h4>
                                                                    {testimonial.rating && (
                                                                        <div className="flex gap-1 justify-center mt-2">
                                                                            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                                                                <span key={i} className="text-yellow-500 text-lg">★</span>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Right: Review Text */}
                                                            <div className="md:w-3/5 flex items-center justify-center">
                                                                <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify">
                                                                    "{testimonial.review}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Carousel Dots */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        {testimonials.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                                                    ? "w-10 bg-orange-500"
                                                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                                                    }`}
                                                aria-label={`Go to testimonial ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
