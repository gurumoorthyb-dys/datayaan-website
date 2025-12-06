"use client";

import dynamic from "next/dynamic";

const UseCaseCarousel = dynamic(() => import("@/components/UseCaseCarousel"), {
    ssr: false,
});

export default function UseCaseCarouselWrapper({ useCases }: any) {
    return <UseCaseCarousel useCases={useCases} />;
}
