# Phase 2.7: Product Detail Page (PDP) UI Implementation

Implement the Product Detail Page (PDP) interface featuring a masonry image gallery, dynamic attribute selection (size, color), and an "Add to Cart" action.

## Proposed Changes

### Frontend Components

#### [NEW] [page.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/app/products/[id]/page.tsx)
- Create a dynamic route for the PDP at `/products/[id]`.
- **Image Gallery**: Implement a CSS Grid/Masonry layout for product images. Use `next/image` to ensure optimized loading and dynamically generate descriptive `alt` tags based on product context.
- **Product Details Area**: 
  - Render Product Title, Price, and Description using mock data.
  - Implement a **Size Selector** using interactive pills.
  - Implement a **Color Selector** using interactive color swatches.
  - Add an **Add to Cart** `<Button>` (UI only, state management will come in Phase 2.8).
- **SEO Integration**: Ensure `generateMetadata` exports dynamic OpenGraph and title tags based on the mock product data.

#### [NEW] [page.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/app/products/[id]/page.css)
- Implement layout styles for the split desktop view (Gallery on left, Details on right).
- Ensure the layout is responsive, stacking the details below the gallery on mobile screens.
- Add active state styles for size and color selectors.

## Verification Plan

### Manual Verification
- Start the Next.js development server (`npm run dev`).
- Navigate to `http://localhost:3000/products/1`.
- Verify the masonry image layout renders correctly and responsively.
- Verify the color swatches and size buttons can be toggled (UI state).
- Check the `<head>` of the page to confirm dynamic metadata (Title, OpenGraph) is correctly populated.
