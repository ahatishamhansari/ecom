# Phase 2.1 - Frontend Layout Implementation

This plan details the steps to set up the core structural components of the StyleForge storefront, fulfilling subtask 2.1 while strictly adhering to Vanilla CSS, SEO guidelines, and Semantic HTML.

## Proposed Changes

### 1. Theme Provider Context

#### [NEW] [ThemeProvider.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/providers/ThemeProvider.tsx)
- Create a `ThemeProvider` using React Context.
- It will track the active theme (`system`, `light`, `dark`) and apply a `.dark` class or appropriate `data-theme` attribute to the `<html>` root.
- It will synchronize with local storage to persist user preferences.

### 2. Structural Components

#### [NEW] [Navbar.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/layout/Navbar.tsx)
- A responsive navigation bar wrapped in semantic `<header>` and `<nav>` tags.
- Includes a logo placeholder, primary navigation links (Men, Women, Collections), a search bar placeholder, and a theme toggle button.
- Will use Vanilla CSS (possibly via CSS modules or just scoped utility classes in `globals.css`) for a premium `glass-effect` fixed header.

#### [NEW] [Footer.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/components/layout/Footer.tsx)
- A standard e-commerce footer wrapped in a semantic `<footer>` tag.
- Includes quick links, social media placeholder icons, and copyright info.

### 3. Layout Integration

#### [MODIFY] [layout.tsx](file:///home/shan/shan/Projects/ecommerce/frontend/src/app/layout.tsx)
- Wrap the entire application in the new `<ThemeProvider>`.
- Inject the `<Navbar />` at the top of the body.
- Wrap the `children` prop in a strict `<main>` landmark tag for SEO and screen-reader accessibility.
- Inject the `<Footer />` at the bottom.

## Open Questions
> [!NOTE]
> Since we removed Tailwind in Phase 0.2, I will style the Navbar and Footer using pure Vanilla CSS classes added to `globals.css` or scoped CSS modules. Do you have a preference between **Global Utility Classes** vs **CSS Modules** (`Navbar.module.css`) for these components? 

## Verification Plan
1. Start the Next.js dev server.
2. Verify the Navbar and Footer render correctly and stick/scroll appropriately.
3. Use browser dev tools to confirm semantic `<header>`, `<main>`, and `<footer>` tags exist.
4. Click the Theme Toggle in the Navbar and verify the app switches between light and dark modes flawlessly.
