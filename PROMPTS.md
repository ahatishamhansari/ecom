# StyleForge — Sequential Implementation Prompts

> Use these prompts in successive sessions to implement each phase.
> Always check PROGRESS.md before starting a new session.

---

## How to Use This File

1. Open a new chat session.
2. Start by saying: **"Continue StyleForge implementation. Check PROGRESS.md"**
3. Then paste the prompt for the next phase below.

---

## Phase 2 Prompt (After Phase 0+1 are done)
```
Implement Phase 2 of StyleForge in /home/shan/shan/Projects/ecommerce.
Check PROGRESS.md to see what's done. Build:
- Premium Next.js storefront: Homepage (hero, featured collections, trending),
  Product Listing Page with filters, Product Detail Page with size guide.
- Full SEO: generateMetadata(), JSON-LD structured data, dynamic sitemap.ts.
- Cart UI and Checkout flow wired to NestJS API.
Use the existing design system in frontend/src/styles/. Update PROGRESS.md when done.
```

## Phase 3 Prompt (After Phase 2 is done)
```
Implement Phase 3 of StyleForge in /home/shan/shan/Projects/ecommerce.
Check PROGRESS.md. Build the Admin Dashboard:
- Protected /admin routes with role-based access (Admin role).
- Product CRUD, Category, Inventory management pages.
- Dynamic Entity Builder: admin can define custom schemas (like Airtable).
  Store in MongoDB. Auto-generate CRUD API for each entity.
- UI Config Engine: admin drags/toggles storefront sections (hero, banners, collections).
  Stored in MongoDB, read by Next.js homepage.
- StylePulse basic trend display (mock data OK for now).
Update PROGRESS.md when done.
```

## Phase 4 Prompt (After Phase 3 is done)
```
Implement Phase 4 of StyleForge in /home/shan/shan/Projects/ecommerce.
Check PROGRESS.md. Build ML/AI pipeline:
- Set up /ml-services directory with Python FastAPI microservices.
- LensShop: YOLOv8 fashion item detection + CLIP embedding + Qdrant similarity search.
  Expose as /api/search/visual endpoint in NestJS.
- FitDNA: body measurement form + MediaPipe-based proportions extraction.
  Store FitDNA profile per user in PostgreSQL.
- SizeIntelligence: post-order fit feedback form. Scikit-learn regression model.
- Background removal: rembg integration for product image upload pipeline.
- AI SEO writer: GPT-4o call to generate product description + meta on product save.
Update PROGRESS.md and Docker Compose with new ML services when done.
```

## Phase 5 Prompt (After Phase 4 is done)
```
Implement Phase 5 of StyleForge in /home/shan/shan/Projects/ecommerce.
Check PROGRESS.md. Build advanced AI features:
- ClosetAI: customer wardrobe upload page. MobileNet classifies each garment.
  Store wardrobe catalog in MongoDB per user.
- Outfit Completion: given a product, suggest complementary items from catalog
  that also match customer's existing wardrobe.
- Occasion Pack: customer enters occasion text → GPT-4o + catalog search
  → curated shopping list page.
Update PROGRESS.md when done.
```

## Phase 6 Prompt (After Phase 5 is done)
```
Implement Phase 6 of StyleForge in /home/shan/shan/Projects/ecommerce.
Check PROGRESS.md. Build SaaS/multi-tenant layer:
- Multi-tenant: add tenantId to all MongoDB collections and PostgreSQL tables.
  Each brand gets an isolated data namespace.
- White-label theming: store brand colors/fonts/logos in MongoDB tenantConfig.
  Next.js reads tenantConfig at build/request time and applies CSS variables.
- API key management: admin can generate/revoke API keys for external integrations.
- Write deployment guide to DEPLOYMENT.md.
Update PROGRESS.md when done.
```
