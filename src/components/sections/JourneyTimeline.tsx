"use client";

import React, { useRef, useEffect, useState } from "react";
import { CheckCircle2, Flag } from "lucide-react";

interface JourneyMilestone {
  yearRange: string;
  title: string;
  points?: string;
}

interface JourneyTimelineProps {
  journey: JourneyMilestone[];
}

export default function JourneyTimeline({ journey }: JourneyTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setVisibleItems((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const items = sectionRef.current?.querySelectorAll(".timeline-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white overflow-hidden relative"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wide mb-3">
            Our Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Our Journey
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200 md:-translate-x-1/2 rounded-full opacity-60" />

          <div className="space-y-8">
            {journey.map((item, idx) => {
              const isEvent = idx % 2 === 0;
              const isVisible = visibleItems.has(idx);

              return (
                <div
                  key={idx}
                  data-index={idx}
                  className={`timeline-item relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                >
                  {/* Timeline Dot (Center) */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-orange-500 rounded-full md:-translate-x-1/2 z-10 shadow-md mt-1.5 md:mt-0" />

                  {/* Date Card (Alternating Side) */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEvent ? "md:pr-12 md:text-right" : "md:order-1 md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-1 rounded-lg font-bold text-lg mb-2 shadow-sm ${
                        isEvent
                          ? "bg-orange-600 text-white"
                          : "bg-white text-orange-600 border border-orange-200"
                      }`}
                    >
                      {item.yearRange}
                    </div>
                  </div>

                  {/* Content Card (Alternating Side - Opposite to Date) */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      !isEvent
                        ? "md:pr-12 md:text-right md:order-first"
                        : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300 relative group">
                      {/* Connecting Line (Mobile/Desktop dynamic) */}
                      <div
                        className={`absolute top-6 w-8 h-px bg-orange-300 ${
                          !isEvent
                            ? "right-full mr-0 hidden md:block"
                            : "left-[-32px] hidden md:block"
                        } ${isEvent ? "hidden" : ""}`}
                      />
                      <div
                        className={`absolute top-6 w-8 h-px bg-orange-300 ${
                          isEvent
                            ? "right-full mr-[-1px] hidden md:block"
                            : "hidden"
                        }`}
                      />

                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h3>

                      {item.points && (
                        <ul
                          className={`space-y-2 ${
                            !isEvent && "md:flex md:flex-col md:items-end"
                          }`}
                        >
                          {item.points
                            .split("\n")
                            .filter((p) => p.trim())
                            .map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed"
                              >
                                <div
                                  className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 ${
                                    !isEvent ? "md:order-1 md:ml-2 md:mr-0" : ""
                                  }`}
                                />
                                <span
                                  className={!isEvent ? "md:text-right" : ""}
                                >
                                  {point.replace(/^[-*]\s+/, "")}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
