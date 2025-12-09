"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Product {
    id: number;
    title: string;
    slug?: string;
    description: string;
    icon?: {
        url: string;
    };
    images?: {
        url: string;
    }[];
}

interface ProductsProps {
    products?: Product[];
    headingFont?: string;
    bodyFont?: string;
    themeColor?: string;
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] // Custom "luxury" ease
        }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const Products = ({ products = [], headingFont, bodyFont, themeColor = "#FA7C1E" }: ProductsProps) => {
    const [activeTabId, setActiveTabId] = useState<number | null>(null);

    // Set first product as active by default
    useEffect(() => {
        if (products.length > 0 && activeTabId === null) {
            setActiveTabId(products[0].id);
        }
    }, [products, activeTabId]);

    if (!products || products.length === 0) return null;

    const activeProduct = products.find(p => p.id === activeTabId) || products[0];

    return (
        <section className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="text-center mb-10"
                >
                    <motion.h2
                        variants={fadeInUp}
                        className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
                        style={{ fontFamily: headingFont }}
                    >
                        Our Products
                    </motion.h2>
                    <motion.p
                        variants={fadeInUp}
                        className="mt-2 text-sm text-neutral-600 max-w-2xl mx-auto"
                        style={{ fontFamily: bodyFont }}
                    >
                        Innovative products engineered to deliver measurable impact.
                    </motion.p>
                </motion.div>

                {/* Tabs Navigation - Icon only - Staggered Entrance */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="flex flex-wrap justify-center gap-8 mb-12"
                >
                    {products.map((product) => (
                        <motion.button
                            key={product.id}
                            variants={fadeInUp}
                            onClick={() => setActiveTabId(product.id)}
                            className="group relative outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Tab Icon */}
                            <div className={`relative h-16 w-16 transition-all duration-300 `}>
                                {product.icon ? (
                                    <Image
                                        src={product.icon.url}
                                        alt={`${product.title} icon`}
                                        fill
                                        className="object-contain rounded-2xl"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-neutral-200 rounded-2xl flex items-center justify-center text-neutral-400 text-xs">
                                        Icon
                                    </div>
                                )}

                                {/* Active Indicator (Hyphen Underline) */}
                                {activeTabId === product.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute -bottom-4 left-1/2 w-8 h-1 rounded-full -translate-x-1/2"
                                        style={{ backgroundColor: themeColor }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Content Area - Smooth Switch Transition */}
                <div className="min-h-[350px]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeProduct ? activeProduct.id : 'empty'}
                            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {activeProduct && (
                                <>
                                    {/* Left: Text Content */}
                                    <div className="space-y-6">
                                        <div>
                                            <motion.h3
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1, duration: 0.5 }}
                                                className="text-3xl font-bold text-neutral-900 mb-4"
                                                style={{ fontFamily: headingFont }}
                                            >
                                                {activeProduct.title}
                                            </motion.h3>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                                className="prose prose-base text-neutral-600 leading-relaxed text-justify"
                                                style={{ fontFamily: bodyFont }}
                                            >
                                                <p>{activeProduct.description}</p>
                                            </motion.div>
                                        </div>

                                        <Link href={`/products/${activeProduct.slug || activeProduct.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <Button
                                                    className="group text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all bg-neutral-900 text-white hover:bg-neutral-800"
                                                    style={{ fontFamily: bodyFont }}
                                                >
                                                    Learn more about {activeProduct.title}
                                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </motion.div>
                                        </Link>
                                    </div>

                                    {/* Right: Image Carousel - Scale In Reveal */}
                                    <motion.div
                                        className="relative h-[300px] lg:h-[400px] w-full"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, ease: "circOut" }}
                                    >
                                        <ProductCarousel images={activeProduct.images || []} />
                                    </motion.div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// Internal Carousel Component
const ProductCarousel = ({ images }: { images: { url: string }[] }) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-neutral-400 rounded-3xl">
                No images available
            </div>
        );
    }

    return (
        <div className="overflow-hidden h-full w-full rounded-3xl" ref={emblaRef}>
            <div className="flex h-full">
                {images.map((img, idx) => (
                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                        <Image
                            src={img.url}
                            alt={`Slide ${idx + 1}`}
                            fill
                            className="object-contain"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
