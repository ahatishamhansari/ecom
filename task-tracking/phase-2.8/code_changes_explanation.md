# Code Changes Explanation - Phase 2.8 (Cart & Checkout Flow)

## Objective
Implement the Cart and Checkout flow for the StyleForge storefront, integrating with the backend NestJS `/cart` and `/orders` API endpoints. Since the backend endpoints require authentication, a lightweight frontend authentication flow (Login/Register) was introduced alongside the cart components to ensure seamless functionality.

## Modifications & New Files

### 1. `backend/src/modules/products/products.controller.ts`
- Added `@Get('batch') findByIds` endpoint.
- **Reason**: The backend cart returns cart items containing `productId` and `variantId` (MongoDB object IDs). We needed an endpoint to batch hydrate product details (names, prices, images) into the cart items on the frontend.

### 2. `frontend/src/lib/api.ts`
- Created centralized `fetchApi` utility.
- **Reason**: To automatically retrieve the JWT token from `localStorage` and inject it as a `Bearer` token in the `Authorization` header for all requests going to the backend API (`http://localhost:3001`).

### 3. `frontend/src/components/providers/AuthProvider.tsx`
- Added `AuthContext` and `AuthProvider`.
- **Reason**: To manage the authenticated state in the frontend, persisting the JWT token in `localStorage`, and providing methods to `login`, `register`, and `logout`.

### 4. `frontend/src/components/providers/CartProvider.tsx`
- Added `CartContext` and `CartProvider`.
- **Reason**: Manages the cart state (`items`, `subtotal`, `itemCount`) and synchronizes it with the backend via `/cart` endpoints. Hydrates product details using the new `/products/batch` endpoint.

### 5. `frontend/src/components/auth/AuthModal.tsx` & `.css`
- Created a slide-over/modal for login and registration.
- **Reason**: Allows users to quickly log in or register from the storefront without needing to navigate away to a dedicated auth page.

### 6. `frontend/src/components/cart/CartDrawer.tsx` & `.css`
- Implemented a slide-out cart drawer.
- **Reason**: Provides a premium, non-obtrusive UI for users to view items, adjust quantities, and proceed to checkout. 

### 7. `frontend/src/components/layout/Navbar.tsx` & `.css`
- Updated Navbar to include Auth and Cart buttons.
- **Reason**: Integrates the `useAuth` and `useCart` contexts to display current user name, login/logout toggle, and cart item count badge.

### 8. `frontend/src/app/layout.tsx`
- Wrapped the application in `<AuthProvider>` and `<CartProvider>`.
- **Reason**: To ensure global availability of the authentication and cart states across the storefront.

### 9. `frontend/src/app/(store)/checkout/page.tsx` & `.css`
- Created the Checkout page form.
- **Reason**: Captures the shipping address, displays the order summary with calculated totals (subtotal, shipping, tax), and submits the final payload to the backend `POST /orders` endpoint.

### 10. `frontend/src/app/(store)/orders/[id]/page.tsx` & `.css`
- Created the Order Success / Details page.
- **Reason**: Displays the final confirmation of an order after a successful checkout, showing order status, items, and total amount.

## Dependencies & Design Patterns
- Used standard Next.js 14 App Router conventions.
- Kept UI state (Drawer, Modal) controlled via Context.
- Styled using global design tokens (`var(--bg-primary)`, `var(--accent-color)`) mapped in `globals.css`.

## Next Steps
- Implement frontend UI logic to add products to the cart directly from the Product Detail Page (PDP) using `addToCart()`.
- Add SEO JSON-LD structure or sitemaps for the remainder of Phase 2 items.
