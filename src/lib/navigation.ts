/**
 * Navigation utility functions for creating smart back navigation links
 */

interface CreateBackLinkParams {
    /** The target path to navigate to */
    targetPath: string;
    /** The current page type (e.g., 'products', 'blog', 'case-studies') */
    fromType?: string;
    /** The full path to return to (optional, for more specific navigation) */
    returnPath?: string;
    /** Custom label for the back button (optional) */
    returnLabel?: string;
}

/**
 * Creates a URL with smart back navigation query parameters
 * 
 * @example
 * // Simple listing to detail navigation
 * createBackLink({
 *   targetPath: `/products/${productSlug}`,
 *   fromType: 'products'
 * })
 * // Returns: /products/my-product?from=products
 * 
 * @example
 * // Specific page to detail navigation
 * createBackLink({
 *   targetPath: `/case-studies/${caseStudySlug}`,
 *   fromType: 'product',
 *   returnPath: `/products/${productSlug}`,
 *   returnLabel: 'Back to Product'
 * })
 * // Returns: /case-studies/my-case?from=product&returnPath=/products/my-product&returnLabel=Back to Product
 */
export function createBackLink({
    targetPath,
    fromType,
    returnPath,
    returnLabel
}: CreateBackLinkParams): string {
    const params = new URLSearchParams();

    if (fromType) {
        params.set('from', fromType);
    }

    if (returnPath) {
        params.set('returnPath', returnPath);
    }

    if (returnLabel) {
        params.set('returnLabel', returnLabel);
    }

    const queryString = params.toString();
    return queryString ? `${targetPath}?${queryString}` : targetPath;
}

/**
 * Creates a back link for navigation from a listing page to a detail page
 * 
 * @example
 * createListingBackLink('/products/my-product', 'products')
 * // Returns: /products/my-product?from=products
 */
export function createListingBackLink(targetPath: string, listingType: string): string {
    return createBackLink({ targetPath, fromType: listingType });
}

/**
 * Creates a back link for navigation from a detail page to another detail page
 * 
 * @example
 * createDetailBackLink({
 *   targetPath: '/case-studies/my-case',
 *   currentPageType: 'product',
 *   currentPagePath: '/products/my-product'
 * })
 * // Returns: /case-studies/my-case?from=product&returnPath=/products/my-product
 */
export function createDetailBackLink({
    targetPath,
    currentPageType,
    currentPagePath,
    customLabel
}: {
    targetPath: string;
    currentPageType: string;
    currentPagePath: string;
    customLabel?: string;
}): string {
    return createBackLink({
        targetPath,
        fromType: currentPageType,
        returnPath: currentPagePath,
        returnLabel: customLabel
    });
}
