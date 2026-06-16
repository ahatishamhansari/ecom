# Phase 2.3 Code Changes Explanation
*Prompt context: Implement Phase 2.3 Reusable UI Components Part 2 (Modal, Dropdown, Toast)*

### 1. `Modal` Component
* **React Portals (`createPortal`)**: Instead of rendering the modal HTML where the component is called, `createPortal` injects the modal DOM node directly into `document.body`. This is the gold standard for modals because it guarantees that a parent container's `overflow: hidden` or `z-index` will never accidentally clip or hide the modal.
* **Scroll Lock & Escape Key**: Used a `useEffect` hook to attach a `keydown` listener for the "Escape" key to close the modal. Inside that same effect, I set `document.body.style.overflow = "hidden"` while the modal is open to prevent the user from scrolling the background page beneath the overlay.
* **Backdrop Click**: Added a click handler to the `.ui-modal-overlay`. It checks `if (e.target === e.currentTarget)` to ensure that clicking the *background* closes the modal, but clicking the actual *white modal content box* does nothing.

### 2. `Dropdown` Component
* **Custom `useClickOutside` Hook**: Dropdowns are notoriously tricky because they need to close when you click away. I wrote a custom React hook that attaches a `mousedown` listener to the `document`. It uses `ref.current.contains(event.target)` to check if the user clicked inside the dropdown. If they clicked outside, it automatically triggers the `setIsOpen(false)` function.
* **React.Children Mapping**: I used `React.Children.map` and `React.cloneElement` to iterate over all `<DropdownItem>` elements passed as children. This allows me to automatically inject an `onClick` handler into every item that closes the dropdown menu immediately after a selection is made.

### 3. `Toast` Notification System
* **Global Context State**: The `<ToastProvider>` holds an array of `toasts` in state. It exposes a `value` object containing the `success` and `error` functions via Context. 
* **Component Unmounting Animation**: When a toast is told to dismiss (either manually by clicking 'X' or automatically via the 3-second `setTimeout`), it doesn't just disappear instantly. It sets an `isClosing` state to `true`, which applies a CSS class that animates it sliding off-screen to the right. A secondary `setTimeout` waits 300ms (the duration of the CSS animation) before *actually* removing it from the React state array.
* **Global Injection**: Added the `<ToastProvider>` into `app/layout.tsx` nested exactly under the `<ThemeProvider>`. This makes the `useToast()` hook available on literally every page of the application.
