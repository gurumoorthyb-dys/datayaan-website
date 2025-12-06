"use client";

import { useSearchParams } from "next/navigation";
import CTASection from "@/components/ui/CTASection";

interface SmartCTASectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    currentPath: string;
}

/**
 * Client-side wrapper for CTASection that preserves navigation context.
 * Reads returnPath from query parameters and passes it along to the CTA button link.
 */
export default function SmartCTASection({
    title,
    description,
    buttonText,
    buttonLink,
    currentPath,
}: SmartCTASectionProps) {
    const searchParams = useSearchParams();
    const returnPath = searchParams.get("returnPath");
    const from = searchParams.get("from");

    // Construct the smart link that preserves the navigation chain
    let smartLink = buttonLink;

    // If we have a returnPath, use it; otherwise use currentPath
    const finalReturnPath = returnPath || currentPath;
    const finalFrom = from || "page";

    // Add query parameters to preserve navigation context
    const separator = smartLink.includes("?") ? "&" : "?";
    smartLink = `${smartLink}${separator}from=${finalFrom}&returnPath=${encodeURIComponent(finalReturnPath)}`;

    return (
        <CTASection
            title={title}
            description={description}
            buttonText={buttonText}
            buttonLink={smartLink}
        />
    );
}
