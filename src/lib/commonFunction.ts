// Function to check whether running on localhost or not
// This checks if the Strapi URL includes 'localhost' to determine if we need to prepend the full URL
export const isLocalHost = process.env.NEXT_PUBLIC_STRAPI_URL?.includes('localhost') || false;