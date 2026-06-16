# StyleForge — Granular Subtasks for Single Prompt Execution

This document breaks down the remaining phases into granular, focused subtasks. Each subtask is designed to be small enough that it can be passed as a single prompt to an AI coding assistant and completed within one chat context.

---

## Phase 0 & 1 - Core Backend & Scaffolding (Mostly Complete)
*Note: Phase 0 and 1 are mostly marked as complete in the PROGRESS.md. If any CI/CD or design system globals are missing, use these prompts:*

- **0.1 Setup GitHub Actions:** "Create a GitHub Actions CI/CD pipeline for the NestJS backend and Next.js frontend to run linting, tests, and build on push to main."
- **0.2 Base Design System:** "Create a comprehensive CSS variables file in the Next.js frontend (`globals.css`) containing a modern, vibrant color palette, typography using Google Fonts (e.g., Inter), and basic animation utility classes."

---

## Phase 2 — Premium Storefront

- **2.1 Frontend Layout:** "Set up the global Next.js App Router layout (`app/layout.tsx`), including a responsive Navbar, Footer, and a dark/light mode theme provider. Ensure the layout uses strict Semantic HTML5 landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`) for accessibility and crawler parsing."
- **2.2 Reusable UI Components - Part 1:** "Build reusable, accessible React components using vanilla CSS for: Button, Input field, and Card. Ensure they support variants (primary, secondary) and loading states."
- **2.3 Reusable UI Components - Part 2:** "Build reusable, accessible React components using vanilla CSS for: Modal, Dropdown menu, and Toast notifications."
- **2.4 Homepage UI:** "Implement the Homepage UI (`app/page.tsx`) with a dynamic Hero section and a 'Featured Collections' grid. Use mock data for now. Implement static OpenGraph and Twitter Card metadata to ensure social sharing links unfurl correctly with a rich preview."
- **2.5 Product Listing Page (PLP) UI:** "Build the Product Listing Page with a sidebar for filters (category, price, size) and a main responsive grid for product cards. Implement Canonical URLs dynamically to prevent SEO duplicate content penalties caused by URL parameters in faceted search."
- **2.6 MeiliSearch Integration:** "Connect the Next.js PLP to the NestJS MeiliSearch endpoint. Implement client-side or server-side fetching so the filters and search bar update the product grid in real-time."
- **2.7 Product Detail Page (PDP):** "Implement the Product Detail Page. It should display a masonry image gallery using `next/image` with dynamically generated descriptive `alt` tags, product title, price, dynamic attributes selection (size, color), and an 'Add to Cart' button."
- **2.8 Cart State & Slide-out UI:** "Implement global cart state using Zustand or React Context. Build a Slide-out Cart (Drawer) component that lists items, quantities, and a checkout button."
- **2.9 Checkout Flow UI:** "Build a multi-step checkout flow (Shipping Address -> Payment Details -> Review). Integrate basic form validation."
- **2.10 Comprehensive SEO & Metadata:** "Implement comprehensive SEO measures: JSON-LD structured data (Product, BreadcrumbList, Organization) on the PDP, create dynamic `sitemap.ts` and `robots.txt` files, and configure dynamic `generateMetadata()` for all storefront routes to output Title, Description, and OpenGraph tags."

---

## Phase 3 — Admin Dashboard

- **3.1 Admin Layout & Auth:** "Create an `/admin` route group with a separate layout containing a sidebar navigation. Implement a login page and route protection using Next.js middleware checking for admin JWT."
- **3.2 Admin Dashboard Overview:** "Build the main admin dashboard page showing mock statistics cards (Total Sales, Active Users, Return Rate) and a recent orders table."
- **3.3 Product Management - List & Delete:** "Implement the Admin Product List page with a data table, search, pagination, and a delete action connected to the backend API."
- **3.4 Product Management - Create/Edit Form:** "Build a complex form for creating/editing products, including image uploads (Cloudinary integration) and dynamic attribute fields."
- **3.5 Category & Inventory:** "Implement admin pages to manage the category tree and adjust inventory levels per SKU."
- **3.6 UI Config Engine:** "Build an admin interface that allows updating the Homepage layout (e.g., changing hero text, selecting which collections to feature)."
- **3.7 Analytics Visualization:** "Integrate a charting library (like Recharts) to build a 'StylePulse' trend dashboard using mock data representing ClickHouse analytics."
- **3.8 Dynamic Entity Builder:** "Implement a flexible EAV (Entity-Attribute-Value) or JSONB schema system in PostgreSQL/NestJS that allows admins to define custom fields for products without database migrations."
- **3.9 ClickHouse Analytics Pipeline:** "Set up a NestJS service to batch and ingest user event data (clicks, views, purchases) into ClickHouse for high-performance querying."

---

## Phase 4 — AI Feature Pipeline

- **4.1 ML Service Setup:** "Initialize a Python FastAPI service in the monorepo (`/ml-service`). Set up the Dockerfile and basic health check endpoint."
- **4.2 YOLOv8 + CLIP Endpoint:** "In the FastAPI service, implement an endpoint that takes an image, runs YOLOv8 to detect fashion items, and generates CLIP embeddings for each cropped item."
- **4.3 Qdrant Integration:** "In the NestJS backend, implement a service to connect to Qdrant. Create endpoints to index product image embeddings and perform similarity searches based on vector inputs."
- **4.4 LensShop Frontend:** "Build a UI component in the Next.js app allowing users to upload a photo, which calls the YOLOv8+CLIP backend and displays similar products visually."
- **4.5 FitDNA API & Models:** "Implement the backend logic for FitDNA. Create PostgreSQL tables for user measurements and an endpoint that accepts basic inputs to calculate an estimated size profile."
- **4.6 Background Removal Job:** "Implement a BullMQ background job in NestJS that takes newly uploaded product images, calls an external background removal API (or local rembg script), and updates the Cloudinary URL."
- **4.7 Auto-SEO Content Engine:** "Create an admin button on the Product Edit page that calls a NestJS endpoint. Use the OpenAI GPT-4o API to generate an SEO-optimized product description, keyword-rich URL slugs, and highly descriptive `alt` text for product images based on the product's attributes."
- **4.8 SizeIntelligence Feedback Loop:** "Create an endpoint to capture user feedback on fit. Use this data to adjust the user's FitDNA profile and improve future size recommendations."

---

## Phase 5 — Advanced AI Features

- **5.1 ClosetAI - Upload & Catalog:** "Build a feature for users to upload photos of their own clothes. Process these through the ML service to tag attributes and save them to a `UserWardrobe` table in Postgres."
- **5.2 Outfit Completion Engine:** "Implement a recommendation algorithm (or LLM prompt) that takes a selected product and queries the `UserWardrobe` to suggest matching items to complete an outfit."
- **5.3 Occasion Pack Generator:** "Create an AI endpoint that accepts an occasion (e.g., 'Summer Wedding') and uses LLM + Vector Search to bundle 3-5 products together into a shoppable pack."
- **5.4 Virtual Try-On Hook:** "Integrate the Replicate API (IDM-VTON model). Build an endpoint where a user can select a product image and a photo of themselves to generate a try-on image."

---

## Phase 6 — SaaS Productization

- **6.1 Tenant Context Middleware:** "Refactor the NestJS backend to support multi-tenancy. Implement middleware that extracts a `tenant-id` from headers/domains and scopes database queries accordingly."
- **6.2 Theming Engine:** "Build a dynamic CSS injection system in Next.js that loads a specific color palette and typography based on the requested tenant's configuration."
- **6.3 API Keys:** "Create a system for admins to generate, revoke, and manage API keys for external integrations, secured via custom NestJS Guards."
- **6.4 Webhooks Setup:** "Implement a webhook dispatch system in NestJS to allow external apps to subscribe to events like `order.created` or `product.updated`."
- **6.5 Plugin Marketplace:** "Design an architecture for a modular plugin system. Build a basic interface in the Admin Dashboard where users can toggle external plugins."
