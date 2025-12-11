import React, { Suspense } from "react";
import Image from "next/image";
import { fetchStrapiISR, getMediaUrl } from "@/lib/strapi";
import PageHero from "@/components/ui/PageHero";

export default async function LeadershipPage() {
  const [pageData, leadersData] = await Promise.all([
    fetchStrapiISR("/leadership-page", 1800),
    fetchStrapiISR("/leaders?populate=*&sort=order:asc", 1800),
  ]);

  const { title, description } = pageData || {};
  const leaders = Array.isArray(leadersData) ? leadersData : [];

  return (
    <Suspense>
      <div className="min-h-screen bg-neutral-light">
        {/* Page Header */}
        {/* <div className="relative bg-neutral-dark py-20 sm:py-28 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-secondary/10 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {title || "Leadership Team"}
                    </h1>
                    <p className="mt-6 text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                        {description || "Meet the visionaries behind Datayaan Solutions, driving innovation and excellence across industries."}
                    </p>
                </div>
            </div> */}

        <PageHero
          title={title}
          subtitle={description}
          backButtonLabel="Back"
          backButtonPath="/"
          backgroundImage="/leadership-hero.png"
        />

        {/* Content Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 -mt-16 relative z-10">
          <div className="space-y-12">
            {leaders.map((leader: any, index: number) => {
              const imageUrl =
                getMediaUrl(leader.image)[0] || "/images/placeholder.png";
              // Split bio by double newline to create paragraphs if it's a string
              const bioParagraphs =
                typeof leader.bio === "string"
                  ? leader.bio
                      .split("\n\n")
                      .filter((p: string) => p.trim().length > 0)
                  : [];

              return (
                <div
                  key={leader.id || index}
                  className="group flex flex-col lg:flex-row overflow-hidden rounded-2xl bg-white shadow-xl border border-neutral-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Section */}

                  {index === 0 ? (
                    <>
                      {" "}
                      <div className="relative w-full lg:w-1/3 min-h-[400px] lg:min-h-full bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-end justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
                        <Image
                          src={imageUrl}
                          alt={leader.name}
                          fill
                          className="object-contain object-bottom p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-neutral-dark group-hover:text-primary transition-colors duration-300">
                            {leader.name}
                          </h3>
                          <div className="mt-2 inline-block rounded-full bg-primary/10 px-4 py-1.5">
                            <p className="text-sm font-semibold text-primary tracking-wide uppercase">
                              {leader.title}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {bioParagraphs.map(
                            (paragraph: string, idx: number) => (
                              <p
                                key={idx}
                                className="text-base leading-relaxed text-text-secondary text-justify"
                              >
                                {paragraph}
                              </p>
                            )
                          )}
                        </div>

                        {/* Decorative Element */}
                        <div className="mt-8 h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-50 group-hover:w-32 transition-all duration-500" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-neutral-dark group-hover:text-primary transition-colors duration-300">
                            {leader.name}
                          </h3>
                          <div className="mt-2 inline-block rounded-full bg-primary/10 px-4 py-1.5">
                            <p className="text-sm font-semibold text-primary tracking-wide uppercase">
                              {leader.title}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {bioParagraphs.map(
                            (paragraph: string, idx: number) => (
                              <p
                                key={idx}
                                className="text-base leading-relaxed text-text-secondary text-justify"
                              >
                                {paragraph}
                              </p>
                            )
                          )}
                        </div>

                        {/* Decorative Element */}
                        <div className="mt-8 h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full opacity-50 group-hover:w-32 transition-all duration-500" />
                      </div>
                      <div className="relative w-full lg:w-1/3 min-h-[400px] lg:min-h-full bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-end justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
                        <Image
                          src={imageUrl}
                          alt={leader.name}
                          fill
                          className="object-contain object-bottom p-4 transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
