"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CustomSelect from "@/components/ui/CustomSelect";

interface FiltersProps {
  products: Array<{ id: number; name: string }>;
  domains: string[];
}

export default function CaseStudyFilters({ products, domains }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleProductChange = (e: {
    target: { name: string; value: string };
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("product", e.target.value);
    } else {
      params.delete("product");
    }
    router.push(`/case-studies?${params.toString()}`);
  };

  const handleDomainChange = (e: {
    target: { name: string; value: string };
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("domain", e.target.value);
    } else {
      params.delete("domain");
    }
    router.push(`/case-studies?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/case-studies");
  };

  const hasFilters = searchParams.has("product") || searchParams.has("domain");

  // Convert products to options format
  const productOptions = [
    ...products.map((product) => ({
      value: product.name,
      label: product.name,
    })),
  ];

  // Convert domains to options format
  const domainOptions = [
    ...domains.map((domain) => ({
      value: domain,
      label: domain,
    })),
  ];

  return (
    <div className="mb-8 flex flex-wrap gap-4 items-end">
      {/* Product Filter */}
      <div className="min-w-[250px] max-w-[300px]">
        <label
          htmlFor="product-filter"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Filter by Product
        </label>
        <CustomSelect
          name="product"
          value={searchParams.get("product") || ""}
          onChange={handleProductChange}
          options={productOptions}
          placeholder="All Products"
        />
      </div>

      {/* Domain Filter */}
      <div className="min-w-[250px] max-w-[300px]">
        <label
          htmlFor="domain-filter"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          Filter by Domain
        </label>
        <CustomSelect
          name="domain"
          value={searchParams.get("domain") || ""}
          onChange={handleDomainChange}
          options={domainOptions}
          placeholder="All Domains"
        />
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm bg-[#FA7C1E] text-white rounded-lg hover:bg-[#FA7C1E]/80 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
