import Link from "next/link";

interface CTASectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export default function CTASection({
    title,
    description,
    buttonText,
    buttonLink,
}: CTASectionProps) {
    return (
        <div className="py-2 px-4 sm:px-6 lg:px-8 bg-neutral-50">
            <div className="mx-auto max-w-7xl">
                <div className="bg-orange-200 border border-neutral-200 rounded-2xl p-12 md:p-16 text-center shadow-sm hover:shadow-md transition-shadow">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <Link
                        href={buttonLink}
                        className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
