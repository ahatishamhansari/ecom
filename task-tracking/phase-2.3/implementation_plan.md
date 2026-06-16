# Phase 2.3 - Reusable UI Components (Part 2) Implementation

This plan outlines the creation of complex interactive UI components (`Modal`, `Dropdown`, and `Toast`) for the StyleForge storefront, strictly using Vanilla CSS and native React features (no third-party unstyled component libraries like Radix or Headless UI).

## Proposed Changes

### Component Architecture

All components will be created inside the `src/components/ui/` directory.

#### [NEW] [Modal.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Modal.tsx) & [Modal.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Modal.css)
- Build an accessible modal dialog.
- **Features**: Will use a semi-transparent backdrop (`.glass-effect` overlay). Clicking the backdrop or pressing the `Escape` key will close the modal.
- **Structure**: Compound components (`Modal`, `ModalContent`, `ModalHeader`, `ModalFooter`) for flexibility.
- **Accessibility**: Will automatically trap focus and manage `aria-modal="true"` and `role="dialog"`.

#### [NEW] [Dropdown.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Dropdown.tsx) & [Dropdown.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Dropdown.css)
- Build a custom dropdown menu for actions (e.g., User Profile menu, sorting).
- **Features**: A wrapper component that manages open/closed state. Will use a custom `useClickOutside` hook to automatically close the dropdown when clicking elsewhere on the page.
- **Structure**: `Dropdown`, `DropdownTrigger`, `DropdownMenu`, `DropdownItem`.

#### [NEW] [Toast.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Toast.tsx) & [Toast.css](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/ui/Toast.css)
- Build a toast notification system.
- **Architecture**: I will create a `ToastProvider.tsx` context that wraps the application (inside `layout.tsx`). It will expose a `useToast()` hook allowing any component to fire `toast.success("Added to cart!")`.
- **Features**: Toasts will stack dynamically at the bottom-right, have a slide-in animation, and auto-dismiss after 3000ms.

## User Review Required
> [!IMPORTANT]
> Because we are avoiding third-party libraries, the `Toast` notification system requires adding a **Global Context Provider** (`ToastProvider`) to `layout.tsx`. Are you comfortable with me adding this second context provider to the root layout alongside the `ThemeProvider`?

## Verification Plan
1. Create a temporary testing block in `app/page.tsx` (or verify manually) to spawn Toasts, open a Modal, and click a Dropdown.
2. Test `Escape` key functionality on the Modal.
3. Verify CSS animations (Toast slide-in, Modal fade-in) operate smoothly in both Dark and Light modes.
