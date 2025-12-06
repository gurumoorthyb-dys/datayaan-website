import { fetchStrapiData, STRAPI_URL } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import CaseStudyFilters from "@/components/CaseStudyFilters";
import PageHero from "@/components/ui/PageHero";
import { isLocalHost } from "@/lib/commonFunction";

export const metadata: Metadata = {
    title: "Case Studies | Datayaan",
    description: "Explore our success stories and customer case studies",
};

interface CaseStudy {
    id: number;
    title: string;
    slug: string;
    customerIndustry: string;
    summary: string;
    thumbnail?: {
        url: string;
    };
    products?: Array<{
        id: number;
        name: string;
    }>;
    domains?: string[];
    domainTags?: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

export default async function CaseStudiesPage({
    searchParams,
}: {
    searchParams: Promise<{ product?: string; domain?: string }>;
}) {
    const { product, domain } = await searchParams;
    const caseStudiesData = await fetchStrapiData("/case-studies?populate=*");
    const productsData = await fetchStrapiData("/products");
    const domainsData = await fetchStrapiData("/domains");

    const caseStudies: CaseStudy[] = Array.isArray(caseStudiesData)
        ? caseStudiesData
        : caseStudiesData?.data
            ? Array.isArray(caseStudiesData.data)
                ? caseStudiesData.data
                : [caseStudiesData.data]
            : [];

    const products = Array.isArray(productsData)
        ? productsData
        : productsData?.data
            ? Array.isArray(productsData.data)
                ? productsData.data
                : [productsData.data]
            : [];

    // Get domains from the Domain collection
    const domains = Array.isArray(domainsData)
        ? domainsData.map((d: any) => d.name).sort()
        : [];

    // Filter case studies
    let filteredCaseStudies = caseStudies;

    if (product) {
        filteredCaseStudies = filteredCaseStudies.filter((cs) =>
            cs.products?.some((p) => p.name === product)
        );
    }

    if (domain) {
        filteredCaseStudies = filteredCaseStudies.filter((cs) => {
            const hasTag = cs.domainTags?.some((t) => t.name === domain);
            const hasLegacyTag = Array.isArray(cs.domains) && cs.domains.includes(domain);
            return hasTag || hasLegacyTag;
        });
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <PageHero
                title="Case Studies"
                subtitle="Explore how our solutions have helped businesses succeed"
                backButtonPath="/"
                backButtonLabel="Back"
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

                {/* Filters */}
                <CaseStudyFilters products={products} domains={domains} />

                {/* Results Count */}
                <p className="text-sm text-neutral-600 mb-6">
                    Showing {filteredCaseStudies.length} case {filteredCaseStudies.length === 1 ? "study" : "studies"}
                </p>

                {/* Case Studies Grid */}
                {filteredCaseStudies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCaseStudies.map((caseStudy) => (
                            <Link
                                key={caseStudy.id}
                                href={`/case-studies/${caseStudy.slug}?from=case-studies`}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Thumbnail */}
                                {caseStudy.thumbnail?.url && (
                                    <div className="relative h-48 bg-white flex items-center justify-center">
                                        <Image
                                            src={isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${caseStudy.thumbnail.url}` : `    ${caseStudy.thumbnail.url}`}
                                            alt={caseStudy.title}
                                            fill
                                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6">
                                    {/* Industry Badge */}
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                                        {caseStudy.customerIndustry}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                                        {caseStudy.title}
                                    </h3>

                                    {/* Summary */}
                                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                                        {caseStudy.summary}
                                    </p>

                                    {/* Read More */}
                                    <span className="text-primary text-sm font-medium group-hover:underline">
                                        Read More →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-neutral-600">No case studies found matching your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
