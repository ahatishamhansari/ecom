# Subtask 3.6: UI Config Engine

## Objective
Build an admin interface that allows updating the Storefront's Homepage layout dynamically, including changing hero text, managing the hero background image, selecting featured collections, and managing the announcement bar.

## Implementation Details

### 1. Storefront Config UI (`frontend/src/app/(admin)/config/page.tsx` & `.css`)
- **Hero Section Configuration**: Built a form section that controls the main `HeroTitle`, `HeroSubtitle`, and `HeroCta`. Added an image URL input with a live `image-preview` box.
- **Featured Collections Manager**: Implemented an interactive list showing "Featured Collections". Included simulated drag handles and "Remove" buttons to visually manage what appears on the homepage.
- **Announcement Bar**: Added a quick toggle and text input for a global announcement bar across the storefront.
- **Interactive States**: Managed the save state with an `isSaving` flag to present a "Publishing..." state when updating layout settings.

### 2. Styling
- Utilized CSS grid for a structured two-column layout (`config-grid`) ensuring forms and settings are well-spaced and easily navigable on desktop, while breaking down to a single column on mobile screens.
- Re-used global custom properties (e.g., `--color-surface`, `--shadow-sm`) to keep the admin interface aesthetically consistent.

### 3. Progress Tracking
- Updated `PROGRESS.md` to mark the "UI Config Engine" task under Phase 3 as completed.
