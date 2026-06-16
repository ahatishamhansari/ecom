# Code Changes Explanation - Phase 2.10 (Comprehensive SEO & Metadata)

## Objective
Implement advanced SEO techniques across the Next.js Storefront to improve search engine discoverability and rich snippet generation. This aligns with Phase 2.10 of the `PROMPT_SUBTASKS.md` requirements.

## Modifications & New Files

### 1. `frontend/src/app/sitemap.ts`
- Created dynamic sitemap generator.
- **Reason**: Automatically indexes the core pages (`/`, `/collections`, `/men`, `/women`) and dynamically fetches products from the NestJS backend to create an exhaustive XML sitemap for Google Search Console.

### 2. `frontend/src/app/robots.ts`
- Created a dynamic robots.txt file generator.
- **Reason**: Explicitly instructs search engine crawlers (e.g. Googlebot) on which paths to crawl (allowing the storefront) and which to ignore (disallowing `/admin` and `/checkout`), preventing sensitive or duplicated routes from being indexed.

### 3. `frontend/src/app/layout.tsx`
- Modified the global `Metadata` object.
- **Reason**: Injected the `metadataBase` property using environment variables so that all generated OpenGraph and Twitter card image URLs resolve to absolute URLs, which is required by social platform parsers. Added global `robots` directives to allow crawling.

### 4. `frontend/src/app/page.tsx`
- Injected `Organization` JSON-LD schema into the homepage using `next/script`.
- **Reason**: Helps search engines establish the brand entity ("StyleForge"), linking the official website to its social media profiles and primary logo for Knowledge Graph representation.

### 5. `frontend/src/app/products/[id]/page.tsx`
- Injected `Product` and `BreadcrumbList` JSON-LD schemas into the Product Detail Page.
- **Reason**: 
  - `Product` schema provides structured data about the item's name, description, image, and price, enabling rich snippets (like price and availability tags directly in Google Search results).
  - `BreadcrumbList` schema helps search engines understand the site's hierarchy and displays neat breadcrumb navigation in search results.

## Next Steps
This concludes Phase 2 (Premium Storefront). We have successfully implemented UI layouts, Cart, Checkout, and advanced SEO. The next phase will be **Phase 3 (Admin Dashboard)**.
