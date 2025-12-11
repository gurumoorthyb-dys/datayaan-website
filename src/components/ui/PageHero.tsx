import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  backButtonPath?: string;
  backButtonLabel?: string;
  backgroundImage?: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  badge,
  backButtonPath = "/",
  backButtonLabel = "Back",
  backgroundImage,
  children,
}: PageHeroProps) {
  return (
    <div
      className={`relative text-white py-8 overflow-hidden ${
        !backgroundImage ? "bg-gradient-to-br from-primary to-primary/90" : ""
      }`}
    >
      {/* Background Image with Gray Gradient Overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Gray gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/60 via-neutral-800/50 to-neutral-700/40 z-0" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row: Back Button & Badge */}
        <div className="flex items-center gap-4 mb-6">
          {/* BackButton removed as per requirements */}

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
