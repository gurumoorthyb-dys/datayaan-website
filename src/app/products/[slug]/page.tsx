import { fetchStrapiISR, STRAPI_URL } from "@/lib/strapi";
import { processRichText } from "@/lib/richtext";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import UseCasesGrid from "@/components/UseCasesGrid";
import BackButton from "@/components/ui/BackButton";
import PageHero from "@/components/ui/PageHero";
import SmartCTASection from "@/components/ui/SmartCTASection";
import { isLocalHost } from "@/lib/commonFunction";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;

    const [productsData, homeData, globalData, productPageData] = await Promise.all([
        fetchStrapiISR(
            `/products?filters[slug][$eq]=${slug}&populate[0]=heroBanner&populate[1]=icon&populate[2]=features.icon&populate[3]=useCases.image&populate[4]=caseStudies.thumbnail`,
            600 // Revalidate every 10 minutes
        ),
        fetchStrapiISR("/home-page", 300),
        fetchStrapiISR("/global?populate[navbarLinks][populate]=dropdown", 3600),
        fetchStrapiISR("/product-page", 1800),
    ]);


    const product =
        Array.isArray(productsData) && productsData.length > 0
            ? productsData[0]
            : null;


    if (!product) {
        notFound();
    }

    const getMediaUrl = (media: any) => {
        if (!media) return null;
        if (Array.isArray(media) && media.length > 0) {
            return media[0].url && isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media[0].url}` : `${media[0].url}`;
        }
        if (media.url && isLocalHost) {
            return `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`
        } else {
            return media.url
        }
        return null;
    };

    const useCasesWithUrls = product.useCases.map((uc: any) => ({
        ...uc,
        imageUrl: getMediaUrl(uc.image),
    }));


    const heroBanner = getMediaUrl(product.heroBanner);

    return (
        <div className="min-h-screen bg-white overflow-hidden relative">

            <div className="relative z-10 bg-neutral-50">
                {/* HERO TITLE */}
                <PageHero
                    title={product.heroTitle || product.name}
                    subtitle={product.heroSubTitle}
                    backButtonPath="/"
                    backButtonLabel="Back"
                />

                {/* Overview */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-8 ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT TEXT */}
                        <div className="space-y-6 text-justify">
                            <div
                                className="rich-text-content text-[17px] md:text-[18px] text-neutral-700 leading-8"
                                dangerouslySetInnerHTML={{ __html: processRichText(product.description) }}
                            />

                            {(product.primaryButtonText || product.secondaryButtonText) && (
                                <div className="flex flex-wrap gap-4">
                                    {product.primaryButtonText && (
                                        <Link href={product.primaryButtonLink || "#"}>
                                            <Button size="lg" className="px-6 py-3 rounded-xl shadow hover:shadow-lg">
                                                {product.primaryButtonText}
                                            </Button>
                                        </Link>
                                    )}
                                    {product.secondaryButtonText && (
                                        <Link href={product.secondaryButtonLink || "#"}>
                                            <Button
                                                variant="secondary"
                                                size="lg"
                                                className="px-6 py-3 rounded-xl border shadow hover:shadow-lg"
                                            >
                                                {product.secondaryButtonText}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative w-full">
                            {heroBanner ? (
                                <div className="relative h-[300px] md:h-[380px] lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200/70 items-start">
                                    <Image
                                        src={heroBanner}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            ) : (
                                <div className="h-[350px] w-full rounded-2xl bg-neutral-100 flex items-start justify-center">
                                    <p className="text-neutral-400">No image available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* FEATURES SECTION */}
                {product.features && product.features.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-4">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Key Features</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {product.features.map((feature: any, idx: number) => (
                                    <div key={idx} className="flex gap-5 p-4 rounded-xl hover:bg-neutral-50 transition-all">
                                        <div className="flex-shrink-0">
                                            {getMediaUrl(feature.icon) ? (
                                                <div className="w-14 h-14 relative">
                                                    <Image
                                                        src={getMediaUrl(feature.icon)!}
                                                        alt={feature.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <CheckCircle className="w-7 h-7 text-primary" />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h3>
                                            <p className="text-neutral-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* Use Cases Section – Professional Grid */}
                {product.useCases && product.useCases.length > 0 && (
                    <div className="bg-neutral-50 py-2">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-neutral-900 mb-4">
                                    Real-World Applications
                                </h2>
                                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                    See how organizations leverage our solutions to drive success
                                </p>
                            </div>

                            <UseCasesGrid useCases={useCasesWithUrls} />
                        </div>
                    </div>
                )}


                {/* CASE STUDIES */}
                {product.caseStudies && product.caseStudies.length > 0 && (
                    <div className="bg-neutral-50 py-2 mt-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl font-bold text-neutral-900 mb-4">Success Stories</h2>
                                    <p className="text-neutral-600 max-w-2xl">
                                        See how companies transform their business with {product.name}
                                    </p>
                                </div>
                                <Link href="/case-studies" className="hidden md:inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                                    View all case studies <ArrowLeft className="w-4 h-4 rotate-180" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {product.caseStudies.map((caseStudy: any, idx: number) => (
                                    <Link
                                        key={idx}
                                        href={`/case-studies/${caseStudy.slug}?from=product&productSlug=${slug}`}
                                        className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary/50 transition-all shadow-sm hover:shadow-lg"
                                    >
                                        {getMediaUrl(caseStudy.thumbnail) && (
                                            <div className="relative h-56 w-full bg-white overflow-hidden">
                                                <Image
                                                    src={getMediaUrl(caseStudy.thumbnail)!}
                                                    alt={caseStudy.title}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        <div className="p-8">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                                {caseStudy.customerIndustry}
                                            </span>

                                            <h3 className="text-xl font-bold text-neutral-900 mt-4 mb-2 group-hover:text-primary transition-colors">
                                                {caseStudy.title}
                                            </h3>

                                            <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                                                {caseStudy.description}
                                            </p>

                                            <div className="mt-6 flex items-center text-primary text-sm font-medium">
                                                Read Case Study
                                                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <SmartCTASection
                    title={productPageData?.ctaTitle || "Ready to get started?"}
                    description={productPageData?.ctaDescription || "Book a demo to see how our product can help you."}
                    buttonText={productPageData?.ctaButtonText || "Book a Demo"}
                    buttonLink={productPageData?.ctaButtonLink || "/book-demo"}
                    currentPath={`/products/${slug}`}
                />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const productsData = await fetchStrapiISR("/products?fields[0]=slug&sort=order:asc", 600);

    if (!productsData || !Array.isArray(productsData)) {
        return [];
    }

    return productsData.map((product: any) => ({
        slug: product.slug,
    }));
}

// Enable dynamic params for ISR
export const dynamicParams = true;
