import BackButton from "@/components/ui/BackButton";
import { ReactNode } from "react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    badge?: string;
    backButtonPath?: string;
    backButtonLabel?: string;
    children?: ReactNode;
}

export default function PageHero({
    title,
    subtitle,
    badge,
    backButtonPath = "/",
    backButtonLabel = "Back",
    children
}: PageHeroProps) {
    return (
        <div className="bg-gradient-to-br from-primary to-primary/90 text-white py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Top Row: Back Button & Badge */}
                <div className="flex items-center gap-4 mb-6">
                    <BackButton
                        defaultPath={backButtonPath}
                        defaultLabel={backButtonLabel}
                        variant="circular"
                    />

                    {badge && (
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                            {badge}
                        </span>
                    )}
                </div>

                {/* Centered Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    {title}
                </h1>

                {/* Subtitle below the line */}
                {subtitle && (
                    <p className="text-xl text-white/90 text-center mb-6 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                )}

                {children}
            </div>
        </div>
    );
}
