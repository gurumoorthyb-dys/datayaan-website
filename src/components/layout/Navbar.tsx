"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const defaultLinks: NavLink[] = [
    { label: "Products", href: "#" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#" },
  ];

  const navLinks = links.length ? links : defaultLinks;

  const normalizeHref = (href?: string) => {
    if (!href) return "#";
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("/"))
      return href;
    return `/${href}`;
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === normalizeHref(href);
  };

  const isParentActive = (link: NavLink) => {
    if (isActive(link.href) && link.href !== "#") return true;
    if (link.dropdown) {
      return link.dropdown.some((item) => isActive(item.href));
    }
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-start items-center gap-1 ml-6">
          {navLinks.map((link, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => link.isDropDown && setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {link.isDropDown && link.dropdown ? (
                <>
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all
                      ${
                        openDropdown === index || isParentActive(link)
                          ? "text-primary"
                          : "text-neutral-700 hover:text-primary"
                      }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === index && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border py-2 animate-in fade-in zoom-in-95">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={normalizeHref(item.href)}
                          className={`block px-4 py-3 text-sm transition-all
                            ${
                              isActive(item.href)
                                ? "text-primary"
                                : "text-neutral-700 hover:text-primary"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={normalizeHref(link.href)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all
                    ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-neutral-700 hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        {ctaText && (
          <div className="hidden md:block">
            <Link href={normalizeHref(ctaLink)}>
              <Button size="sm">{ctaText}</Button>
            </Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-neutral-500 cursor-pointer transition-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ SMOOTH ANIMATED MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-white border-t shadow-xl px-6 py-4 space-y-3">
          {navLinks.map((link, index) => (
            <div key={index}>
              {link.isDropDown && link.dropdown ? (
                <>
                  <button
                    className={`flex w-full justify-between items-center py-3 text-sm font-semibold
                      ${
                        isParentActive(link)
                          ? "text-primary"
                          : "text-neutral-800"
                      }`}
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === index && (
                    <div className="ml-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={normalizeHref(item.href)}
                          onClick={() => setMobileOpen(false)}
                          className={`block text-sm transition-all
                            ${
                              isActive(item.href)
                                ? "text-primary"
                                : "text-neutral-600 hover:text-primary"
                            }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={normalizeHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-sm font-semibold transition-all
                    ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-neutral-800 hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          {ctaText && (
            <Link href={normalizeHref(ctaLink)}>
              <Button className="w-full mt-3" size="sm">
                {ctaText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
