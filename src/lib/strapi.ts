// src/lib/strapi.ts

import { isLocalHost } from "./commonFunction";

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;

/**
 * Fetch data from Strapi (supports Single Types & Collection Types)
 */
export async function fetchStrapiData(path: string) {
    try {
        const url = `${STRAPI_URL}/api${path}`;

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
            console.error("STRAPI FETCH ERROR:", url, res.status, res.statusText);
            return null;
        }

        const json = await res.json();

        if (!json?.data) {
            // console.error("INVALID STRAPI RESPONSE:", json);
            return null;
        }

        // Collection type returns array
        if (Array.isArray(json.data)) {
            return json.data;
        }

        // Single type → data = object (no attributes wrapper in v5)
        if (!json.data.attributes) {
            return json.data;
        }

        // Strapi v4 format with attributes
        return json.data.attributes;
    } catch (e) {
        console.error("STRAPI ERROR:", e);
        return null;
    }
}

/**
 * Post data to Strapi
 */
export async function postStrapiData(path: string, data: any) {
    try {
        const url = `${STRAPI_URL}/api${path}`;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data }),
        });

        if (!res.ok) {
            console.error("STRAPI POST ERROR:", url, res.status, res.statusText);
            return null;
        }

        const json = await res.json();
        return json;
    } catch (e) {
        console.error("STRAPI ERROR:", e);
        return null;
    }
}

/**
 * Post data to Strapi
 */
// export async function postStrapiData(path: string, data: any) {
//   try {
//     const url = `${STRAPI_URL}/api${path}`;

//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ data }),
//     });

//     if (!res.ok) {
//       console.error("STRAPI POST ERROR:", url, res.status, res.statusText);
//       return null;
//     }

//     const json = await res.json();
//     return json;
//   } catch (e) {
//     console.error("STRAPI ERROR:", e);
//     return null;
//   }
// }

/**
 * Convert Strapi media to a list of full URLs
 */
export function getMediaUrl(media: any): string[] {


    if (!media) return [];

    // If it's an array
    if (Array.isArray(media)) {
        return media.filter((m) => m?.url).map((m) => isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${m.url}` : `${m.url}`);
    }

    // If single media object
    if (media?.url) {
        return [isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.data.attributes.url}` : `${media.url}`];
    }

    // Strapi v5 nested format
    if (media?.data?.attributes?.url) {
        return [isLocalHost ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.data.attributes.url}` : `${media.data.attributes.url}`];
    }

    return [];
}

export async function getSolutions() {
    const data = await fetchStrapiData("/solutions?populate=*");
    return data || [];
}
