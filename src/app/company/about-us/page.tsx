import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchStrapiISR } from "@/lib/strapi";
import {
    CheckCircle2,
    Globe2,
    Target,
    Lightbulb,
    Users,
    ArrowRight,
} from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import PageHero from "@/components/ui/PageHero";

// Helper to render rich text (assuming simple markdown-like or text)
const RichTextRenderer = ({
    content,
    className,
}: {
    content: string;
    className?: string;
}) => {
    if (!content) return null;
    // Simple split by newline for paragraphs
    const paragraphs = content.split("\n").filter((p) => p.trim());
    return (
        <Suspense>
            <div className={`space-y-4 ${className}`}>
                {paragraphs.map((p, idx) => (
                    <p key={idx} className="text-text-secondary leading-relaxed">
                        {p.replace(/^[-*]\s+/, "")}{" "}
                        {/* Remove bullet points if present for clean text */}
                    </p>
                ))}
            </div>
        </Suspense>
    );
};

// Helper for bullet lists
const BulletListRenderer = ({ content }: { content: string }) => {
    if (!content) return null;
    const items = content.split("\n").filter((p) => p.trim());
    return (
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span className="text-text-secondary">
                        {item.replace(/^[-*]\s+/, "")}
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default async function AboutUsPage() {
    const [aboutData, whatWeDoData, domainsData, journeyData, whyData] =
        await Promise.all([
            fetchStrapiISR("/about-page", 1800),
            fetchStrapiISR("/what-we-dos?sort=order:asc", 1800),
            fetchStrapiISR("/domains?sort=name:asc", 600),
            fetchStrapiISR("/journey-milestones?sort=order:asc", 1800),
            fetchStrapiISR("/why-datayaans?sort=order:asc", 1800),
        ]);

    const { title, description, mission, vision, values, globalPresence } =
        aboutData || {};
    const whatWeDo = Array.isArray(whatWeDoData) ? whatWeDoData : [];
    const domains = Array.isArray(domainsData) ? domainsData : [];
    const journey = Array.isArray(journeyData) ? journeyData : [];
    const whyDatayaan = Array.isArray(whyData) ? whyData : [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            {/* <section className="relative bg-neutral-dark py-20 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8">
                        {title || "About Datayaan"}
                    </h1>
                    <div className="max-w-3xl mx-auto text-lg sm:text-xl text-neutral-300 leading-relaxed">
                        <RichTextRenderer content={description} />
                    </div>
                </div>
            </section> */}

            <PageHero title={title} subtitle={description} backButtonPath='/' backButtonLabel='Back' backgroundImage="/about-hero.png" />

            {/* What We Do */}
            <section className="py-20 bg-neutral-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-dark sm:text-4xl">
                            What We Do
                        </h2>
                        <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whatWeDo.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                                    {idx === 0 ? (
                                        <Target className="w-6 h-6" />
                                    ) : idx === 1 ? (
                                        <Lightbulb className="w-6 h-6" />
                                    ) : (
                                        <Users className="w-6 h-6" />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-neutral-dark mb-2">
                                    {item.title}
                                </h3>
                                {item.subtitle && (
                                    <p className="text-sm text-primary font-medium mb-4">
                                        {item.subtitle}
                                    </p>
                                )}
                                <p className="text-text-secondary leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Domains We Serve */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-dark sm:text-4xl">
                            Domains We Serve
                        </h2>
                        <p className="mt-4 text-text-secondary">
                            We support organisations across a wide range of industries
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {domains.map((domain: any, idx: number) => (
                            <div
                                key={idx}
                                className="px-6 py-3 bg-neutral-light rounded-full text-neutral-dark font-medium border border-neutral-200 hover:border-primary hover:text-primary transition-colors cursor-default"
                            >
                                {domain.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey */}
            <section className="py-20 bg-neutral-dark text-white overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold sm:text-4xl">Our Journey</h2>
                    </div>
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-700 hidden md:block" />

                        <div className="space-y-12">
                            {journey.map((milestone: any, idx: number) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    <div className="flex-1 w-full md:w-auto text-center md:text-left">
                                        <div
                                            className={`bg-neutral-800 p-8 rounded-2xl border border-neutral-700 hover:border-primary transition-colors duration-300 ${idx % 2 === 0 ? "md:text-left" : "md:text-right"
                                                }`}
                                        >
                                            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-bold text-sm mb-4">
                                                {milestone.yearRange}
                                            </span>
                                            <h3 className="text-2xl font-bold mb-4">
                                                {milestone.title}
                                            </h3>
                                            <div
                                                className={`text-neutral-400 space-y-2 ${idx % 2 === 0 ? "" : "flex flex-col items-end"
                                                    }`}
                                            >
                                                {/* Custom renderer for journey points to handle alignment */}
                                                {milestone.points &&
                                                    milestone.points
                                                        .split("\n")
                                                        .filter((p: string) => p.trim())
                                                        .map((p: string, i: number) => (
                                                            <p key={i} className="flex items-center gap-2">
                                                                {idx % 2 !== 0 && (
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 md:order-last md:ml-2 md:mr-0" />
                                                                )}
                                                                {idx % 2 === 0 && (
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mr-2" />
                                                                )}
                                                                {p.replace(/^[-*]\s+/, "")}
                                                            </p>
                                                        ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 bg-primary rounded-full relative z-10 hidden md:block ring-4 ring-neutral-900" />
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision, Mission & Values */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Vision & Mission */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-dark mb-4 flex items-center gap-3">
                                    <Target className="w-6 h-6 text-primary" /> Mission
                                </h3>
                                <p className="text-lg text-text-secondary leading-relaxed bg-neutral-light p-6 rounded-2xl border-l-4 border-primary">
                                    {mission}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-neutral-dark mb-4 flex items-center gap-3">
                                    <Lightbulb className="w-6 h-6 text-secondary" /> Vision
                                </h3>
                                <p className="text-lg text-text-secondary leading-relaxed bg-neutral-light p-6 rounded-2xl border-l-4 border-secondary">
                                    {vision}
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-dark mb-8">
                                Our Values
                            </h3>
                            <div className="bg-neutral-light rounded-3xl p-8 sm:p-10">
                                <BulletListRenderer content={values} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Datayaan */}
            <section className="py-20 bg-neutral-light">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-neutral-dark sm:text-4xl">
                            Why Datayaan
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyDatayaan.map((item: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-lg font-bold text-neutral-dark mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-neutral-dark sm:text-4xl mb-12 flex items-center justify-center gap-3">
                        <Globe2 className="w-8 h-8 text-primary" /> Global Presence
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        {/* Simple grid for regions */}
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
                            {globalPresence &&
                                globalPresence
                                    .split("\n")
                                    .filter((p: string) => p.trim())
                                    .map((region: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center gap-3 group"
                                        >
                                            <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                                            <span className="text-lg font-medium text-neutral-dark">
                                                {region.replace(/^[-*]\s+/, "")}
                                            </span>
                                        </div>
                                    ))}
                        </div>
                        <p className="mt-12 text-text-secondary italic">
                            Our expanding global footprint reflects our commitment to
                            delivering excellence worldwide.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
