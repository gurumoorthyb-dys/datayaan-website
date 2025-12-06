"use client";

import React from "react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

export const Services = ({ items }: { items: ServiceItem[] }) => {
  if (!items || items.length === 0) return null;

  return (
    <section id="services" className="py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-neutral-900 mb-12 text-center">
          Our Services
        </h2>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 -translate-x-1/2 hidden md:block"></div>

          {/* Reduced spacing between items */}
          <div className="space-y-2">
            {items.map((service, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`relative grid md:grid-cols-2 gap-10 items-center`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-1/2 md:block hidden w-4 h-4 bg-white border-2 border-primary rounded-full -translate-x-1/2"
                    style={{ top: "50%" }}
                  ></div>

                  {/* Text */}
                  <div
                    className={`${
                      isLeft
                        ? "md:pr-12 text-right"
                        : "md:pl-12 text-left md:order-2"
                    }`}
                  >
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 text-base leading-relaxed text-justify">
                      {service.description}
                    </p>
                  </div>

                  {/* Spacer column */}
                  <div
                    className={`${isLeft ? "md:order-2" : "md:order-1"}`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
