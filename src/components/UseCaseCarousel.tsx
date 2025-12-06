"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import FlipCard from "@/components/util/FlipCard";
import { processRichText } from "@/lib/richtext";

export default function UseCaseCarousel({ useCases }: any) {
    const [swiperRef, setSwiperRef] = useState<any>(null);

    return (
        <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => setSwiperRef(swiper)}
            spaceBetween={30}
            pagination={{ clickable: true }}
            loop={true}
            speed={900}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="pb-16"
        >
            {useCases.map((useCase: any, idx: number) => (
                <SwiperSlide key={idx} style={{ height: "260px" }}>
                    <div
                        className="h-full"
                        onMouseEnter={() => swiperRef?.autoplay?.stop()}
                        onMouseLeave={() => swiperRef?.autoplay?.start()}
                    >
                        <FlipCard
                            front={
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200 h-full flex flex-col items-center justify-center text-center gap-3">

                                    {/* IMAGE */}
                                    <div className="w-20 h-20 flex items-center justify-center rounded-md overflow-hidden bg-neutral-100">
                                        {useCase.imageUrl ? (
                                            <Image
                                                src={useCase.imageUrl}
                                                alt={useCase.title}
                                                width={80}
                                                height={80}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <span className="text-neutral-400 text-xs">No image</span>
                                        )}
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-base font-semibold text-neutral-900 leading-tight">
                                        {useCase.title}
                                    </h3>

                                </div>
                            }

                            back={
                                <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200 h-full flex flex-col items-center justify-start text-justify overflow-hidden">

                                    <h3 className="text-base font-semibold text-neutral-900 mb-2 leading-tight">
                                        {useCase.title}
                                    </h3>

                                    <div
                                        className="rich-text-content text-neutral-700 text-sm leading-relaxed px-1 overflow-y-auto max-h-[160px]"
                                        dangerouslySetInnerHTML={{ __html: processRichText(useCase.description) }}
                                    />

                                </div>
                            }
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
