"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";
import { STRAPI_URL } from "@/lib/strapi";

interface ContactUsProps {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
    socialInstagram?: string;
    socialLinkedIn?: string;
    socialFacebook?: string;
    domains: string[];
}

export default function ContactUs({
    title = "Contact Information",
    description = "Say something to start a live chat!",
    email,
    phone,
    address,
    socialInstagram,
    socialLinkedIn,
    socialFacebook,
    domains,
}: ContactUsProps) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        domainOfInterest: "",
        otherDomain: "",
        reason: "",
        reference: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isReferenceLocked, setIsReferenceLocked] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const utmSource = searchParams.get("utm_source");
        const refParam = searchParams.get("ref");
        const referrer = document.referrer;

        let source = "";
        if (utmSource) source = utmSource;
        else if (refParam) source = refParam;
        else if (referrer) {
            try {
                const url = new URL(referrer);
                if (url.hostname !== window.location.hostname) {
                    source = url.hostname.replace(/^www\./, "");
                }
            } catch (e) {
                // Ignore invalid URLs
            }
        }

        if (source) {
            setFormData((prev) => ({ ...prev, reference: source }));
            setIsReferenceLocked(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (submitStatus === "success" || submitStatus === "error") {
            const timer = setTimeout(() => {
                setSubmitStatus("idle");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.phone.trim() && !formData.email.trim()) {
            newErrors.contact = "Please provide either phone or email";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.reason.trim()) {
            newErrors.reason = "Please tell us why you're contacting us";
        }

        if (formData.domainOfInterest === "Others" && !formData.otherDomain.trim()) {
            newErrors.otherDomain = "Please specify the domain";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
            setErrors((prev) => ({ ...prev, recaptcha: "Please complete the reCAPTCHA" }));
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch(`${STRAPI_URL}/api/leads`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-recaptcha-token": recaptchaToken || "",
                },
                body: JSON.stringify({
                    data: {
                        name: formData.name,
                        phone: formData.phone || null,
                        email: formData.email || null,
                        domainOfInterest: formData.domainOfInterest === "Others" ? formData.otherDomain : formData.domainOfInterest,
                        otherDomain: formData.domainOfInterest === "Others" ? formData.otherDomain : null,
                        reason: formData.reason,
                        reference: formData.reference || null,
                        status: "new",
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            setSubmitStatus("success");
            setFormData({
                name: "",
                phone: "",
                email: "",
                domainOfInterest: "",
                otherDomain: "",
                reason: "",
                reference: "",
            });
            setRecaptchaToken(null);
            setIsReferenceLocked(false);

            // Delay reset to avoid cancelled request
            setTimeout(() => {
                recaptchaRef.current?.reset();
            }, 100);
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        if (name === "phone" || name === "email") {
            setErrors((prev) => ({ ...prev, contact: "" }));
        }
    };

    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
        if (token) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.recaptcha;
                return newErrors;
            });
        }
    };

    return (
        <div id="contact" className=" py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Left Side - Primary Color Contact Info */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/90 p-5 md:p-6 text-white relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-16 translate-y-16"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold mb-3">{title}</h2>
                                <p className="text-white/90 mb-10 text-base">{description}</p>

                                <div className="space-y-4">
                                    {phone && (
                                        <a href={`tel:${phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-white/5 hover:border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/70 text-sm font-medium mb-1">Phone</span>
                                                <span className="text-white/90 text-base font-medium">{phone}</span>
                                            </div>
                                        </a>
                                    )}

                                    {email && (
                                        <a href={`mailto:${email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-white/5 hover:border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/70 text-sm font-medium mb-1">Email</span>
                                                <span className="text-white/90 text-base font-medium">{email}</span>
                                            </div>
                                        </a>
                                    )}

                                    {address && (
                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/70 text-sm font-medium mb-1">Address</span>
                                                <p className="text-white/90 text-base font-medium leading-relaxed">{address}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {(socialInstagram || socialLinkedIn || socialFacebook) && (
                                    <div className="mt-10 pt-8 border-t border-white/10">
                                        <p className="text-white/90 text-lg font-medium mb-4">Follow us on social media</p>
                                        <div className="flex gap-3">
                                            {socialInstagram && (
                                                <a
                                                    href={socialInstagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-9 h-9 bg-white/10 hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                                >
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                            )}
                                            {socialLinkedIn && (
                                                <a
                                                    href={socialLinkedIn}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-9 h-9 bg-white/10 hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                            {socialFacebook && (
                                                <a
                                                    href={socialFacebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-9 h-9 bg-white/10 hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                                >
                                                    <Facebook className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Compact Form */}
                        <div className="lg:col-span-3 p-8 md:p-10">
                            {submitStatus === "success" && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                                    Thank you! We'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                    Something went wrong. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-medium text-neutral-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200 ${errors.name ? "border-red-500 bg-red-50" : ""
                                            }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-medium text-neutral-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200 ${errors.email ? "border-red-500 bg-red-50" : ""
                                                }`}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-xs font-medium text-neutral-700 mb-1">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                                {errors.contact && <p className="text-xs text-red-500">{errors.contact}</p>}

                                <div>
                                    <label className="block text-xs font-medium text-neutral-700 mb-2">
                                        Select Subject?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {domains.map((domain) => (
                                            <label key={domain} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="domainOfInterest"
                                                    value={domain}
                                                    checked={formData.domainOfInterest === domain}
                                                    onChange={handleChange}
                                                    className="w-3 h-3 text-primary focus:ring-primary"
                                                />
                                                <span className="ml-1.5 text-xs text-neutral-700">{domain}</span>
                                            </label>
                                        ))}
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="domainOfInterest"
                                                value="Others"
                                                checked={formData.domainOfInterest === "Others"}
                                                onChange={handleChange}
                                                className="w-3 h-3 text-primary focus:ring-primary"
                                            />
                                            <span className="ml-1.5 text-xs text-neutral-700">Others</span>
                                        </label>
                                    </div>
                                </div>

                                {formData.domainOfInterest === "Others" && (
                                    <div>
                                        <label htmlFor="otherDomain" className="block text-xs font-medium text-neutral-700 mb-1">
                                            Please specify <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="otherDomain"
                                            name="otherDomain"
                                            value={formData.otherDomain}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200 ${errors.otherDomain ? "border-red-500 bg-red-50" : ""
                                                }`}
                                            placeholder="Enter your domain"
                                        />
                                        {errors.otherDomain && <p className="mt-1 text-xs text-red-500">{errors.otherDomain}</p>}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="reason" className="block text-xs font-medium text-neutral-700 mb-1">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        rows={3}
                                        className={`w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200 resize-none ${errors.reason ? "border-red-500 bg-red-50" : ""
                                            }`}
                                        placeholder="Write your message..."
                                    />
                                    {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
                                </div>

                                <div>
                                    <label htmlFor="reference" className="block text-xs font-medium text-neutral-700 mb-1">
                                        How did you hear about us? (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="reference"
                                        name="reference"
                                        value={formData.reference}
                                        onChange={handleChange}
                                        readOnly={isReferenceLocked}
                                        className={`w-full px-4 py-3 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all duration-200 ${isReferenceLocked ? "bg-orange-50 cursor-not-allowed font-medium text-orange-800 border-orange-200" : ""
                                            }`}
                                        placeholder="Google, LinkedIn, etc."
                                    />
                                </div>
                                <div className="mt-4">
                                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                            onChange={handleRecaptchaChange}
                                        />
                                    ) : (
                                        <p className="text-xs text-red-500 bg-red-50 p-2 rounded border border-red-200">
                                            Error: Verification failed. Please try again.
                                        </p>
                                    )}
                                    {errors.recaptcha && <p className="mt-1 text-xs text-red-500">{errors.recaptcha}</p>}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button type="submit" size="sm" disabled={isSubmitting} className="px-6">
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
