# Phase 2.1 Code Changes Explanation
*Prompt context: Explain the code changes done in Phase 2.1*

### 1. The Custom `ThemeProvider.tsx`
Because we removed Tailwind, we needed a way to manually control the theme. Instead of pulling in heavy libraries, I built a lightweight React Context.

* **Client-Side execution (`"use client"`):** Next.js uses Server-Side Rendering (SSR). However, we can't know the user's `localStorage` theme preference on the server. So, the ThemeProvider must execute on the client.
* **The `mounted` state:** By waiting until the component is `mounted` to apply the theme, we avoid a React hydration error if the server UI and client UI don't match.
* **Injecting the CSS:** The logic listens for changes. If the user clicks the theme toggle, it adds the `.dark` class directly to the HTML root, triggering our `globals.css` `.dark` variables instantly.

### 2. The Next.js `layout.tsx` Updates
This file wraps every single page in the application.

* **Injecting the Provider:** By putting `<ThemeProvider>` at the very top, the `Navbar`, `Footer`, and all future pages (`children`) have access to the `useTheme()` hook. 
* **The `<main>` SEO Landmark:** The `{children}` is now wrapped in a strict `<main>` tag for SEO and accessibility.
* **`suppressHydrationWarning`:** Added to the `<html>` tag to suppress warnings when our `ThemeProvider` dynamically adds a `class="dark"` attribute on the client side.

### 3. The `Navbar.tsx` & `Footer.tsx` (Semantic Layout)
* **Semantic Tags:** Used native HTML5 `<header>`, `<footer>`, and `<nav>`. This is technically required for a perfect Lighthouse Accessibility score.
* **The Glass Effect:** In `Navbar.css`, I applied `.glass-effect` (`backdrop-filter: blur(10px)`), creating a premium Apple-like feel as elements scroll beneath the sticky header.
* **The Toggle Button:** Flips the state inside the `ThemeProvider`, triggering the global class change.
