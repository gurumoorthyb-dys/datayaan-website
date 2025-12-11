import { fetchStrapiData } from "@/lib/strapi";
import { Metadata } from "next";
import RequestServicesForm from "@/components/forms/RequestServicesForm";
import BackButton from "@/components/ui/BackButton";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Request for Services | Datayaan",
    description: "Tell us about your project needs and we'll get back to you.",
};

interface ServiceCategory {
    id: number;
    name: string;
}

export default async function RequestServicesPage() {
    // const categoriesData = await fetchStrapiData("/services");
    // const categories: ServiceCategory[] = Array.isArray(categoriesData) ? categoriesData : [];

    const servicesData = await fetchStrapiData("/services?sort[0]=order:asc");
    const services: any[] = Array.isArray(servicesData) ? servicesData : [];
    console.log(services)
    return (
        <Suspense>
            <div className="min-h-screen bg-neutral-50">
                {/* Hero Section */}
                <div className="bg-primary pt-8 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(/hero-background.png)' }}
                    />
                    {/* Background Pattern/Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-neutral-800/40 to-neutral-700/50" />

                    {/* Back Button - Top Left Corner */}
                    {/* <div className="absolute top-4 left-4 sm:left-6 lg:left-8 z-20"> */}
                        {/* <BackButton defaultPath="/contact" variant="circular" /> */}
                    {/* </div> */}

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 mt-12">
                            Request for Services
                        </h1>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                            Tell us about your project needs and we&apos;ll get back to you
                            with a customized solution.
                        </p>
                    </div>
                </div>

                {/* Overlapping Form Card */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20 relative z-20">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        <RequestServicesForm categories={services} />
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
