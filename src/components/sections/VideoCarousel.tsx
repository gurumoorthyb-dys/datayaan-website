'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
    id: number;
    url: string;
    title?: string;
}

interface VideoCarouselProps {
    videos?: Video[];
}

export const VideoCarousel = ({ videos }: VideoCarouselProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (!videos || videos.length === 0) {
        return null;
    }

    const getEmbedUrl = (url: string) => {
        try {
            // Handle standard YouTube URLs
            let videoId = '';
            if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('youtube.com/embed/')) {
                return url; // Already an embed URL
            }

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
            return url; // Fallback
        } catch (e) {
            return url;
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Videos</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-6">
                        {videos.map((video, index) => (
                            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100">
                                    <div className="relative pt-[56.25%] bg-black">
                                        <iframe
                                            src={getEmbedUrl(video.url)}
                                            title={video.title || `Video ${index + 1}`}
                                            className="absolute top-0 left-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    {video.title && (
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2">
                                                {video.title}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
