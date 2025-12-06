"use client";

import { useState, useRef, useEffect } from "react";
import { postStrapiData, STRAPI_URL } from "@/lib/strapi";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";
import { Search, Linkedin, Facebook, Twitter, Users, Megaphone, HelpCircle, ChevronDown, Check, Lock } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

interface Product {
    id: number;
    name: string;
}

interface BookDemoFormProps {
    products: Product[];
}

export default function BookDemoForm({ products }: BookDemoFormProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        product: "",
        phone: "",
        preferredDate: "",
        notes: "",
        reference: "",
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [recaptchaError, setRecaptchaError] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReferenceLocked, setIsReferenceLocked] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    const referenceOptions = [
        { value: "Google Search", label: "Google Search", icon: Search, color: "text-red-500", bgColor: "bg-red-50" },
        { value: "LinkedIn", label: "LinkedIn", icon: Linkedin, color: "text-blue-600", bgColor: "bg-blue-50" },
        { value: "Facebook", label: "Facebook", icon: Facebook, color: "text-blue-500", bgColor: "bg-blue-50" },
        { value: "Twitter", label: "Twitter", icon: Twitter, color: "text-sky-500", bgColor: "bg-sky-50" },
        { value: "Friend/Colleague", label: "Friend/Colleague", icon: Users, color: "text-green-500", bgColor: "bg-green-50" },
        { value: "Advertisement", label: "Advertisement", icon: Megaphone, color: "text-purple-500", bgColor: "bg-purple-50" },
        { value: "Other", label: "Other", icon: HelpCircle, color: "text-gray-500", bgColor: "bg-gray-50" },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
        if (token) {
            setRecaptchaError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate reCAPTCHA
        if (!recaptchaToken) {
            setRecaptchaError("Please complete the reCAPTCHA verification");
            return;
        }

        setStatus("submitting");

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            company: formData.company,
            product: formData.product,
            phone: formData.phone,
            preferredDate: formData.preferredDate || null,
            notes: formData.notes,
            reference: formData.reference,
            status: "new",
        };

        try {
            const response = await fetch(`${STRAPI_URL}/api/demo-bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-recaptcha-token": recaptchaToken || "",
                },
                body: JSON.stringify({ data: payload }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            setStatus("success");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                company: "",
                product: "",
                phone: "",
                preferredDate: "",
                notes: "",
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
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Demo Scheduled!</h3>
                <p className="text-green-700">
                    Your demo request has been received. Our team will contact you shortly to confirm the time.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-green-700 font-semibold hover:text-green-900"
                >
                    Book another demo
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        First name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white text-neutral-600 placeholder-neutral-400"
                        placeholder="John"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Last name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white text-neutral-600 placeholder-neutral-400"
                        placeholder="Doe"
                    />
                </div>
            </div>

            {/* Email and Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Work Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white text-neutral-600 placeholder-neutral-400"
                        placeholder="john@company.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white text-neutral-600 placeholder-neutral-400"
                        placeholder="Company Inc."
                    />
                </div>
            </div>

            {/* Product Dropdown */}
            <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Product<span className="text-red-500">*</span>
                </label>
                <CustomSelect
                    name="product"
                    value={formData.product}
                    onChange={(e) => handleChange(e as any)}
                    options={[
                        ...products.map(product => ({ value: product.name, label: product.name })),
                        { value: "Others", label: "Others" }
                    ]}
                    placeholder="Select a product"
                    required
                />
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white text-neutral-600 placeholder-neutral-400"
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            {/* Preferred Date */}
            <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Preferred Date</label>
                <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white ${formData.preferredDate ? "text-neutral-600" : "text-neutral-400"}`}
                />
            </div>

            {/* How did you hear about us */}
            <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">How did you hear about us?</label>
                <div
                    onClick={() => !isReferenceLocked && setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-2 rounded-lg border flex items-center justify-between transition-colors ${isReferenceLocked
                        ? "bg-orange-50 border-orange-200 cursor-not-allowed"
                        : "bg-white border-neutral-300 cursor-pointer hover:border-primary/50"
                        }`}
                >
                    {formData.reference ? (
                        (() => {
                            const selectedOption = referenceOptions.find(opt => opt.value === formData.reference);
                            if (selectedOption) {
                                const Icon = selectedOption.icon;
                                return (
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-md ${selectedOption.bgColor}`}>
                                            <Icon className={`w-4 h-4 ${selectedOption.color}`} />
                                        </div>
                                        <span className={`${isReferenceLocked ? "text-orange-900 font-medium" : "text-neutral-900"}`}>
                                            {selectedOption.label}
                                        </span>
                                    </div>
                                );
                            }
                            return (
                                <div className="flex items-center gap-3">
                                    <span className={`${isReferenceLocked ? "text-orange-900 font-medium" : "text-neutral-900"}`}>
                                        {formData.reference}
                                    </span>
                                </div>
                            );
                        })()
                    ) : (
                        <span className="text-neutral-400">Select an option</span>
                    )}
                    {isReferenceLocked ? (
                        <Lock className="w-4 h-4 text-orange-400" />
                    ) : (
                        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    )}
                </div>

                {isDropdownOpen && !isReferenceLocked && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                        {referenceOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.reference === option.value;
                            return (
                                <div
                                    key={option.value}
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, reference: option.value }));
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`px-4 py-2 flex items-center justify-between cursor-pointer transition-colors ${isSelected ? "bg-orange-50" : "hover:bg-orange-50"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-md ${option.bgColor}`}>
                                            <Icon className={`w-4 h-4 ${option.color}`} />
                                        </div>
                                        <span className={`${isSelected ? "font-medium text-neutral-900" : "text-neutral-700"}`}>
                                            {option.label}
                                        </span>
                                    </div>
                                    {isSelected && <Check className="w-4 h-4 text-orange-500" />}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Additional Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-none bg-white text-neutral-600 placeholder-neutral-400"
                    placeholder="Any specific features or use cases you'd like to discuss..."
                />
            </div>

            {/* reCAPTCHA */}
            <div>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    onChange={handleRecaptchaChange}
                />
                {recaptchaError && (
                    <p className="mt-2 text-sm text-red-600">{recaptchaError}</p>
                )}
            </div>

            {/* Error Message */}
            {status === "error" && (
                <div className="text-red-600 text-sm text-center">
                    Something went wrong. Please try again later.
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {status === "submitting" ? "Scheduling..." : "Schedule Demo"}
            </button>
        </form>
    );
}
