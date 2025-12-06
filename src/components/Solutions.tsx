"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSolutions } from "@/lib/strapi";
import {
  Truck,
  Ticket,
  Stethoscope,
  Landmark,
  HardHat,
  Briefcase,
  Box,
  Globe,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Truck,
  Ticket,
  Stethoscope,
  Landmark,
  HardHat,
  Briefcase,
  Box,
  Globe,
  Cpu,
  ShieldCheck,
};

interface Solution {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  iconName: string;
}

export const Solutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSolutions() {
      try {
        const data = await getSolutions();
        // Fallback data if Strapi is empty (for demonstration/dev purposes)
        if (!data || data.length === 0) {
          setSolutions([
            {
              id: 1,
              documentId: "1",
              title: "Transport & Logistics",
              slug: "transport-logistics",
              shortDescription:
                "Optimizing supply chains with AI-driven tracking and real-time visibility.",
              iconName: "Truck",
            },
            {
              id: 2,
              documentId: "2",
              title: "Travel & Ticketing",
              slug: "travel-ticketing",
              shortDescription:
                "Seamless booking experiences for modern travelers.",
              iconName: "Ticket",
            },
            {
              id: 3,
              documentId: "3",
              title: "Healthcare",
              slug: "healthcare",
              shortDescription:
                "Advanced digital solutions for patient care and management.",
              iconName: "Stethoscope",
            },
            {
              id: 4,
              documentId: "4",
              title: "BFSI",
              slug: "bfsi",
              shortDescription:
                "Secure and scalable financial technologies for modern banking.",
              iconName: "Landmark",
            },
            {
              id: 5,
              documentId: "5",
              title: "Construction",
              slug: "construction",
              shortDescription:
                "Smart management for complex infrastructure projects.",
              iconName: "HardHat",
            },
          ]);
        } else {
          setSolutions(data);
        }
      } catch (error) {
        console.error("Failed to load solutions", error);
        // Use fallback on error
        setSolutions([
          {
            id: 1,
            documentId: "1",
            title: "Transport & Logistics",
            slug: "transport-logistics",
            shortDescription:
              "Optimizing supply chains with AI-driven tracking.",
            iconName: "Truck",
          },
          {
            id: 2,
            documentId: "2",
            title: "Travel & Ticketing",
            slug: "travel-ticketing",
            shortDescription: "Seamless booking experiences for travelers.",
            iconName: "Ticket",
          },
          {
            id: 3,
            documentId: "3",
            title: "Healthcare",
            slug: "healthcare",
            shortDescription: "Advanced digital solutions for patient care.",
            iconName: "Stethoscope",
          },
          {
            id: 4,
            documentId: "4",
            title: "BFSI",
            slug: "bfsi",
            shortDescription: "Secure and scalable financial technologies.",
            iconName: "Landmark",
          },
          {
            id: 5,
            documentId: "5",
            title: "Construction",
            slug: "construction",
            shortDescription: "Smart management for infrastructure.",
            iconName: "HardHat",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadSolutions();
  }, []);

  if (loading) {
    return (
      <div className="py-32 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-50 rounded-full">
          <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-primary font-medium">Loading Solutions...</span>
        </div>
      </div>
    );
  }

  return (
    <section
      id="solutions"
      className="relative py-32 overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Solutions
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 tracking-tight leading-tight">
            Industry-Specific{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">
              Solutions
            </span>
          </h2>

          <p className="text-xl text-neutral-600 leading-relaxed">
            Innovative, tailored solutions designed to transform your business
            and drive measurable results across diverse industries.
          </p>
        </div>

        {/* Anti-Gravity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = iconMap[solution.iconName] || Box;
            return (
              <Link
                href={`/solutions/${solution.slug}`}
                key={solution.documentId || solution.id}
                className="group relative block"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Container with Anti-Gravity Effect */}
                <div className="relative h-full p-8 bg-white backdrop-blur-xl border border-neutral-200 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_24px_48px_-12px_rgba(249,115,22,0.25)] overflow-hidden group-hover:border-primary/30">
                  {/* Glossy Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Accent */}
                  <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Box with Gradient */}
                    <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 text-primary group-hover:from-primary group-hover:to-orange-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20 w-fit">
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                      {solution.title}
                    </h3>

                    <p className="text-neutral-600 text-base leading-relaxed mb-8 flex-grow">
                      {solution.shortDescription}
                    </p>

                    {/* Learn More Link with Arrow */}
                    <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300">
                      <span>Explore Solution</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-neutral-600 mb-6">
            Don't see your industry? We create custom solutions for unique
            challenges.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            <span>Discuss Your Needs</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
