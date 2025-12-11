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

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Common Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Our Clients Say
          </h2>
        </div>

        {/* Side-by-side grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ">
          {/* LEFT: Client Logos */}
          {clientLogos.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {clientsTitle}
              </h3>

              {/* Static Grid Layout */}
              <div className="grid grid-cols-3 gap-4 h-[400px] overflow-y-auto custom-scrollbar">
                {clientLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="relative h-[80px] w-full bg-white rounded-r-xl border-l-4 border-l-primary border-y border-r border-gray-100 shadow-sm flex items-center justify-center group"
                  >
                    <Image
                      src={logo}
                      alt={`Client logo ${i + 1}`}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT: Testimonials */}
          {testimonials.length > 0 && (
            <div className="flex flex-col h-full justify-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                {testimonialsTitle}
              </h3>

              {/* Main Card Container */}
              <div
                className="relative h-[320px] w-full bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col p-6 md:p-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Navigation Dots - Moved to Bottom Center */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-6 bg-orange-500"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                {/* Content Transition Wrapper */}
                <div className="relative flex-1 overflow-hidden transition-all">
                  {testimonials.map((testimonial, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col gap-4 ${
                        idx === currentIndex
                          ? "opacity-100 translate-y-0 z-10"
                          : "opacity-0 -translate-y-8 z-0"
                      }`}
                    >
                      {/* Header: Avatar + Info */}
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100">
                          {testimonial.customerPhoto?.url ? (
                            <Image
                              src={testimonial.customerPhoto.url}
                              alt={testimonial.customerName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-bold">
                              {testimonial.customerName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-tight">
                            {testimonial.customerName}
                          </h4>
                          {/* Rating */}
                          {testimonial.rating && (
                            <div className="flex gap-0.5 mt-0.5">
                              {Array.from({
                                length: testimonial.rating || 5,
                              }).map((_, i) => (
                                <span
                                  key={i}
                                  className="text-yellow-400 text-xs"
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Body: Review Text */}
                      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-slate-600 text-base leading-relaxed italic">
                          "{testimonial.review}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer: Bottom Action Bar */}
                <div className="mt-4 flex justify-end items-center pt-3 border-t border-gray-50/50">
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        (prev) => (prev + 1) % testimonials.length
                      )
                    }
                    className="group flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-orange-50 text-slate-600 hover:text-orange-600 rounded-full transition-all font-medium text-xs border border-slate-100 hover:border-orange-100"
                  >
                    Next Review
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M3.33334 8H12.6667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 3.33334L12.6667 8L8 12.6667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
