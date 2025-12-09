"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
    headline?: string;
    subheadline?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundColor?: string;
    backgroundImages?: string[];
    headingFont?: string;
    bodyFont?: string;
}

export const Hero = ({
    headline,
    subheadline,
    buttonText,
    buttonLink,
    secondaryButtonText,
    secondaryButtonLink,
    backgroundImages = [],
    headingFont,
    bodyFont
}: HeroProps) => {

    const [mounted, setMounted] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Filter out invalid images
    const images = backgroundImages?.length > 0 ? backgroundImages : ["/5.JPG"];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    if (!mounted) return null;

    return (
        <section className="relative w-full min-h-[520px] flex items-center overflow-hidden">

            {/* BACKGROUND IMAGE SLIDESHOW */}
            <div className="absolute inset-0 -z-10">
                {images.map((img, index) => (
                    <motion.div
                        key={img}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={img}
                            alt={`Hero Background ${index + 1}`}
                            fill
                            priority={index === 0}
                            className="object-cover object-right"
                        />
                    </motion.div>
                ))}
            </div>

            {/* GRADIENT OVERLAY (BEHIND CONTENT) */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent -z-20"></div>

            {/* LEFT CONTENT */}
            <div className="relative w-full lg:w-1/2 px-6 sm:px-12 lg:px-16 py-10">

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-4xl font-semibold text-slate-900 leading-tight mb-4"
                    style={{ fontFamily: headingFont }}
                >
                    {headline ? (
                        <span dangerouslySetInnerHTML={{ __html: headline }} />
                    ) : (
                        <>
                            Build Future Ready Digital <br /> Solutions with Us
                        </>
                    )}
                </motion.h2>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-slate-700 max-w-xl mb-8 text-justify"
                    style={{ fontFamily: bodyFont }}
                >
                    {subheadline ||
                        "We help businesses modernize systems, automate operations, and engineer scalable digital platforms that grow with your vision."}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                >
                    <Link href={buttonLink || "#"}>
                        <Button
                            size="lg"
                            className="px-6 py-1.5 h-auto text-base font-bold text-white bg-[#ff8800] rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
                        >
                            {buttonText || "Talk to Us"}
                        </Button>
                    </Link>

                    {secondaryButtonText && (
                        <Link href={secondaryButtonLink || "#"}>
                            <Button
                                size="lg"
                                className="px-6 py-5 h-auto text-base font-bold text-slate-600 bg-transparent border-2 border-slate-300 rounded-full hover:border-[#ff8800] hover:text-[#ff8800] transition-all"
                            >
                                {secondaryButtonText}
                            </Button>
                        </Link>
                    )}
                </motion.div>

            </div>

            {/* CUSTOM MASK STYLE (If needed for further refinement, keeping simple for now) */}
            <style jsx>{`
                .hero-mask {
                    mask-image: none !important;
                    -webkit-mask-image: none !important;
                }
            `}</style>
        </section>
    );
};
