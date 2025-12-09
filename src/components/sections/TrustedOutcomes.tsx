"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { Globe, Users, Clock, Award } from "lucide-react";

interface TrustedOutcomesProps {
    projectsCount?: string;
    employeesCount?: string;
    countriesCount?: string;
    supportText?: string;
    themeColor?: string;
    headingFont?: string;
}

// Counter Component for Animated Numbers
const Counter = ({ value }: { value: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Check if the value is purely numeric (with optional suffix like +)
    // If it contains things like 'x' or ':', treat as static text
    const isCountable = /^\d+[+]?$/.test(value);

    // Parse numeric part and suffix
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 15,
        duration: 2
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView && isCountable) {
            springValue.set(numericValue);
        }
    }, [isInView, numericValue, springValue, isCountable]);

    useEffect(() => {
        if (isCountable) {
            return springValue.on("change", (latest) => {
                setDisplayValue(Math.floor(latest));
            });
        }
    }, [springValue, isCountable]);

    if (!isCountable) {
        return <span className="tabular-nums">{value}</span>;
    }

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue}{suffix}
        </span>
    );
};

export const TrustedOutcomes = ({
    projectsCount = "150+",
    employeesCount = "150",
    countriesCount = "10+",
    supportText = "24x7",
    themeColor = "#FA7C1E", // Default brand orange
    headingFont
}: TrustedOutcomesProps) => {

    const stats = [
        {
            value: projectsCount,
            label: "Projects Delivered with Precision and Excellence",
            icon: Award
        },
        {
            value: countriesCount,
            label: "Countries and Territories Trust Our Solutions",
            icon: Globe
        },
        {
            value: employeesCount,
            label: "Skilled Professionals Driving Innovation",
            icon: Users
        },
        {
            value: supportText,
            label: "Support Always Available to Help You Succeed",
            icon: Clock
        },
    ];

    return (
        // Matches Hero Gradient exactly: from-white via-slate-50 to-slate-100
        <section className="w-full py-2 relative overflow-hidden ">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">

                {/* Heading */}
                <h2
                    className="text-center text-2xl sm:text-3xl font-semibold text-neutral-900 mb-14"
                    style={{ fontFamily: headingFont }}
                >
                    Global Trust. Proven Delivery. Consistent Excellence.
                </h2>

                {/* Stats Grid - Open Layout (No Cards, No Dividers) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="flex flex-col items-center"
                        >
                            {/* Icon */}
                            <div
                                className="mb-6 p-4 rounded-full bg-opacity-10"
                                style={{ backgroundColor: `${themeColor || "#FA7C1E"}15`, color: themeColor || "#ff8800" }}
                            >
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>

                            {/* Number with Counter Animation */}
                            <div
                                className="text-5xl lg:text-4xl font-bold mb-4 tracking-tight"
                                style={{ color: themeColor || "#FA7C1E", fontFamily: headingFont }}
                            >
                                <Counter value={item.value} />
                            </div>

                            {/* Label */}
                            <p className="text-sm md:text-base text-slate-500 font-medium max-w-[200px] leading-relaxed mx-auto">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
