"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FiltersProps {
    products: Array<{ id: number; name: string }>;
    domains: string[];
}

export default function CaseStudyFilters({ products, domains }: FiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleProductChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("product", value);
        } else {
            params.delete("product");
        }
        router.push(`/case-studies?${params.toString()}`);
    };

    const handleDomainChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("domain", value);
        } else {
            params.delete("domain");
        }
        router.push(`/case-studies?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push("/case-studies");
    };

    const hasFilters = searchParams.has("product") || searchParams.has("domain");

    return (
        <div className="mb-8 flex flex-wrap gap-4">
            {/* Product Filter */}
            <div>
                <label htmlFor="product-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                    Filter by Product
                </label>
                <select
                    id="product-filter"
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchParams.get("product") || ""}
                    onChange={(e) => handleProductChange(e.target.value)}
                >
                    <option value="">All Products</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Domain Filter */}
            <div>
                <label htmlFor="domain-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                    Filter by Domain
                </label>
                <select
                    id="domain-filter"
                    className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchParams.get("domain") || ""}
                    onChange={(e) => handleDomainChange(e.target.value)}
                >
                    <option value="">All Domains</option>
                    {domains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>
            </div>

            {/* Clear Filters */}
            {hasFilters && (
                <div className="flex items-end">
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
