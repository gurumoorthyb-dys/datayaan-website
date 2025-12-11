// Services Page - Refined Layout
import { fetchStrapiData } from "@/lib/strapi";
import PageHero from "@/components/ui/PageHero";
import { Metadata } from "next";
import CTASection from "@/components/ui/CTASection";
import { Suspense } from "react";
import { Zap } from "lucide-react";
import ServiceCard, { Service } from "@/components/services/ServiceCard";

export const metadata: Metadata = {
  title: "Our Services | Datayaan",
  description:
    "Empowering your business with cutting-edge technology solutions and expert development services",
};

export default async function ServicesPage() {
  const [servicesData, servicePageData] = await Promise.all([
    fetchStrapiData("/services?populate=*\u0026sort[0]=order:asc"),
    fetchStrapiData("/service-page"),
  ]);

  const services: Service[] = Array.isArray(servicesData) ? servicesData : [];

  return (
    <Suspense>
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white relative">
        <PageHero
          title="Our Services"
          subtitle="Empowering your business with cutting-edge technology solutions and expert development services"
          backButtonPath="/"
          backButtonLabel="Back"
          backgroundImage="/services-hero.png"
        />
        {services.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
              <Zap className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              No Services Found
            </h2>
            <p className="text-neutral-500">
              We are currently updating our service offerings. Please check back
              soon.
            </p>
          </div>
        ) : (
          <section className="py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
              <div className="space-y-12">
                {services.map((service, idx) => (
                  <ServiceCard key={service.id} service={service} index={idx} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <CTASection
          title={servicePageData?.ctaTitle || "Ready to Innovate?"}
          description={
            servicePageData?.ctaDescription ||
            "Let's discuss how our services can be tailored to meet your strategic goals."
          }
          buttonText={servicePageData?.ctaButtonText || "Start Your Project"}
          buttonLink={`${
            servicePageData?.ctaButtonLink || "/request-services"
          }?from=services\u0026returnPath=/services`}
        />
      </div>
    </Suspense>
  );
}
