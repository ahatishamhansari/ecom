# Phase 2.6: MeiliSearch Integration (PLP)

Connect the Next.js Product Listing Page (PLP) to the NestJS backend's `/search` endpoint (which is powered by MeiliSearch) to enable real-time filtering and searching.

## Proposed Changes

### Frontend Components

#### [NEW] [CollectionsClient.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/app/collections/CollectionsClient.tsx)
- Create a new Client Component (`"use client"`) to manage the state of the PLP.
- **State Management**: Implement React state for search query, selected categories, price range, and sizes.
- **Data Fetching**: Use a `useEffect` hook (or SWR) to fetch data from the NestJS backend (`http://localhost:3001/search`) whenever the filter state changes.
- **Graceful Fallback**: If the API call fails (e.g., the backend is not running or MeiliSearch isn't fully populated), the component will gracefully fall back to the `MOCK_PRODUCTS` array so the UI remains testable and visually intact.
- **Real-time Updates**: Bind the sidebar input elements (checkboxes, inputs, buttons) to the state so that the product grid updates dynamically without a full page reload.

#### [MODIFY] [page.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/app/collections/page.tsx)
- Keep this as a Server Component to preserve the `generateMetadata` function (SEO canonical URLs).
- Refactor the return statement to render the new `<CollectionsClient />` component, passing down any initial server-fetched data if necessary (or just relying on client-side fetching).

## Verification Plan

### Manual Verification
- Start both the frontend (`npm run dev`) and backend (`npm run start:dev`) servers.
- Navigate to `http://localhost:3000/collections`.
- Interact with the sidebar filters (Category, Price, Size) and observe if network requests are made to the `/search` endpoint.
- Verify that if the backend is down, the UI still renders the mock products gracefully without crashing.
