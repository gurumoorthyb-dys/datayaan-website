"use client";

import React from "react";
import {
  Building2,
  Heart,
  Truck,
  ShoppingBag,
  GraduationCap,
  Banknote,
  Factory,
  Plane,
  Briefcase,
  Cpu,
  Leaf,
  Shield,
} from "lucide-react";

interface Domain {
  name: string;
}

interface DomainsShowcaseProps {
  domains: Domain[];
}

const domainIcons: { [key: string]: any } = {
  Healthcare: Heart,
  Logistics: Truck,
  Retail: ShoppingBag,
  Education: GraduationCap,
  Finance: Banknote,
  Manufacturing: Factory,
  Travel: Plane,
  "Real Estate": Building2,
  Technology: Cpu,
  Insurance: Shield,
  Agriculture: Leaf,
  Consulting: Briefcase,
};

export default function DomainsShowcase({ domains }: DomainsShowcaseProps) {
  // Removed IntersectionObserver/Animation states completely as requested

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Static Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wide mb-3">
            Our Expertise
          </span>
          <h2 className="text-3xl font-bold text-slate-900">
            Industries We Serve
          </h2>
        </div>

        {/* Static Tech Grid - No Animations */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center">
          {domains.map((domain, idx) => {
            const Icon = domainIcons[domain.name] || Building2;
            const isOrange = idx % 2 === 0;

            return (
              <div
                key={idx}
                className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-3"
              >
                {/* Icon Side */}
                <div
                  className={`p-2.5 rounded-md ${
                    isOrange
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-200 mx-4" />

                {/* Content Side */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-800">
                    {domain.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
                    Sector
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
