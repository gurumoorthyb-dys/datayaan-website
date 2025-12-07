"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";

export const Footer = () => {
  const footerSections = {
    Company: [
      { label: "About", href: "/company/about-us" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
    Product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Security", href: "#" },
    ],
    Resources: [
      { label: "Blog", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Community", href: "#" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative mt-16">
      {/* Compact Wavy Top Separator - Single Color */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%] z-10">
        <svg
          className="relative block w-full h-[30px] md:h-[50px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-primary"
          ></path>
        </svg>
      </div>

      {/* Main Footer Content - Single Color */}
      <div className="relative bg-primary pt-4 pb-6">
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
            {/* Column 1: Brand & Contact (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center gap-2">
                {/* <div className="h-8 w-8 flex items-center justify-center">
                  <span className="text-white font-bold text-lg b">D</span>
                </div> */}
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Datayaan
                </h2>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Empowering modern businesses with AI-driven solutions.
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  <span>contact@datayaan.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Phone className="w-3.5 h-3.5 opacity-70" />
                  <span>044 2227 1400</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-white/80">
                  <MapPin className="w-3.5 h-3.5 opacity-70 mt-0.5" />
                  <span>Corporate office in Chennai, Tamil Nadu</span>
                </div>
              </div>

              <div className="flex gap-4 pt-1">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Links (Remaining cols) - Centered Grid */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:pl-12">
              {Object.entries(footerSections).map(([title, links]) => (
                <div key={title} className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider opacity-90">
                    {title}
                  </h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-xs text-white/70 hover:text-white transition-colors block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[10px] text-white/50 text-center md:text-left">
              © {new Date().getFullYear()} Datayaan. All rights reserved.
            </p>
            <div className="flex gap-4 text-[10px] text-white/50">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
