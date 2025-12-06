import { Hero } from "@/components/sections/Hero";
import { TrustedOutcomes } from "@/components/sections/TrustedOutcomes";
import { TrustSection } from "@/components/sections/TrustSection";
import { Products } from "@/components/sections/Products";
import { TechnologyPartners } from "@/components/sections/TechnologyPartners";
// import { Solutions } from "@/components/Solutions"; // Temporarily disabled - add Solutions content in Strapi first

import { fetchStrapiData, getMediaUrl, STRAPI_URL } from "@/lib/strapi";
import { isLocalHost } from "@/lib/commonFunction";

export default async function Home() {
  const homeData = await fetchStrapiData(
    "/home-page?populate[heroBackgroundImages][fields][0]=url&populate[clientLogos][fields][0]=url&populate[products][populate][0]=icon&populate[products][populate][1]=image&populate[techPartnerLogos][fields][0]=url&populate[testimonials][populate][0]=customerPhoto"
  );

  // Fetch global data for navbar domains
  const globalData = await fetchStrapiData(
    "/global?populate[navbarLinks][populate]=dropdown"
  );

  const {
    heroHeadline,
    heroSubheadline,
    heroButtonText,
    heroButtonLink,
    heroSecondaryButtonText,
    heroSecondaryButtonLink,
    heroBackgroundColor,
    heroBackgroundImages,
    clientsTitle,
    clientLogos,
    products,
    contactSectionTitle,
    contactSectionDescription,
    contactEmail,
    contactPhone,
    contactAddress,
    socialInstagram,
    socialLinkedIn,
    socialFacebook,
    statsProjectsCount,
    statsEmployeesCount,
    statsCountriesCount,
    statsSupportText,
    testimonialsTitle,
    testimonialsSubtitle,
    testimonials,
  } = homeData || {};

  // Convert media fields properly
  const backgroundImages = getMediaUrl(heroBackgroundImages) || [];
  const clientLogoUrls = getMediaUrl(clientLogos) || [];
  const technologyPartnerUrls = getMediaUrl(homeData?.techPartnerLogos) || [];

  const processedProducts =
    products?.map((p: any) => {
      // Strapi v5: images are in p.image array directly
      const images = Array.isArray(p.image)
        ? p.image.map((img: any) => ({ url: isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}` : `${img.url}` }))
        : [];

      // Icon is a single object
      const icon = p.icon?.url ? { url: isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${p.icon.url}` : `${p.icon.url}` } : null;

      return {
        ...p,
        images,
        icon,
      };
    }) || [];

  // Process testimonials data
  const processedTestimonials = testimonials?.map((t: any) => ({
    ...t,
    customerPhoto: t.customerPhoto?.url ? { url: isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${t.customerPhoto.url}` : `${t.customerPhoto.url}` } : undefined,
  })) || [];

  // Extract domains from navbar dropdown
  const domains: string[] = [];
  if (globalData?.navbarLinks) {
    globalData.navbarLinks.forEach((link: any) => {
      if (link.isDropDown && link.dropdown) {
        link.dropdown.forEach((item: any) => {
          if (item.label) {
            domains.push(item.label);
          }
        });
      }
    });
  }

  return (
    <div className="flex flex-col">
      <Hero
        headline={heroHeadline}
        subheadline={heroSubheadline}
        buttonText={heroButtonText}
        buttonLink={heroButtonLink}
        secondaryButtonText={heroSecondaryButtonText}
        secondaryButtonLink={heroSecondaryButtonLink}
        backgroundColor={heroBackgroundColor}
        backgroundImages={backgroundImages}
      />
      <TrustedOutcomes
        projectsCount={statsProjectsCount}
        employeesCount={statsEmployeesCount}
        countriesCount={statsCountriesCount}
      />
      <Products products={processedProducts} />
      {/* <Solutions /> */}
      <TechnologyPartners logos={technologyPartnerUrls} />
      <TrustSection
        clientsTitle={clientsTitle}
        clientLogos={clientLogoUrls}
        testimonialsTitle={testimonialsTitle}
        testimonialsSubtitle={testimonialsSubtitle}
        testimonials={processedTestimonials}
      />

    </div>
  );
}
