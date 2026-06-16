# Subtask 3.9: ClickHouse Analytics Pipeline

## Objective
Set up a robust NestJS service to batch and ingest high-volume user event data (clicks, views, purchases, add_to_cart) into ClickHouse for high-performance querying and powering the StylePulse dashboard.

## Implementation Details

### 1. ClickHouse Client & Schema (`backend/src/modules/analytics/analytics.service.ts`)
- Added `@clickhouse/client` to the backend dependencies.
- Created `AnalyticsService` utilizing `onModuleInit` to gracefully bootstrap the ClickHouse connection using environment variables (with localhost defaults).
- **Schema Management**: Implemented `initSchema` which runs upon startup to ensure the highly-optimized `MergeTree()` table `user_events` exists in ClickHouse. The table is strategically ordered by `(event_type, timestamp)`.

### 2. High-Performance Batching
- Prevented network bottlenecks by implementing an in-memory batching queue inside `AnalyticsService`.
- Events are pushed to an array and flushed to ClickHouse in bulk via `JSONEachRow` either when the array size hits 100 or when a 5-second `setInterval` flusher triggers.
- Ensured `onModuleDestroy` flushes the final remaining batch before shutdown to prevent data loss.

### 3. Analytics Controller (`backend/src/modules/analytics/analytics.controller.ts`)
- **Ingestion Endpoint**: Created a public `POST /analytics/track` endpoint designed to rapidly accept streaming events from the Next.js frontend without blocking.
- **Query Endpoint**: Created a protected `GET /analytics/trending-products` endpoint (secured via `JwtAuthGuard` and `RolesGuard`) that queries ClickHouse to aggregate and return top viewed products over a given timeframe.

### 4. Progress Tracking
- Marked "Analytics (ClickHouse)" (Task 3.9) as completed in `PROGRESS.md`, concluding Phase 3 (Admin Dashboard).
