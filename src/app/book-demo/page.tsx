import { fetchStrapiData } from "@/lib/strapi";
import { Metadata } from "next";
import BookDemoForm from "@/components/forms/BookDemoForm";
import BackButton from "@/components/ui/BackButton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book a Demo | Datayaan",
  description:
    "Schedule a personalized demo of Datayaan products. See our solutions in action.",
};

interface Product {
  id: number;
  name: string;
}

export default async function BookDemoPage() {
  const productsData = await fetchStrapiData("/products");
  const products: Product[] = Array.isArray(productsData) ? productsData : [];

  return (
    <Suspense>
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-primary pt-8 pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/hero-background.png)" }}
          />
          {/* Background Pattern/Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80" />

          {/* Back Button - Top Left Corner */}
          <div className="absolute top-4 left-4 sm:left-6 lg:left-8 z-20">
            <BackButton defaultPath="/contact" variant="circular" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 mt-12">
              Book a Personalized Demo
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below to get a walkthrough of our solutions. See
              how we can help you achieve your business goals.
            </p>
          </div>
        </div>

        {/* Overlapping Form Card */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-20 relative z-20">
          <Suspense fallback={<div>Loading…</div>}>
            <BookDemoForm products={products} />
          </Suspense>
        </div>
      </div>
    </Suspense>
  );
}
