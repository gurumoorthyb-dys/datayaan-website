import { fetchStrapiData, STRAPI_URL } from "@/lib/strapi";
import { processRichText } from "@/lib/richtext";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SmartCTASection from "@/components/ui/SmartCTASection";
import { isLocalHost } from "@/lib/commonFunction";

interface CaseStudyDetailProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const data = await fetchStrapiData("/case-studies");
    const caseStudies = Array.isArray(data) ? data : data?.data ? (Array.isArray(data.data) ? data.data : [data.data]) : [];

    return caseStudies.map((cs: any) => ({
        slug: cs.slug,
    }));
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailProps) {
    const { slug } = await params;

    const [data, productPageData] = await Promise.all([
        fetchStrapiData(`/case-studies?filters[slug][$eq]=${slug}&populate=*`),
        fetchStrapiData("/product-page"),
    ]);

    const caseStudies = Array.isArray(data) ? data : data?.data ? (Array.isArray(data.data) ? data.data : [data.data]) : [];
    const caseStudy = caseStudies[0];

    if (!caseStudy) {
        notFound();
    }

    // Helper to get media URL
    const getMediaUrl = (media: any) => {
        if (!media) return null;
        if (Array.isArray(media)) {
            return media.map((m) => ({ url: isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${m.url}` : `${m.url}`, alt: m.alternativeText || "" }));
        }
        return isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}` : `${media.url}`;
    };

    const thumbnailUrl = getMediaUrl(caseStudy.thumbnail);
    const images = getMediaUrl(caseStudy.images) || [];

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <PageHero
                title={caseStudy.title}
                subtitle={caseStudy.description}
                backButtonPath="/case-studies"
                backButtonLabel="Back"
                badge={caseStudy.customerIndustry}
            />

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Thumbnail */}
                {thumbnailUrl && typeof thumbnailUrl === "string" && (
                    <div className="relative h-96 rounded-xl overflow-hidden mb-12 shadow-xl">
                        <Image src={thumbnailUrl} alt={caseStudy.title} fill className="object-contain" />
                    </div>
                )}

                {/* Overview Section (if summary exists) */}
                {caseStudy.summary && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Overview</h2>
                        <p className="text-lg text-neutral-700 leading-relaxed text-justify">
                            {caseStudy.summary}
                        </p>
                    </section>
                )}


                {/* Problem Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">The Challenge</h2>
                    <div
                        className="rich-text-content prose prose-lg prose-neutral max-w-none text-justify text-neutral-700"
                        dangerouslySetInnerHTML={{ __html: processRichText(caseStudy.problem) }}
                    />
                </section>

                {/* Solution Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Solution</h2>
                    <div
                        className="rich-text-content prose prose-lg prose-neutral max-w-none text-justify text-neutral-700"
                        dangerouslySetInnerHTML={{ __html: processRichText(caseStudy.solution) }}
                    />
                </section>

                {/* Impact and Outcome Section */}
                {caseStudy.impact && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Impact</h2>
                        <div
                            className="rich-text-content prose prose-lg prose-neutral max-w-none text-justify text-neutral-700"
                            dangerouslySetInnerHTML={{ __html: processRichText(caseStudy.impact) }}
                        />
                    </section>
                )}

                {caseStudy.outcome && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Outcome</h2>
                        <div
                            className="rich-text-content prose prose-lg prose-neutral max-w-none text-justify text-neutral-700"
                            dangerouslySetInnerHTML={{ __html: processRichText(caseStudy.outcome) }}
                        />
                    </section>
                )}

                {/* Technologies Used */}
                {caseStudy.technologiesUsed && Array.isArray(caseStudy.technologiesUsed) && caseStudy.technologiesUsed.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.technologiesUsed.map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-neutral-100 text-neutral-800 rounded-lg text-sm font-medium"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Images Gallery */}
                {Array.isArray(images) && images.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {images.map((img: any, index: number) => (
                                <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                                    <Image src={img.url} alt={img.alt || `Image ${index + 1}`} fill className="object-contain" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Products */}
                {caseStudy.products && caseStudy.products.length > 0 && (
                    <section className="mb-2">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Related Products</h2>
                        <div className="flex flex-wrap gap-3">
                            {caseStudy.products.map((product: any) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.slug}?from=case-study&returnPath=/case-studies/${slug}`}
                                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                                >
                                    {product.name}
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Domains */}
                {caseStudy.domains && Array.isArray(caseStudy.domains) && caseStudy.domains.length > 0 && (
                    <section className="mb-2">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Related Domains</h2>
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.domains.map((domain: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium"
                                >
                                    {domain}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

            </div>

            {/* CTA */}
            <SmartCTASection
                title={productPageData?.ctaTitle || "Ready to get started?"}
                description={productPageData?.ctaDescription || "Book a demo to see how our product can help you."}
                buttonText={productPageData?.ctaButtonText || "Book a Demo"}
                buttonLink={productPageData?.ctaButtonLink || "/book-demo"}
                currentPath={`/case-studies/${slug}`}
            />
        </div>
    );
}
