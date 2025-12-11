"use client";

import Image from "next/image";
import { CheckCircle2, Zap } from "lucide-react";
import { processRichText } from "@/lib/richtext";

export interface Service {
  id: number;
  title: string;
  description?: string;
  icon?: { url: string };
  order: number;
  whatWeDeliver?: string;
  howItHelps?: string;
}

const serviceImages = [
  "/service-1.jpg",
  "/service-2.jpg",
  "/service-3.jpg",
  "/service-4.jpg",
  "/service-5.jpg",
];

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const serviceImage = serviceImages[index % serviceImages.length];
  const isEven = index % 2 === 0;

  return (
    <div className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 mb-6 transition-all duration-500">
      <div
        className={`flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 lg:gap-10 items-center`}
      >
        {/* Image */}
        <div className="w-full lg:w-5/12 flex-shrink-0 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300">
          <Image
            src={serviceImage}
            alt={service.title}
            width={500}
            height={375}
            className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Text */}
        <div className="flex-1 lg:w-7/12 space-y-4">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
            {service.title}
          </h3>
          {service.description && (
            <p className="text-slate-600 text-base leading-relaxed pl-4 border-l-4 border-orange-200">
              {service.description.trim()}
            </p>
          )}
          {/* Detail cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {service.whatWeDeliver && (
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 hover:bg-white hover:border-orange-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-colors shadow-sm">
                    <CheckCircle2 size={20} strokeWidth={2.5} />
                  </span>
                  <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">
                    Capabilities
                  </h4>
                </div>
                <div
                  className="prose prose-sm prose-slate max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: processRichText(service.whatWeDeliver),
                  }}
                />
              </div>
            )}
            {service.howItHelps && (
              <div className="bg-blue-50/30 rounded-2xl p-5 border border-blue-100/50 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white transition-colors shadow-sm">
                    <Zap size={20} fill="currentColor" />
                  </span>
                  <h4 className="font-bold text-slate-900 uppercase text-sm tracking-wide">
                    Business Impact
                  </h4>
                </div>
                <div
                  className="prose prose-sm prose-slate max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: processRichText(service.howItHelps),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
