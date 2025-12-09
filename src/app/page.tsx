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


  console.log(homeData, 'HOME DATA')
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
    statsProjectsCount,
    statsEmployeesCount,
    statsCountriesCount,
    statsSupportText,
    testimonialsTitle,
    testimonialsSubtitle,
    testimonials,
    themeColor
  } = homeData || {};

  console.log(testimonials, 'TETEETETET')

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

  // Get font setting from global data
  const { headingFont, bodyFont } = globalData || {};

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
        headingFont={headingFont}
        bodyFont={bodyFont}
      />
      <Products
        products={processedProducts}
        headingFont={headingFont}
        bodyFont={bodyFont}
        themeColor={themeColor}
      />
      <TrustedOutcomes
        projectsCount={statsProjectsCount}
        employeesCount={statsEmployeesCount}
        countriesCount={statsCountriesCount}
        supportText={statsSupportText}
        themeColor={themeColor}
        headingFont={headingFont}
      />
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
