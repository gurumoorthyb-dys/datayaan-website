"use client";

import React, { useRef, useState, useEffect } from "react";
import { Target, Lightbulb, Sparkles, CheckCircle2 } from "lucide-react";

interface ValuesShowcaseProps {
  mission: string;
  vision: string;
  values: string;
}

export default function ValuesShowcase({
  mission,
  vision,
  values,
}: ValuesShowcaseProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add items one by one as they scroll into view
            const id = Number(entry.target.getAttribute("data-id"));
            if (!isNaN(id)) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll(".reveal-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Mission - Left Aligned */}
        <div
          data-id="1"
          className="reveal-item flex flex-col md:flex-row items-center gap-12 group"
        >
          {/* Visual Side */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-end transition-all duration-1000 ${
              visibleItems.has(1)
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-orange-100 rounded-[3rem] rotate-6 transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl border border-orange-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-[100px]" />
                <Target className="w-32 h-32 text-orange-500 relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 delay-200 ${
              visibleItems.has(1)
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-bold mb-4 tracking-wide">
              OUR PURPOSE
            </span>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              {mission}
            </p>
          </div>
        </div>

        {/* Vision - Right Aligned (Zigzag) */}
        <div
          data-id="2"
          className="reveal-item flex flex-col md:flex-row-reverse items-center gap-12 group"
        >
          {/* Visual Side */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-start transition-all duration-1000 ${
              visibleItems.has(2)
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-blue-100 rounded-[3rem] -rotate-6 transition-transform duration-500 group-hover:-rotate-12" />
              <div className="absolute inset-0 bg-white rounded-[3rem] shadow-xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-tr-[100px]" />
                <Lightbulb className="w-32 h-32 text-blue-500 relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`w-full md:w-1/2 text-left md:text-right flex flex-col items-start md:items-end transition-all duration-1000 delay-200 ${
              visibleItems.has(2)
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-4 tracking-wide">
              FUTURE GOAL
            </span>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">
              Our Vision
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              {vision}
            </p>
          </div>
        </div>

        {/* Values - Center/Wide */}
        <div data-id="3" className="reveal-item">
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              visibleItems.has(3)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm font-bold mb-4 tracking-wide">
              CORE PRINCIPLES
            </span>
            <h3 className="text-4xl font-bold text-slate-900">
              Our Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values &&
              values
                .split("\n")
                .filter((v) => v.trim())
                .map((val, idx) => (
                  <div
                    key={idx}
                    className={`bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 group border border-slate-100 ${
                      visibleItems.has(3)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${200 + idx * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="w-5 h-5 text-pink-500" />
                    </div>
                    <p className="text-lg font-semibold text-slate-800 group-hover:text-slate-900">
                      {val.replace(/^[-*]\s+/, "")}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
