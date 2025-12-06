"use client";

import React from "react";
import { motion } from "framer-motion";

interface TrustedOutcomesProps {
    projectsCount?: string;
    employeesCount?: string;
    countriesCount?: string;
}

export const TrustedOutcomes = ({
    projectsCount = "150+",
    employeesCount = "150",
    countriesCount = "10+",
}: TrustedOutcomesProps) => {
    const stats = [
        { value: projectsCount, label: "projects delivered with precision and excellence" },
        { value: countriesCount, label: "countries and territories trust our solutions" },
        { value: employeesCount, label: "skilled professionals driving innovation every day" },
        { value: "24×7", label: "support always available to help you succeed" },
    ];

    return (
        <section className="w-full py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Heading */}
                <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
                    Global trust. Proven delivery. Consistent excellence.
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                    {stats.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            {/* Consistent VALUE styling */}
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                {item.value}
                            </div>

                            {/* Consistent LABEL styling */}
                            <p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-[200px]">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
