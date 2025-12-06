# Smart Back Navigation - Developer Guide

## Overview
This guide explains how to implement smart back navigation for any page in your application. The system uses query parameters to track where users came from and navigate them back to the correct page.

## Quick Start

### 1. Add BackButton to Your Page

```tsx
import BackButton from '@/components/ui/BackButton';

export default function MyDetailPage() {
    return (
        <div>
            <BackButton 
                defaultPath="/my-listing"
                defaultLabel="Back to Listing"
            />
            {/* Your page content */}
        </div>
    );
}
```

### 2. Add Navigation Context to Links

When linking TO a detail page, add query parameters to track the origin:

#### Option A: Simple Listing → Detail Navigation

```tsx
import Link from 'next/link';

// In your listing page
<Link href={`/products/${slug}?from=products`}>
    View Product
</Link>
```

#### Option B: Using Helper Functions (Recommended)

```tsx
import { createListingBackLink } from '@/lib/navigation';

<Link href={createListingBackLink(`/products/${slug}`, 'products')}>
    View Product
</Link>
```

#### Option C: Detail → Detail Navigation

```tsx
import { createDetailBackLink } from '@/lib/navigation';

// From a product page to a case study
<Link href={createDetailBackLink({
    targetPath: `/case-studies/${caseStudySlug}`,
    currentPageType: 'product',
    currentPagePath: `/products/${productSlug}`
})}>
    View Case Study
</Link>
```

## Navigation Helper Functions

### `createBackLink()`
Most flexible function for creating back navigation links.

```tsx
import { createBackLink } from '@/lib/navigation';

const link = createBackLink({
    targetPath: '/target-page',
    fromType: 'source-type',      // Optional
    returnPath: '/return/path',    // Optional
    returnLabel: 'Custom Label'    // Optional
});
```

### `createListingBackLink()`
Shorthand for listing → detail navigation.

```tsx
import { createListingBackLink } from '@/lib/navigation';

// Navigate from blog listing to blog post
const link = createListingBackLink('/blog/my-post', 'blog');
// Returns: /blog/my-post?from=blog
```

### `createDetailBackLink()`
For detail → detail navigation.

```tsx
import { createDetailBackLink } from '@/lib/navigation';

const link = createDetailBackLink({
    targetPath: '/services/consulting',
    currentPageType: 'product',
    currentPagePath: '/products/my-product',
    customLabel: 'Back to My Product'  // Optional
});
```

## How It Works

### Query Parameters

The system uses three query parameters:

1. **`from`** - The type/category of the source page (e.g., 'products', 'blog')
2. **`returnPath`** - The exact path to return to (for specific navigation)
3. **`returnLabel`** - Custom label for the back button (optional)

### BackButton Priority Logic

The `BackButton` component determines the back path in this order:

1. **Explicit `returnPath`** - If provided, uses this exact path
2. **Legacy slug parameters** - Supports `productSlug` and `caseStudySlug` for backward compatibility
3. **Convention-based paths** - Maps common `from` values to paths:
   - `from=products` → `/products` (Back to Products)
   - `from=blog` → `/blog` (Back to Blog)
   - `from=services` → `/services` (Back to Services)
   - `from=home` → `/` (Back to Home)
4. **Generic fallback** - Converts any `from` value to a path (e.g., `from=my-page` → `/my-page`)
5. **Browser history** - Uses `router.back()` if no context is available

## Examples for Different Page Types

### Blog System

```tsx
// Blog listing page (app/blog/page.tsx)
import { createListingBackLink } from '@/lib/navigation';

<Link href={createListingBackLink(`/blog/${post.slug}`, 'blog')}>
    Read More
</Link>

// Blog detail page (app/blog/[slug]/page.tsx)
import BackButton from '@/components/ui/BackButton';

<BackButton 
    defaultPath="/blog"
    defaultLabel="Back to Blog"
/>
```

### Services Pages

```tsx
// Services listing (app/services/page.tsx)
<Link href={`/services/${service.slug}?from=services`}>
    Learn More
</Link>

// Service detail page (app/services/[slug]/page.tsx)
<BackButton 
    defaultPath="/services"
    defaultLabel="Back to Services"
/>
```

### Cross-Page Navigation

```tsx
// From a blog post to a related product
import { createDetailBackLink } from '@/lib/navigation';

<Link href={createDetailBackLink({
    targetPath: `/products/${productSlug}`,
    currentPageType: 'blog',
    currentPagePath: `/blog/${blogSlug}`,
    customLabel: 'Back to Blog Post'
})}>
    View Product
</Link>
```

## Adding New Page Types

To add support for a new page type:

1. **No code changes needed!** The system works automatically for any page type.

2. **Optional**: Add to the `pathMap` in `BackButton.tsx` for custom labels:

```tsx
const pathMap: Record<string, { path: string; label: string }> = {
    'products': { path: '/products', label: 'Back to Products' },
    'case-studies': { path: '/case-studies', label: 'Back to Case Studies' },
    'blog': { path: '/blog', label: 'Back to Blog' },
    'your-new-type': { path: '/your-path', label: 'Back to Your Page' }, // Add this
};
```

## Best Practices

1. **Always provide `defaultPath` and `defaultLabel`** to BackButton for fallback navigation
2. **Use helper functions** instead of manually constructing URLs
3. **Be consistent** with your `from` values (use lowercase, hyphenated names)
4. **Test navigation flows** when adding new page types
5. **Use `returnPath`** for specific detail-to-detail navigation

## Customization

### Custom Styling

```tsx
<BackButton 
    className="inline-flex items-center gap-2 text-white hover:text-gray-200"
    defaultPath="/home"
    defaultLabel="Go Back"
/>
```

### Custom Labels

```tsx
// Method 1: Via returnLabel parameter
<Link href={`/page?from=source&returnLabel=Custom Back Text`}>

// Method 2: Via helper function
createBackLink({
    targetPath: '/page',
    fromType: 'source',
    returnLabel: 'Custom Back Text'
})
```

## Troubleshooting

**Back button shows "Back" instead of specific label:**
- Ensure you're passing query parameters when linking to the page
- Check that the `from` value matches a key in `pathMap` or is a valid path segment

**Navigation goes to wrong page:**
- Verify the `returnPath` or `from` parameter is correct
- Check for typos in page type names

**Back button doesn't appear:**
- Ensure `BackButton` is imported and rendered on the page
- Check that it's a client component (has `'use client'` directive)
