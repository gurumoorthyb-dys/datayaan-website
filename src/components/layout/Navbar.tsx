"use client";

import React, { useEffect, useRef, useState } from "react";
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
    const navRef = useRef<HTMLDivElement>(null);

    const defaultLinks: NavLink[] = [
        {
            label: "Products",
            isDropDown: true,
            dropdown: [
                { label: "Fleet Tracking", href: "/fleet" },
                { label: "Pet Clinic", href: "/petclinic" },
            ],
        },
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


    const isActive = (href?: string) => pathname === normalizeHref(href) || pathname.includes(href!);


    const isParentActive = (link: NavLink) => {
        if (isActive(link.href) && link.href !== "#") return true;
        if (link.dropdown) {
            return link.dropdown.some((item) => isActive(item.href));
        }
        return false;
    };

    // ✅ FIX: Disable outside-click when mobile drawer is open
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                !mobileOpen &&
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="sticky top-0 z-50 w-full border-b border-neutral-200
           bg-white/60 backdrop-blur-2xl backdrop-saturate-150
           supports-[backdrop-filter]:bg-white/60"
            >
                <div className="mx-auto flex h-[68px] max-w-7xl items-center px-6 lg:px-10">
                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        {companyLogo ? (
                            <Image
                                src={companyLogo}
                                alt={siteTitle || "Company Logo"}
                                width={150}
                                height={50}
                                className="w-[150px] h-auto object-contain"
                                priority
                            />
                        ) : (
                            <span className="text-[20px] font-semibold tracking-wide text-primary">
                                {siteTitle || "Datayaan"}
                            </span>
                        )}
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8 ml-12 flex-1">
                        {navLinks.map((link, index) => (
                            <div
                                key={index}
                                className="relative flex items-center h-[40px]"
                                onMouseEnter={() => !mobileOpen && setOpenDropdown(index)}
                                onMouseLeave={() => !mobileOpen && setOpenDropdown(null)}
                            >
                                {link.isDropDown && link.dropdown ? (
                                    <>
                                        <button
                                            className={`flex items-center gap-1 text-[14.8px] font-medium tracking-wide transition-colors duration-200 ${openDropdown === index || isParentActive(link)
                                                ? "text-primary"
                                                : "text-neutral-700 hover:text-primary"
                                                }`}
                                        >
                                            {link.label}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${openDropdown === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        <div
                                            className={`absolute left-0 top-[40px] w-64 rounded-xl border border-neutral-200 bg-white shadow-xl py-2 transition-all duration-250 ease-out ${openDropdown === index
                                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                                                }`}
                                        >
                                            {link.dropdown.map((item, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={normalizeHref(item.href)}
                                                    className={`block px-5 py-3 text-[14px] font-medium transition-all duration-150 ${isActive(item.href)
                                                        ? "text-primary bg-primary/10"
                                                        : "text-neutral-700 hover:text-primary hover:bg-neutral-100"
                                                        }`}
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={normalizeHref(link.href)}
                                        className={`text-[14.8px] font-medium tracking-wide transition-colors ${isActive(link.href)
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

                    {/* CTA */}
                    <div className="hidden md:block ml-auto">
                        <Link href={normalizeHref(ctaLink || "/book-demo")}>
                            <Button
                                size="sm"
                                className="px-5 text-[13.8px] font-semibold cursor-pointer"
                            >
                                {ctaText || "Let's Get Started"}
                            </Button>
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="md:hidden ml-auto text-neutral-700"
                        onClick={() => setMobileOpen(true)}
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* MOBILE DRAWER */}
            <div
                className={`fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            >
                <div
                    className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-between items-center px-6 h-[68px] border-b">
                        <span className="font-semibold text-[16px]">
                            <span className="text-primary">{siteTitle || "Datayaan"}</span>
                        </span>
                        <button onClick={() => setMobileOpen(false)}>
                            <span className="text-neutral-700">
                                <X size={24} />
                            </span>
                        </button>
                    </div>

                    <div className="px-6 py-6 space-y-5">
                        {navLinks.map((link, index) => (
                            <div key={index}>
                                {link.isDropDown && link.dropdown ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(openDropdown === index ? null : index)
                                            }
                                            className="flex items-center justify-between w-full text-[14.8px] font-medium text-neutral-800"
                                        >
                                            {link.label}
                                            <ChevronDown
                                                className={`transition-transform ${openDropdown === index ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {openDropdown === index && (
                                            <div className="mt-3 ml-4 space-y-3">
                                                {link.dropdown.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={normalizeHref(item.href)}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="block text-[14px] font-medium text-neutral-600 hover:text-primary"
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
                                        className="block text-[14.8px] font-medium text-neutral-800 hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <Link href={normalizeHref(ctaLink || "/book-demo")}>
                            <Button
                                className="w-full mt-6 text-[14px] font-semibold"
                                size="sm"
                            >
                                {ctaText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};