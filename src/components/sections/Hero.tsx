"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
    headline?: string;
    subheadline?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundColor?: string;
    backgroundImages?: string[];
}

export const Hero = ({
    headline,
    subheadline,
    buttonText,
    buttonLink,
    secondaryButtonText,
    secondaryButtonLink,
    backgroundColor = '#ffffff',
    backgroundImages = []
}: HeroProps) => {
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 60 }, [Autoplay({ delay: 5000 })]);

    return (
        <section className="relative flex w-full items-center justify-center overflow-hidden py-8 md:py-8">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                {backgroundImages.length > 0 && (
                    <div className="h-full w-full overflow-hidden" ref={emblaRef}>
                        <div className="flex h-full">
                            {backgroundImages.map((src, index) => (
                                <div key={index} className="relative h-full w-full flex-[0_0_100%]">
                                    <Image
                                        src={src}
                                        alt={`Hero background ${index + 1}`}
                                        fill
                                        className="object-cover opacity-60"
                                        priority={index === 0}
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/50 to-neutral-950" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-40" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight text-center drop-shadow-sm text-neutral-900">
                            {headline || <>Empower Your Data with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Datayaan</span></>}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 sm:text-xl font-light tracking-wide">
                            {subheadline || "Seamlessly manage, analyze, and visualize your data with our enterprise-grade CMS. Built for scalability, security, and performance."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mt-8 flex flex-wrap gap-4 justify-center"
                    >
                        <Link href={buttonLink || "#"}>
                            <Button size="lg" className="text-base px-6 py-3 h-auto font-medium tracking-wide shadow-sm hover:shadow-md transition-all duration-300 bg-primary hover:bg-primary/90 border-none rounded-full">
                                {buttonText || "Get Started"}
                            </Button>
                        </Link>
                        {secondaryButtonText && (
                            <Link href={secondaryButtonLink || "#"}>
                                <Button variant="ghost" size="lg" className="text-base px-6 py-3 h-auto text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-300 font-medium tracking-wide rounded-full transition-all duration-300">
                                    {secondaryButtonText} &rarr;
                                </Button>
                            </Link>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
