import { fetchStrapiISR, STRAPI_URL } from "@/lib/strapi";
import ContactModal from "@/components/ui/ContactModal";
import LocationsList from "@/components/ui/LocationsMap";
import { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Contact Us | Datayaan",
    description:
        "Get in touch with Datayaan. Our offices in India, UAE, and Singapore are ready to help you.",
};

interface Office {
    id: number;
    country: string;
    city: string;
    address: string;
    phone?: string;
    email?: string;
    order: number;
    map_x?: number;
    map_y?: number;
}

export default async function ContactPage() {
    const pageContent = await fetchStrapiISR("/contact-page", 300);
    const officesData = await fetchStrapiISR("/offices?sort[0]=order:asc", 300);
    const offices: Office[] = Array.isArray(officesData) ? officesData : [];

    const content = pageContent || {
        pageTitle: "Let's Connect",
        pageSubtitle:
            "We're here to help! Tell us what you're looking for and we'll get you connected to the right people.",
        locationsHeading: "Our Global Presence",
        locationsDescription: "Explore our offices across the globe",
        contactFormHeading: "Get in Touch",
        contactFormDescription:
            "Fill out the form and our team will get back to you within 24 hours.",
    };

    return (
        <Suspense>
            <div className="min-h-screen bg-primary/10">
                {/* Hero Section with PageHero */}
                <PageHero
                    title={content.pageTitle || "Let's Connect"}
                    subtitle={content.pageSubtitle || "We're here to help! Tell us what you're looking for and we'll get you connected to the right people."}
                    backButtonPath="/"
                    backButtonLabel="Back"
                    backgroundImage="/contact-hero.png"
                />

                {/* Main Content */}
                <div className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Contact Form Section */}
                        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-8 md:p-12 mb-16">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-center mb-10">
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                        {content.contactFormHeading || "Get in Touch"}
                                    </h2>
                                    <p className="text-lg text-neutral-600">
                                        {content.contactFormDescription ||
                                            "Fill out the form and our team will get back to you within 24 hours."}
                                    </p>
                                </div>
                                <ContactModal />
                            </div>
                        </div>

                        {/* Locations Section */}
                        <div className="bg-white py-3 pb-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                                <div className="text-center">
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                        {content.locationsHeading || "Our Global Presence"}
                                    </h2>
                                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                        {content.locationsDescription || "Explore our offices across the globe"}
                                    </p>
                                </div>
                            </div>
                            <LocationsList offices={offices} />
                        </div>
                    </div>

                    {/* Locations Section */}
                    {/* <div className="bg-gradient-to-b from-white via-white to-primary/5 py-3 pb-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                                    {content.locationsHeading || "Our Global Presence"}
                                </h2>
                                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                    {content.locationsDescription ||
                                        "Explore our offices across the globe"}
                                </p>
                            </div>
                        </div>
                       
                    </div> */}
                </div>
            </div>
        </Suspense>
    );
}
