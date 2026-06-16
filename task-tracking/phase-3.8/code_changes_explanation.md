# Subtask 3.8: Dynamic Entity Builder

## Objective
Implement a flexible EAV (Entity-Attribute-Value) or JSONB schema system in PostgreSQL via NestJS to allow administrators to define custom fields for products (or any other entity) without requiring database migrations.

## Implementation Details

### 1. PostgreSQL Schema Updates (`backend/prisma/schema.prisma`)
- Defined a `DynamicEntity` model representing the schema configurations (e.g., entity key "PRODUCT"). It contains a `fieldSchema` JSON column defining the custom fields (type, required status).
- Defined a `DynamicEntityRow` model to hold the actual EAV data values. It uses a `rowData` JSON column connected to a `DynamicEntity` via a foreign key, allowing dynamic scaling.

### 2. NestJS Service Refactor (`backend/src/modules/dynamic-entity/`)
- **Module Update**: Transitioned `DynamicEntityModule` away from MongoDB (`MongooseModule`) to use `PrismaModule` strictly, fulfilling the PostgreSQL requirement.
- **Service Rewrite**: Completely rewrote `DynamicEntityService` to execute queries via `PrismaService`.
  - Used `createEntity` and `updateSchema` to allow admins to manage JSON blueprints.
  - Used `addRow`, `updateRow`, and `deleteRow` to manage the actual JSON payloads attached to these entities.
- Removed the old Mongoose `schemas/dynamic-entity.schema.ts` file to keep the backend clean and explicitly typed via Prisma.
- Regenerated the Prisma Client successfully.

### 3. Progress Tracking
- Marked "Dynamic Entity Builder" (Task 3.8) as completed in `PROGRESS.md`.
