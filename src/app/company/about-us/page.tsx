import React from "react";
import { fetchStrapiISR } from "@/lib/strapi";
import {
  Globe2,
  Users,
  Target,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Award,
  Heart,
  Truck,
  ShoppingBag,
  GraduationCap,
  Banknote,
  Factory,
  Plane,
  Building2,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import DomainsShowcase from "@/components/sections/DomainsShowcase";
import GlobalPresenceMap from "@/components/sections/GlobalPresenceMap";
import ValuesShowcase from "@/components/sections/ValuesShowcase";

// Icon components for different sections
const iconMap = [
  { icon: Target, gradient: "from-orange-500 to-red-500" },
  { icon: Lightbulb, gradient: "from-amber-500 to-orange-500" },
  { icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { icon: Sparkles, gradient: "from-purple-500 to-pink-500" },
  { icon: TrendingUp, gradient: "from-green-500 to-emerald-500" },
  { icon: Shield, gradient: "from-indigo-500 to-blue-500" },
];

const whyIcons = [
  { icon: Zap, color: "text-orange-500" },
  { icon: Award, color: "text-blue-500" },
  { icon: Shield, color: "text-green-500" },
  { icon: TrendingUp, color: "text-purple-500" },
];

// Domain icons mapping for visual enhancement
const domainIcons: { [key: string]: any } = {
  Healthcare: Heart,
  Logistics: Truck,
  Retail: ShoppingBag,
  Education: GraduationCap,
  Finance: Banknote,
  Manufacturing: Factory,
  Travel: Plane,
  "Real Estate": Building2,
};

// Color schemes for domain cards
const domainColors = [
  {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "text-orange-500",
    accent: "bg-orange-500",
  },
  {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-500",
    accent: "bg-blue-500",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-500",
    accent: "bg-emerald-500",
  },
  {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-500",
    accent: "bg-purple-500",
  },
  {
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: "text-rose-500",
    accent: "bg-rose-500",
  },
  {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    icon: "text-cyan-500",
    accent: "bg-cyan-500",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-500",
    accent: "bg-amber-500",
  },
  {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: "text-indigo-500",
    accent: "bg-indigo-500",
  },
];

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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Hero Section */}
      <PageHero
        title={title || "About Datayaan"}
        subtitle={description}
        backButtonPath="/"
        backButtonLabel="Back"
        backgroundImage="/about-hero.png"
      />

      {/* What We Do - Enhanced Cards */}
      <section className="py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold tracking-wide mb-4">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              What We Do
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              Empowering businesses with innovative technology solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatWeDo.map((item: any, idx: number) => {
              const { icon: Icon, gradient } = iconMap[idx % iconMap.length];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100"
                >
                  {/* Icon with gradient background */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-orange-500 font-semibold mb-4 tracking-wide uppercase">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative line */}
                  <div className="mt-6 h-1 w-16 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Domains We Serve - Compact Animated Section */}
      <DomainsShowcase domains={domains} />

      {/* Our Journey - Scroll Animated Timeline */}
      <JourneyTimeline journey={journey} />

      {/* Vision, Mission & Values - Animated Section */}
      <ValuesShowcase mission={mission} vision={vision} values={values} />

      {/* Why Datayaan - Feature Cards */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded-full text-sm font-semibold tracking-wide mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Why Datayaan
            </h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
              What sets us apart in delivering excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyDatayaan.map((item: any, idx: number) => {
              const { icon: Icon, color } = whyIcons[idx % whyIcons.length];
              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white to-slate-50 p-7 rounded-3xl shadow-md border border-slate-100"
                >
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-bold text-slate-200">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Presence - Interactive Map */}
      <GlobalPresenceMap globalPresence={globalPresence} />
    </div>
  );
}
