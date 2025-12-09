'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
    className?: string;
    defaultPath?: string;
    defaultLabel?: string;
    showLabel?: boolean;
    variant?: 'default' | 'circular';
}

/**
 * Smart BackButton component that uses query parameters to navigate back to the correct page.
 * Always displays "Back" as the label for simplicity.
 * 
 * Usage:
 * 1. Add this component to any detail page
 * 2. When linking TO that page, add query parameters:
 *    - `from`: The type of page (e.g., 'products', 'case-studies', 'blog', etc.)
 *    - `returnPath`: The full path to return to (e.g., '/products/my-product')
 * 
 * Example:
 * ```tsx
 * // Link from a listing page to detail page
 * <Link href={`/products/${slug}?from=products`}>
 * 
 * // Link from a specific page to another
 * <Link href={`/case-studies/${slug}?from=product&returnPath=/products/${productSlug}`}>
 * ```
 */
export default function BackButton({
    className = "inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary transition-colors",
    defaultPath = "/",
    defaultLabel = "Back",
    showLabel = true,
    variant = 'default'
}: BackButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Apply circular styling if variant is circular
    // Using gray color to match the hero section background
    const circularClassName = variant === 'circular'
        ? "inline-flex items-center justify-center p-2 rounded-full text-neutral-700 transition-all hover:scale-105 shadow-lg border border-white/30"
        : className;

    const circularStyle = variant === 'circular'
        ? { backgroundColor: 'rgb(229 231 235)' }
        : undefined;

    const shouldShowLabel = variant === 'circular' ? false : showLabel;

    // Get navigation context from query parameters
    const from = searchParams.get('from');
    const returnPath = searchParams.get('returnPath');

    // Legacy support for specific slug parameters
    const productSlug = searchParams.get('productSlug');
    const caseStudySlug = searchParams.get('caseStudySlug');

    let backPath: string | null = null;

    // Priority 1: Use explicit returnPath if provided (most flexible)
    if (returnPath) {
        backPath = returnPath;
    }
    // Priority 2: Handle legacy specific slug parameters
    else if (from === 'product' && productSlug) {
        backPath = `/products/${productSlug}`;
    } else if (from === 'case-study' && caseStudySlug) {
        backPath = `/case-studies/${caseStudySlug}`;
    }
    // Priority 3: Handle common listing pages by convention
    else if (from) {
        // Convert 'from' to a path
        const fromLower = from.toLowerCase();

        // Common patterns
        const pathMap: Record<string, string> = {
            'products': '/products',
            'case-studies': '/case-studies',
            'blog': '/blog',
            'services': '/services',
            'home': '/',
        };

        if (pathMap[fromLower]) {
            backPath = pathMap[fromLower];
        } else {
            // Generic fallback: assume the 'from' value is a path segment
            backPath = `/${fromLower}`;
        }
    }

    // If we have a specific path, use Link for better performance
    if (backPath) {
        return (
            <Link href={backPath} className={circularClassName} style={circularStyle}>
                <ArrowLeft className="w-4 h-4" />
                {shouldShowLabel && defaultLabel}
            </Link>
        );
    }

    // Use defaultPath instead of router.back() to prevent loops
    return (
        <button
            onClick={() => router.back()}
            className={circularClassName}
            style={circularStyle}
        >
            <ArrowLeft className="w-5 h-5" />
            {shouldShowLabel && defaultLabel}
        </button>
    );
}
