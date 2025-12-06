"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
}

export const Products = ({ products = [] }: ProductsProps) => {
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
        <section className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                        Our Products
                    </h2>
                    <p className="mt-2 text-sm text-neutral-600 max-w-2xl mx-auto">
                        Innovative products engineered to deliver measurable impact.
                    </p>
                </div>

                {/* Tabs Navigation - Icon only */}
                <div className="flex flex-wrap justify-center gap-8 mb-4">
                    {products.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => setActiveTabId(product.id)}
                            className="group relative outline-none transition-all duration-300"
                        >
                            {/* Tab Icon */}
                            <div className="relative h-16 w-16 transition-transform duration-300 hover:scale-105">
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
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-h-[350px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct ? activeProduct.id : 'empty'}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                        >
                            {activeProduct && (
                                <>
                                    {/* Left: Text Content */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                                                {activeProduct.title}
                                            </h3>
                                            <div className="prose prose-base text-neutral-600 leading-relaxed text-justify">
                                                <p>{activeProduct.description}</p>
                                            </div>
                                        </div>

                                        <Link href={`/products/${activeProduct.slug || activeProduct.title.toLowerCase().replace(/\s+/g, '-')}`}>
                                            <Button className="group text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
                                                Learn more about {activeProduct.title}
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Right: Image Carousel - No border/background */}
                                    <div className="relative h-[300px] lg:h-[400px] w-full">
                                        <ProductCarousel images={activeProduct.images || []} />
                                    </div>
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
            <div className="flex items-center justify-center h-full text-neutral-400">
                No images available
            </div>
        );
    }

    return (
        <div className="overflow-hidden h-full w-full" ref={emblaRef}>
            <div className="flex h-full">
                {images.map((img, idx) => (
                    <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                        <Image
                            src={img.url}
                            alt={`Slide ${idx + 1}`}
                            fill
                            className="object-contain rounded-3xl"
                            priority={idx === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
