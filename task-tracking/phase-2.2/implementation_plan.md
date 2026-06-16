# Phase 2.2 - Reusable UI Components (Part 1) Implementation

This plan details the implementation of foundational, highly reusable UI components (`Button`, `Input`, and `Card`) for the frontend. These components will follow strict Vanilla CSS styling and accessibility best practices.

## Proposed Changes

### Component Architecture

All components will be created inside a new `src/components/ui/` directory. Each component will have an accompanying Vanilla CSS file.

#### [NEW] [Button.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Button.tsx) & [Button.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Button.css)
- Build a highly accessible `<button>` wrapper.
- **Props**: `variant` (primary, secondary, outline, ghost), `size` (sm, md, lg), `isLoading` (boolean), `fullWidth` (boolean), and standard button HTML attributes.
- **Loading State**: When `isLoading` is true, the button will disable itself, show a spinner animation, and hide the child text.
- **Styling**: Leverage our CSS variables (`--color-primary`, `--radius-md`, `--transition-fast`) for smooth hover/active states.

#### [NEW] [Input.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Input.tsx) & [Input.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Input.css)
- Build a robust `<input>` wrapper.
- **Props**: `label`, `error` (string message), `helperText`, and standard input HTML attributes.
- **Accessibility**: Automatically generate and link an `id` between the `<label>` and the `<input>`, and use `aria-invalid` / `aria-describedby` when errors are passed.
- **Styling**: Sleek bordered design that highlights with `--color-primary` on focus, or `--color-error` if an error prop is provided.

#### [NEW] [Card.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Card.tsx) & [Card.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Card.css)
- Build a generic container component for structured data.
- **Structure**: Export compound components: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`. This allows maximum flexibility.
- **Styling**: Subtle border, `--shadow-md`, and `--radius-lg` by default, utilizing the `--color-surface` background so it adapts beautifully to Dark Mode.

## Verification Plan
1. Create a temporary `playground` or `components` route in `app/page.tsx` (or manually test them) to mount all variants of Button, Input, and Card.
2. Verify visual styling across both Light and Dark mode.
3. Validate accessibility properties (tab navigation, aria attributes on error states).
