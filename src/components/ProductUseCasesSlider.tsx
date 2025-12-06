"use client";

import Image from "next/image";
import { useRef } from "react";

export default function ProductUseCasesSlider({ useCases }: { useCases: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "right" ? 350 : -350,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full">
            {/* Arrows */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center z-10"
            >
                ←
            </button>

            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border bg-white shadow flex items-center justify-center z-10"
            >
                →
            </button>

            {/* Slider */}
            <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scroll-smooth hide-scrollbar py-6"
            >
                {useCases.map((uc, idx) => (
                    <div
                        key={idx}
                        className="min-w-[320px] w-[320px] rounded-2xl bg-white shadow p-4 flex flex-col gap-4"
                    >
                        <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-neutral-100">
                            {uc.imageUrl ? (
                                <Image
                                    src={uc.imageUrl}
                                    alt={uc.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <p className="text-neutral-500 text-center mt-16">
                                    No image
                                </p>
                            )}
                        </div>

                        <h3 className="text-lg font-semibold">{uc.title}</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            {uc.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
