# StyleForge Frontend Architecture

This document explains the architecture and components of the Next.js frontend.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Modules (Tailwind is intentionally omitted for premium, bespoke styling flexibility).
- **State Management**: React Context (for global UI states like Cart drawer) + Zustand (for complex client states like FitDNA onboarding).

---

## Directory Structure (`/src`)

### 1. `app/` (Routing & Pages)
The App Router utilizes nested layouts and server components.

- `app/(shop)/`: Public-facing storefront routes.
  - `page.tsx`: The dynamic homepage. Fetches JSON configuration from the backend `UiConfigModule` to render sections dynamically.
  - `products/page.tsx`: Product Listing Page (PLP). Server-side fetches products, handles search filters and pagination via URL query parameters for SEO.
  - `products/[slug]/page.tsx`: Product Detail Page (PDP). Generates dynamic SEO metadata (`generateMetadata`). Fetches product, variants, and reviews.
  - `cart/page.tsx`: Cart view.
  - `checkout/page.tsx`: Secure checkout flow.
- `app/(admin)/`: Protected admin routes.
  - `layout.tsx`: Includes the Admin Sidebar. Checks user role and redirects if not `ADMIN`.
  - `dashboard/page.tsx`: Metrics and charts.
  - `entities/page.tsx`: UI for the Dynamic Entity Builder (creates tables).

### 2. `components/` (Reusable UI)
Organized into domain-specific folders.

- `components/ui/`: Dumb, reusable base components.
  - `Button`, `Input`, `Select`, `Modal`, `Accordion`.
- `components/layout/`: Page structure.
  - `Navbar`, `Footer`, `Sidebar`, `CartDrawer`.
- `components/product/`:
  - `ProductCard`: The standard grid item showing image, title, price.
  - `ProductGallery`: Image carousel for the PDP.
  - `VariantSelector`: Handles selecting size/color and updates URL state.
- `components/dynamic/`:
  - `HeroBanner`, `FeaturedCarousel`, `PromoStrip`. These are mapped directly to the JSON payloads returned by the `UiConfigModule`.

### 3. `lib/` (Utilities & Hooks)
- `lib/api.ts`: Centralized fetch wrappers for calling the NestJS backend. Handles JWT token injection and refresh logic.
- `lib/hooks/`: Custom React hooks.
  - `useCart.ts`: Manages local cart state and syncs with backend.
  - `useAuth.ts`: Manages user session state.
- `lib/utils.ts`: Helper functions (currency formatting, classname merging).

### 4. `styles/` (Design System)
Because we are using Vanilla CSS, this directory is critical for maintaining consistency.

- `globals.css`: Contains CSS variables (Custom Properties) for:
  - Colors (`--color-primary`, `--color-background`)
  - Typography (`--font-sans`, `--text-xl`)
  - Spacing (`--spacing-4`)
  - Animations (`--transition-smooth`)
- `*.module.css`: Component-specific styles ensuring zero global scope collision.

---

## Key Data Flows

### 1. Dynamic Homepage Rendering
1. User requests `/`.
2. Next.js Server Component makes a `fetch` to `/api/ui-config/pages/homepage`.
3. Backend returns a JSON array of sections: `[{ type: 'hero_banner', config: {...} }, { type: 'featured', ... }]`.
4. The `page.tsx` maps over this array and dynamically imports/renders the corresponding component from `components/dynamic/`.
5. HTML is streamed to the browser for instant LCP (Largest Contentful Paint).

### 2. FitDNA Integration on Product Page
1. User visits `/products/blue-jacket`.
2. `ProductDetail` component loads.
3. Client-side `useEffect` calls `/api/fit-dna/recommend/blue-jacket`.
4. If user has a FitDNA profile, backend returns `{ recommendation: "M", confidence: 0.95 }`.
5. The `VariantSelector` component highlights the "M" size automatically with a badge: *"Perfect fit based on your profile"*.
