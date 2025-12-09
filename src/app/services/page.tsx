import { fetchStrapiData, STRAPI_URL } from "@/lib/strapi";
import PageHero from "@/components/ui/PageHero";
import { Metadata } from "next";
import Image from "next/image";
import CTASection from "@/components/ui/CTASection";
import { processRichText } from "@/lib/richtext";
import { isLocalHost } from "@/lib/commonFunction";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Our Services | Datayaan",
    description:
        "Empowering your business with cutting-edge technology solutions and expert development services",
};

interface Service {
    id: number;
    title: string;
    description?: string;
    icon?: {
        url: string;
    };
    order: number;
    whatWeDeliver?: string;
    howItHelps?: string;
}

interface ServiceCategory {
    id: number;
    name: string;
    description?: string;
    icon?: {
        url: string;
    };
    color?: string;
    order: number;
    services: Service[];
}

export default async function ServicesPage() {
    const [servicesData, servicePageData] = await Promise.all([
        fetchStrapiData("/services?populate=*&sort[0]=order:asc"),
        fetchStrapiData("/service-page"),
    ]);

    const services: Service[] = Array.isArray(servicesData) ? servicesData : [];

    return (
        <Suspense>
            <div className="min-h-screen">
                <PageHero
                    title="Our Services"
                    subtitle="Empowering your business with cutting-edge technology solutions and expert development services"
                    backButtonPath="/"
                    backButtonLabel="Back"
                    backgroundImage="/services-hero.png"
                />

                {services.length === 0 ? (
                    <div className="text-center py-16 px-4">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            No Services Yet
                        </h2>
                        <p className="text-neutral-600">
                            Services will appear here once they are added in the CMS.
                        </p>
                    </div>
                ) : (
                    <div className="py-16 bg-neutral-50">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="space-y-12">
                                {services.map((service, index) => (
                                    <div
                                        key={service.id}
                                        className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-lg transition-all duration-300"
                                    >
                                        {/* Service Header */}
                                        <div className="flex items-start gap-5 mb-8">
                                            {service.icon?.url ? (
                                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center">
                                                    <Image
                                                        src={
                                                            isLocalHost
                                                                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${service.icon.url}`
                                                                : `${service.icon.url}`
                                                        }
                                                        alt={service.title}
                                                        width={32}
                                                        height={32}
                                                        className="w-17 h-17"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-xl font-bold text-primary">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                                    {service.title}
                                                </h3>
                                                {service.description && (
                                                    <p className="text-lg text-neutral-600 leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Detailed Sections */}
                                        <div className="grid md:grid-cols-2 gap-8">
                                            {/* What We Deliver */}
                                            {service.whatWeDeliver && (
                                                <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                                                    <h4 className="text-base font-bold text-neutral-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                        What We Deliver
                                                    </h4>
                                                    <div
                                                        className="prose prose-sm prose-neutral max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: processRichText(service.whatWeDeliver),
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* How It Helps */}
                                            {service.howItHelps && (
                                                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100/50">
                                                    <h4 className="text-base font-bold text-neutral-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                        How It Helps
                                                    </h4>
                                                    <div
                                                        className="prose prose-sm prose-neutral max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: processRichText(service.howItHelps),
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <CTASection
                    title={servicePageData?.ctaTitle || "Let's Build Something Great"}
                    description={
                        servicePageData?.ctaDescription ||
                        "Ready to transform your business with our expertise?"
                    }
                    buttonText={servicePageData?.ctaButtonText || "Get in Touch"}
                    buttonLink={`${servicePageData?.ctaButtonLink || "/request-services"
                        }?from=services&returnPath=/services`}
                />
            </div>
        </Suspense >
    );
}
