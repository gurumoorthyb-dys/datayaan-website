"use client";

import Image from "next/image";

interface ClientsProps {
    title?: string;
    logos?: string[];
}

export const Clients = ({
    title = "Trusted by Industry Leaders",
    logos = []
}: ClientsProps) => {

    if (!logos || logos.length === 0) return null;

    // Duplicate logos for infinite scroll
    const duplicated = [...logos, ...logos];

    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">

                {/* Title */}
                {title && (
                    <h2 className="text-center text-3xl md:text-4xl font-bold text-neutral-900 mb-10">
                        {title}
                    </h2>
                )}

                {/* Smooth scrolling marquee */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-12 animate-marquee whitespace-nowrap"
                        style={{ animationDuration: `${logos.length * 4}s` }}
                    >
                        {duplicated.map((logo, i) => (
                            <div
                                key={i}
                                className="relative h-12 w-32 sm:h-14 sm:w-40 flex-shrink-0 opacity-80 hover:opacity-100 transition"
                            >
                                <Image
                                    src={logo}
                                    alt={`Client logo ${i + 1}`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
