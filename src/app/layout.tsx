import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import FooterVideos from "@/components/FooterVideos";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { fetchStrapiData, STRAPI_URL } from "@/lib/strapi";
import ScrollToHashHandler from "@/components/util/ScrollToHashHandler";
import ScrollToTopOnRouteChange from "@/components/util/ScrollToTopOnRouteChange";
import ContactUs from "@/components/ContactUs";
import { isLocalHost } from "@/lib/commonFunction";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const globalData = await fetchStrapiData(
    "/global?populate[favicon][fields][0]=url"
  );

  console.log(process.env, "ENVS");

  const faviconUrl =
    globalData?.favicon?.url &&
    !process.env.NEXT_PUBLIC_STRAPI_URL?.includes("localhost")
      ? `${globalData.favicon.url}`
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${globalData?.favicon?.url}`;

  return {
    title:
      globalData?.metaTitle || globalData?.siteTitle || "Datayaan Solutions",
    description:
      globalData?.metaDescription ||
      "AI-driven, cutting-edge solutions across Healthcare, Logistics, Data Analytics, IoT, and Business Management.",
    icons: faviconUrl
      ? [
          {
            rel: "icon",
            url: faviconUrl,
          },
        ]
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch global content, home page data, products, and domains
  const [globalData, homeData, productsData, domainsData] = await Promise.all([
    fetchStrapiData(
      "/global?populate[navbarLinks][populate]=dropdown&populate[companyLogo][fields][0]=url&populate[favicon][fields][0]=url&populate[footerVideos]=*"
    ),
    fetchStrapiData("/home-page"),
    fetchStrapiData("/products?fields[0]=name&fields[1]=slug"),
    fetchStrapiData("/domains?fields[0]=name&fields[1]=slug"),
  ]);

  const {
    themeColor,
    navbarLinks,
    navbarCtaText,
    navbarCtaLink,
    siteBackgroundColor,
    siteTitle,
    companyLogo,
    favicon,
    footerVideos,
  } = globalData || {};

  // Get company logo URLs using centralized STRAPI_URL
  const companyLogoUrl = isLocalHost
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${companyLogo.url}`
    : companyLogo?.url;

  const faviconUrl = favicon?.url ? `${favicon.url}` : undefined;

  // Dynamically update "Product" dropdown with actual products
  if (navbarLinks && productsData && Array.isArray(productsData)) {
    const productLink = navbarLinks.find(
      (link: any) => link.label === "Product" || link.label === "Products"
    );
    if (productLink) {
      productLink.dropdown = productsData.map((product: any) => ({
        label: product.name,
        href: `/products/${product.slug}`,
      }));
    }
  }

  // Dynamically update "Domains" dropdown with actual domains
  if (navbarLinks && domainsData && Array.isArray(domainsData)) {
    const domainLink = navbarLinks.find(
      (link: any) => link.label === "Domains" || link.label === "Domain"
    );
    if (domainLink) {
      domainLink.dropdown = domainsData.map((domain: any) => ({
        label: domain.name,
        href: `/case-studies?domain=${encodeURIComponent(domain.name)}`,
      }));
    }
  }

  // Inject "Company" menu items
  if (navbarLinks) {
    const companyLinkIndex = navbarLinks.findIndex(
      (link: any) => link.label === "Company"
    );
    const leadershipItem = { label: "Leadership", href: "/company/leadership" };
    const aboutItem = { label: "About Us", href: "/company/about-us" };

    if (companyLinkIndex === -1) {
      // Add Company menu if it doesn't exist
      navbarLinks.push({
        label: "Company",
        href: "#",
        isDropDown: true,
        dropdown: [aboutItem, leadershipItem],
      });
    } else {
      // Add items to existing Company menu
      const companyLink = navbarLinks[companyLinkIndex];
      if (!companyLink.dropdown) {
        companyLink.dropdown = [];
        companyLink.isDropDown = true;
      }

      // Check if items already exist to avoid duplicates
      const leadershipExists = companyLink.dropdown.some(
        (item: any) => item.label === "Leadership"
      );
      const aboutExists = companyLink.dropdown.some(
        (item: any) => item.label === "About Us"
      );

      if (!aboutExists) {
        // Add About Us at the beginning
        companyLink.dropdown.unshift(aboutItem);
      }
      if (!leadershipExists) {
        companyLink.dropdown.push(leadershipItem);
      }
    }
  }

  const {
    contactSectionTitle,
    contactSectionDescription,
    contactEmail,
    contactPhone,
    contactAddress,
    socialInstagram,
    socialLinkedIn,
    socialFacebook,
  } = homeData || {};

  // Prepare domains for Contact Us section
  const domains: string[] = Array.isArray(domainsData)
    ? domainsData.map((d: any) => d.name).sort()
    : [];

  // Get font settings from CMS
  const headingFont = globalData?.headingFont || "Outfit";
  const bodyFont = globalData?.bodyFont || "Outfit";

  // Convert font names to Google Fonts URL format
  const formatFontName = (font: string) => font.replace(/\s+/g, "+");
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${formatFontName(
    headingFont
  )}:wght@400;500;600;700;800;900&family=${formatFontName(
    bodyFont
  )}:wght@300;400;500;600&display=swap`;

  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={googleFontsUrl} rel="stylesheet" />

        {/* Theme Color and Fonts */}
        {(themeColor || headingFont || bodyFont) && (
          <style>{`
            :root {
              ${themeColor ? `--primary: ${themeColor} !important;` : ""}
              --font-heading: '${headingFont}', sans-serif;
              --font-body: '${bodyFont}', sans-serif;
            }
            
            /* Apply fonts */
            body {
              font-family: var(--font-body);
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: var(--font-heading);
            }
          `}</style>
        )}
      </head>

      <body
        className="font-sans antialiased min-h-screen flex flex-col"
        style={{
          backgroundColor: siteBackgroundColor || "#ffffff",
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
            `,
          }}
        />
        {/* <ScrollToTopOnRouteChange /> */}
        <ScrollToHashHandler />
        <Navbar
          links={navbarLinks}
          ctaText={navbarCtaText}
          ctaLink={navbarCtaLink}
          siteTitle={siteTitle}
          companyLogo={companyLogoUrl}
        />
        <Suspense>
          <main className="flex-grow">{children}</main>
        </Suspense>

        <FooterVideos videos={footerVideos} />

        <Footer />

        <ScrollToTop />
      </body>
    </html>
  );
}
