# StyleForge Backend Architecture

This document explains every module and component of the NestJS backend architecture for the StyleForge platform.

## Database Strategy
We use a **Polyglot Persistence** strategy:
- **PostgreSQL (via Prisma)**: For relational, strictly structured, ACID-compliant data (Users, Orders, Inventory, Payments, FitDNA).
- **MongoDB (via Mongoose)**: For flexible, document-based data (Product Catalog, Dynamic Entities, UI Configurations).

---

## Core Infrastructure

### 1. `PrismaModule` & `PrismaService`
- **Location**: `src/prisma/`
- **Purpose**: Provides a globally available connection to the PostgreSQL database. It handles connection pooling and exposes all Prisma models (User, Order, Inventory) to the rest of the application.

---

## Feature Modules

### 2. `AuthModule`
- **Location**: `src/modules/auth/`
- **Purpose**: Handles authentication and authorization.
- **Components**:
  - `AuthService`: Logic for registration, password hashing (bcrypt), login validation, and generating JWT access & refresh tokens.
  - `AuthController`: Exposes `/api/auth/register` and `/api/auth/login`.
  - `JwtStrategy`: Validates incoming JWT tokens from request headers and extracts the user payload.

### 3. `UsersModule`
- **Location**: `src/modules/users/`
- **Purpose**: Manages user profiles and roles.
- **Components**:
  - `UsersService`: CRUD operations on the `User` Prisma model. Handles role updates.
  - `UsersController`: Exposes `/api/users/me` for profile fetching/updating, and admin endpoints for managing all users.

### 4. `ProductsModule` (MongoDB)
- **Location**: `src/modules/products/`
- **Purpose**: Manages the core fashion catalog.
- **Components**:
  - `ProductSchema`: A highly flexible MongoDB schema supporting dynamic attributes (e.g., `{ sleeve: "long" }`), variants, and CLIP embeddings for visual search.
  - `ProductsService`: Handles complex filtering, sorting, pagination, and fetching featured/trending items.
  - `ProductsController`: Exposes public search/list endpoints and admin CRUD endpoints.

### 5. `CategoriesModule` (MongoDB)
- **Location**: `src/modules/categories/`
- **Purpose**: Manages the category hierarchy (e.g., Men -> Tops -> T-Shirts).
- **Components**:
  - `CategorySchema`: Includes an `attributeSchema` property, allowing admins to define what custom fields apply to products in this category.
  - `CategoriesService`: Builds nested tree structures for frontend navigation.

### 6. `CartModule` (PostgreSQL)
- **Location**: `src/modules/cart/`
- **Purpose**: Manages persistent shopping carts.
- **Components**:
  - `CartService`: Upserts, increments, or deletes items from a user's cart in the database. Cross-device syncing.

### 7. `InventoryModule` (PostgreSQL)
- **Location**: `src/modules/inventory/`
- **Purpose**: Strict stock control to prevent overselling.
- **Components**:
  - `InventoryService`: Implements atomic `reserve()`, `confirm()`, and `release()` methods. When an order is placed, stock is *reserved*. If cancelled, it is *released*.

### 8. `OrdersModule` (PostgreSQL)
- **Location**: `src/modules/orders/`
- **Purpose**: Manages the checkout and order lifecycle.
- **Components**:
  - `OrdersService`: Uses Prisma `$transaction` to atomically create an order, reserve inventory (via `InventoryModule`), and clear the cart in one fail-safe operation.

### 9. `SearchModule` (Meilisearch)
- **Location**: `src/modules/search/`
- **Purpose**: Provides blazing-fast, typo-tolerant full-text search.
- **Components**:
  - `SearchService`: Syncs MongoDB products into Meilisearch. Handles search queries and falls back to MongoDB text search if Meilisearch is down.

### 10. `FitDnaModule` (PostgreSQL)
- **Location**: `src/modules/fit-dna/`
- **Purpose**: Manages the biometric fit profiles of users.
- **Components**:
  - `FitDnaService`: Stores body measurements. Contains the `recommendSize` logic that maps user measurements against garment specs to suggest the perfect fit. (Will integrate with ML models in Phase 4).

### 11. `DynamicEntityModule` (MongoDB)
- **Location**: `src/modules/dynamic-entity/`
- **Purpose**: The "Create Tables" feature for admins.
- **Components**:
  - `DynamicEntitySchema`: Stores the schema definition AND the row data for custom admin-created tables (e.g., Lookbooks, Campaign data).
  - `DynamicEntityService`: A mini-CMS within the app, allowing dynamic CRUD operations on tables that don't exist in code.

### 12. `UiConfigModule` (MongoDB)
- **Location**: `src/modules/ui-config/`
- **Purpose**: Storefront layout management.
- **Components**:
  - `UiConfigService`: Stores JSON configurations dictating which sections (Hero, Featured, Newsletter) appear on the frontend homepage and in what order.

---

## Global Guards & Decorators
- `JwtAuthGuard`: Protects routes, ensuring a valid JWT is present.
- `RolesGuard`: Ensures the user has the required role (e.g., `ADMIN`) to access a route.
- `@CurrentUser()`: Extracts the user object from the request.
