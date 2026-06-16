# Phase 2.2 Code Changes Explanation
*Prompt context: Implement Phase 2.2 Reusable UI Components*

### 1. `Button` Component
* **Dynamic Classes**: Used an array filter pattern to map props (`variant`, `size`, `fullWidth`, `isLoading`) directly to our BEM-style Vanilla CSS classes (e.g., `.ui-button--primary`).
* **Loading Spinner**: Instead of importing SVGs, I implemented a pure CSS loader using `border` and `@keyframes spin`. When `isLoading` is true, the button text opacity goes to `0`, making room for the spinner seamlessly without layout shifts.

### 2. `Input` Component
* **React `useId`**: Essential for accessibility. It guarantees that the `<label htmlFor="...">` exactly matches the `<input id="...">` even if multiple inputs are rendered on the page.
* **Error Handling**: If the `error` prop is present, it adds a `.ui-input--error` class (changing the border to red) and injects `aria-invalid="true"` and an `aria-describedby` attribute pointing to the error text ID. This allows screen readers to announce the error immediately when the user focuses the input.

### 3. `Card` Compound Components
* **Why Compound?**: Instead of a monolithic component `(<Card title="..." content="..." footer="..." />)`, exporting `CardHeader`, `CardContent`, etc., allows developers to slot any React Node inside the card easily.
* **Styling**: Leveraged CSS variables heavily. The `.ui-card` uses `--color-surface` and `--color-border`. In Light Mode, this looks like a standard white card with a light gray border. In Dark Mode, our `:root.dark` variables automatically flip this to a slate background with a subtle dark border, requiring zero extra logic in the component itself.
