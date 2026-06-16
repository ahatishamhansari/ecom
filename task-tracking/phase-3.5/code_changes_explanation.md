# Subtask 3.5: Category & Inventory Management

## Objective
Implement dedicated admin pages to manage the product category tree structure and adjust inventory levels per SKU.

## Implementation Details

### 1. Category Management (`frontend/src/app/(admin)/categories/page.tsx` & `.css`)
- **Category Tree UI**: Built a hierarchical visual tree (with indentation and connector-like styles) to represent categories (e.g., Apparel -> T-Shirts). 
- **Interactive State**: Clicking on a node in the tree sets it as the "active" category and displays its details in the right-hand panel for quick editing.
- **Styling**: Utilized a two-panel flex layout, `page.css`, and global CSS variables to ensure a seamless fit into the admin design system. Added elegant glass/surface borders and `:hover` states.

### 2. Inventory Management (`frontend/src/app/(admin)/inventory/page.tsx` & `.css`)
- **Inventory Data Table**: Created a specialized table displaying SKU, Product Details, Stock Status, Current Stock, and a quick-action column.
- **Inline Stock Adjustments**: Built a controlled input (`adjustments` state) allowing admins to quickly bump up or decrement inventory. The "Update" button remains disabled unless a change is made.
- **Visual Stock Indicators**: Added pill badges (`status-ok`, `status-low`, `status-out`) that dynamically apply colors based on stock levels (green for > 20, yellow for > 0, red for 0).

### 3. Progress Tracking
- **Updated `PROGRESS.md`**: Marked both "Category management" and "Inventory management" as completed under Phase 3.5.
