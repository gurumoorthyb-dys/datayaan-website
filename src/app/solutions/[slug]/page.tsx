import { fetchStrapiData, getMediaUrl, STRAPI_URL } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import BackButton from "@/components/ui/BackButton";

interface SolutionDetailProps {
  params: Promise<{ slug: string }>;
}

async function getSolution(slug: string) {
  const data = await fetchStrapiData(
    `/solutions?filters[slug][$eq]=${slug}&populate=*`
  );
  return data && data.length > 0 ? data[0] : null;
}

const benefitIcons = [Target, TrendingUp, Users, Zap, Shield, Clock];

export async function generateStaticParams() {
  const data = await fetchStrapiData("/solutions");
  const solutions = Array.isArray(data)
    ? data
    : data?.data
      ? Array.isArray(data.data)
        ? data.data
        : [data.data]
      : [];

  return solutions.map((solution: any) => ({
    slug: solution.slug,
  }));
}

export default async function SolutionDetailPage({
  params,
}: SolutionDetailProps) {
  const { slug } = await params;
  const solution = await getSolution(slug);

  if (!solution) {
    // Fallback for demo
    const demoSolutions: Record<string, any> = {
      "transport-logistics": {
        title: "Transport & Logistics",
        shortDescription:
          "Optimizing supply chains with AI-driven tracking and real-time visibility.",
        description:
          "Transform your supply chain operations with our comprehensive Transport & Logistics solution. Leveraging cutting-edge AI and real-time tracking technologies, we help you optimize routes, reduce costs, and improve delivery times while maintaining complete visibility across your entire logistics network.",
        features:
          "Real-time GPS tracking\nAI-powered route optimization\nAutomated dispatch management\nPredictive maintenance alerts\nCustomer delivery notifications\nAnalytics dashboard",
        highlights:
          "Reduce operational costs by up to 30%\nImprove on-time delivery rates to 98%+\nGain complete supply chain visibility\nEnhance customer satisfaction",
      },
      "travel-ticketing": {
        title: "Travel & Ticketing",
        shortDescription: "Seamless booking experiences for modern travelers.",
        description:
          "Revolutionize the travel booking experience with our advanced Travel & Ticketing platform. From airlines to hotels, our solution provides seamless integration, real-time availability, and intelligent pricing to help you serve modern travelers better.",
        features:
          "Multi-channel booking\nDynamic pricing engine\nReal-time inventory\nMobile-first design\nPayment gateway integration\nLoyalty program management",
        highlights:
          "Increase booking conversion by 40%\nReduce booking time by 60%\nSupport 50+ payment methods\n24/7 customer support",
      },
      healthcare: {
        title: "Healthcare",
        shortDescription: "Advanced digital solutions for patient care.",
        description:
          "Empower healthcare providers with our comprehensive digital health platform. From patient management to telemedicine, our solution streamlines operations, improves patient outcomes, and ensures regulatory compliance.",
        features:
          "Electronic health records\nTelemedicine platform\nAppointment scheduling\nPrescription management\nPatient portal\nCompliance tracking",
        highlights:
          "Improve patient satisfaction by 45%\nReduce administrative time by 50%\nHIPAA compliant\nIntegrate with existing systems",
      },
      bfsi: {
        title: "BFSI",
        shortDescription: "Secure and scalable financial technologies.",
        description:
          "Drive digital transformation in banking and financial services with our secure, scalable platform. From core banking to wealth management, we provide the technology infrastructure you need to compete in the digital age.",
        features:
          "Core banking system\nMobile banking app\nRisk management\nFraud detection\nRegulatory reporting\nCustomer analytics",
        highlights:
          "Process 10M+ transactions daily\nBank-grade security\nReduce fraud by 70%\nCompliant with global standards",
      },
      construction: {
        title: "Construction",
        shortDescription: "Smart management for complex infrastructure.",
        description:
          "Streamline construction project management with our intelligent platform. From planning to execution, track progress, manage resources, and ensure safety compliance across all your projects.",
        features:
          "Project planning tools\nResource allocation\nSafety compliance tracking\nProgress monitoring\nBudget management\nCollaboration platform",
        highlights:
          "Complete projects 20% faster\nReduce cost overruns by 35%\nImprove safety compliance\nReal-time project visibility",
      },
    };

    if (!demoSolutions[slug]) {
      return notFound();
    }

    // Use demo data
    const demoData = demoSolutions[slug];
    return renderSolutionPage(demoData, null, null, []);
  }

  // Get images from Strapi
  const heroImageUrls = getMediaUrl(solution.heroImage);
  const thumbnailUrls = getMediaUrl(solution.thumbnail);
  const imageUrls = getMediaUrl(solution.images);

  return renderSolutionPage(
    solution,
    heroImageUrls[0] || null,
    thumbnailUrls[0] || null,
    imageUrls || []
  );
}

function renderSolutionPage(
  data: any,
  heroImage: string | null,
  thumbnail: string | null,
  images: string[]
) {
  // Parse features into array
  const features = data.features
    ? data.features.split("\n").filter((f: string) => f.trim())
    : [
      "Advanced AI Integration",
      "Real-time Analytics",
      "Scalable Architecture",
      "24/7 Support",
      "Cloud-native Infrastructure",
      "Seamless Integration",
    ];

  // Parse highlights into array
  const highlights = data.highlights
    ? data.highlights.split("\n").filter((h: string) => h.trim())
    : [
      "Industry-leading performance",
      "Proven track record",
      "Expert support team",
      "Continuous innovation",
    ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <BackButton
            defaultPath="/#solutions"
            defaultLabel="Back to Solutions"
            variant="circular"
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Solution Overview
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                {data.title}
              </h1>

              <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                {data.shortDescription || data.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <button className="px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-900 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              {heroImage ? (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                  <Image
                    src={heroImage}
                    alt={data.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 shadow-2xl shadow-primary/10 flex items-center justify-center">
                  <Award
                    className="w-32 h-32 text-primary/20"
                    strokeWidth={1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-neutral-700 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Powerful <span className="text-primary">Features</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Everything you need to transform your operations and drive growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: string, index: number) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-neutral-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {feature}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Images Gallery */}
      {images && images.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Solution <span className="text-primary">Gallery</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <Image
                    src={img}
                    alt={`${data.title} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights/Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {thumbnail ? (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
                  <Image
                    src={thumbnail}
                    alt="Solution Benefits"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/10 via-primary/5 to-secondary/5 shadow-2xl shadow-primary/10 flex items-center justify-center">
                  <TrendingUp
                    className="w-32 h-32 text-primary/20"
                    strokeWidth={1}
                  />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Key <span className="text-primary">Benefits</span>
              </h2>
              <p className="text-lg text-neutral-600 mb-10">
                Discover the transformative impact our solution can have on your
                business
              </p>

              <div className="space-y-6">
                {highlights.map((highlight: string, index: number) => {
                  const Icon = benefitIcons[index % benefitIcons.length];
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-orange-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-3 rounded-xl bg-orange-50 shadow-sm">
                        <Icon
                          className="w-6 h-6 text-primary"
                          strokeWidth={2}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-neutral-900">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-orange-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Get in touch with our team to learn how {data.title} can drive
            growth and efficiency for your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
