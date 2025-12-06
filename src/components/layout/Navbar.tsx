"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href?: string;
  isDropDown?: boolean;
  dropdown?: DropdownItem[];
}

interface NavbarProps {
  links?: NavLink[];
  ctaText?: string;
  ctaLink?: string;
  siteTitle?: string;
  companyLogo?: string;
}

export const Navbar = ({
  links = [],
  ctaText,
  ctaLink,
  siteTitle,
  companyLogo,
}: NavbarProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const defaultLinks: NavLink[] = [
    { label: "Products", href: "#" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#" },
  ];

  const navLinks = links && links.length > 0 ? links : defaultLinks;

  console.log(navLinks, "NAV LINKS");

  const normalizeHref = (href: string | undefined) => {
    console.log(href, "HREF");
    if (!href) return "#";
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("/"))
      return href;
    return `/${href}`;
  };


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={siteTitle || "Company Logo"}
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {siteTitle || "Datayaan"}
              </span>
            )}
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() =>
                  link.isDropDown && link.dropdown && setOpenDropdown(index)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.isDropDown && link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-all duration-200">
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === index ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openDropdown === index && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-neutral-200/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            href={normalizeHref(item.href)}
                            className="group relative flex items-center px-4 py-3 text-sm text-neutral-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-primary transition-all duration-200 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 -z-10" />
                            <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                              {item.label}
                            </span>
                            <svg
                              className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={normalizeHref(link.href)}
                    className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {ctaText && (
            <Link href={normalizeHref(ctaLink)}>
              <Button size="sm">{ctaText}</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
