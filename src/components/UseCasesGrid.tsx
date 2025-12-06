"use client";

import { Check } from "lucide-react";
import Image from "next/image";

interface UseCase {
    title: string;
    description: string;
    imageUrl?: string;
}

interface UseCasesGridProps {
    useCases: UseCase[];
}

export default function UseCasesGrid({ useCases }: UseCasesGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
                <div
                    key={index}
                    className="group relative bg-white rounded-xl border border-neutral-200 hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-xl"
                >
                    {/* Icon/Image Header */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                        {useCase.imageUrl ? (
                            <Image
                                src={useCase.imageUrl}
                                alt={useCase.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <Check className="w-8 h-8 text-primary" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                            {useCase.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed text-sm">
                            {useCase.description}
                        </p>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl pointer-events-none transition-all duration-300" />
                </div>
            ))}
        </div>
    );
}
