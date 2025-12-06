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
    testimonials = []
}: TrustSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance testimonials every 5 seconds
    useEffect(() => {
        if (testimonials.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (clientLogos.length === 0 && testimonials.length === 0) return null;

    // Split logos into 4 rows for independent scrolling
    const rows = [];
    for (let i = 0; i < 4; i++) {
        const rowLogos = [];
        for (let j = 0; j < clientLogos.length; j++) {
            if (j % 4 === i) {
                rowLogos.push(clientLogos[j]);
            }
        }
        // Duplicate for infinite scroll
        rows.push([...rowLogos, ...rowLogos, ...rowLogos]);
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes scrollCol0 {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.333%); }
          }
          @keyframes scrollCol1 {
            0% { transform: translateY(-33.333%); }
            100% { transform: translateY(0); }
          }
          @keyframes scrollCol2 {
            0% { transform: translateY(0); }
            100% { transform: translateY(-33.333%); }
          }
          @keyframes scrollCol3 {
            0% { transform: translateY(-33.333%); }
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* LEFT: Client Logos */}
                        {clientLogos.length > 0 && (
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                                    {clientsTitle}
                                </h3>

                                {/* 4 columns, each scrolling independently */}
                                <div className="grid grid-cols-4 gap-3 h-[480px]">
                                    {rows.map((rowLogos, rowIndex) => (
                                        <div key={rowIndex} className="relative overflow-hidden">
                                            <div
                                                className="flex flex-col gap-3"
                                                style={{
                                                    animation: `scrollCol${rowIndex} ${15 + rowIndex * 2}s linear infinite`,
                                                }}
                                            >
                                                {rowLogos.map((logo, i) => (
                                                    <div
                                                        key={i}
                                                        className="relative h-[85px] w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex-shrink-0"
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
                                            className="flex transition-transform duration-500 ease-in-out h-full"
                                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                        >
                                            {testimonials.map((testimonial, idx) => (
                                                <div key={idx} className="min-w-full h-full flex items-center">
                                                    {/* Testimonial Card - Fixed Height */}
                                                    <div className="bg-white rounded-xl border-l-4 border-orange-500 p-8 md:p-10 shadow-lg w-full min-h-[450px] flex flex-col justify-center">
                                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                                            {/* Left: Large Profile Photo with name below */}
                                                            <div className="flex flex-col items-center justify-center gap-4 md:w-2/5">
                                                                {testimonial.customerPhoto?.url && (
                                                                    <div className="relative h-30 w-30 md:h-50 md:w-50 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                                                                        <Image
                                                                            src={testimonial.customerPhoto.url}
                                                                            alt={testimonial.customerName}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                )}
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
                                                    ? 'w-10 bg-orange-500'
                                                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
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
