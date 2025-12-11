"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const productLinks = [
    { label: "Yaantrac", href: "/products/yaantrac" },
    { label: "Rakaz", href: "/products/rakaz" },
    { label: "WMA", href: "/products/product-wma" },
    { label: "Medyaan", href: "/products/medyaan" },
    { label: "Medyaan Pet OS", href: "/products/medyaan-pet-os" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/company/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    { icon: faFacebookF, href: "https://www.facebook.com/share/17jRzYpUnL/" },
    { icon: faXTwitter, href: "https://x.com/DatayaanContact?s=20" },
    {
      icon: faLinkedinIn,
      href: "https://www.linkedin.com/company/datayaan-solutions-private-limited/?viewAsMember=true",
    },
    {
      icon: faInstagram,
      href: "https://www.instagram.com/data.yaan",
    },
  ];

  return (
    <footer className="bg-[#2E3D45] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Block */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-bold text-orange-500">Datayaan</h2>
            <p className="text-[11px] text-white/70 leading-relaxed max-w-[220px]">
              Intelligent solutions built for modern businesses — simple,
              scalable, and AI-powered.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socials?.map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full flex items-center justify-center
                 bg-orange-500 hover:bg-white
                 border border-orange-500
                 transition-all"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="w-3.5 h-3.5 text-white hover:text-orange-500 transition"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Products
            </h3>
            <ul className="mt-2 flex flex-col gap-1">
              {productLinks.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-[11px] text-white/70 hover:text-orange-400 transition"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col space-y-1">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-2 flex flex-col gap-1">
              {companyLinks.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-[11px] text-white/70 hover:text-orange-400 transition"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact Information
            </h3>
            <ul className="mt-2 flex flex-col space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <a
                  href="mailto:contact@datayaan.com"
                  className="text-[11px] text-white/70 hover:text-orange-400 transition"
                >
                  contact@datayaan.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <a
                  href="tel:+914422271400"
                  className="text-[11px] text-white/70 hover:text-orange-400 transition"
                >
                  044 2227 1400
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <a
                  href="https://maps.app.goo.gl/3BYqQ1wUbLPhbcSS7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/70 hover:text-orange-400 transition"
                >
                  Chennai, Tamil Nadu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/50 gap-2">
          <p>© {new Date().getFullYear()} Datayaan. All rights reserved.</p>
          <div className="flex gap-4">
            {/* <Link href="#" className="hover:text-orange-400 transition">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-orange-400 transition">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-orange-400 transition">
                            Cookies
                        </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
