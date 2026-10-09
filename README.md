# Product Explorer

Product Explorer is a small online shop browser. You can look through products, search for something, filter by category, sort them, and open any product to see more details and reviews. If you like something, you add it to your cart. Your cart sticks around even after you close the page, and you can switch between a light and a dark look.

## Features

- Product list with search, category filter, sort and pagination
- Product detail page with an image gallery and reviews
- A cart that persists in the browser (`localStorage`)
- Light / dark theme with system-preference detection
- Loading, error (with retry) and empty states

## Tech Stack

- **React** + React DOM
- **React** for client-side routing
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **react-icons** for icons
- **Testing:** Vitest 5, jsdom, React Testing Library
- **Linting:** oxlint

## Getting Started

You need Node.js installed (this was built on Node 22) and npm.

```
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
```

Other useful commands:

```
npm run build     # production build into dist/
npm run preview   # preview the production build
npm test          # run the test suite
npm run lint      # check code style
```

No API keys or environment variables are needed: all products come from the free [DummyJSON](https://dummyjson.com) service, so an internet connection is required.

## File Structure

```
product_explorer/
├─ index.html                # root HTML + inline theme script (prevents FOUC)
├─ package.json
├─ vite.config.js            # react + tailwind plugins + vitest config
├─ src/
│  ├─ main.jsx               # BrowserRouter > CartProvider > App
│  ├─ App.jsx                # layout shell + Routes
│  ├─ index.css              # Tailwind import, dark variant, borders, focus styles
│  ├─ api/
│  │  └─ products.js         # DummyJSON API layer
│  ├─ context/
│  │  ├─ CartContext.jsx     # CartProvider + useCart hook + persistence
│  │  └─ cartReducer.js      # ADD / REMOVE / SET_QUANTITY / CLEAR
│  ├─ hooks/
│  │  ├─ useDebounce.js
│  │  ├─ useFetch.js
│  │  ├─ useProductFilters.js
│  │  └─ useTheme.js
│  ├─ components/
│  │  ├─ Header.jsx  Footer.jsx  ThemeToggle.jsx
│  │  ├─ SearchBar.jsx  SortSelect.jsx  CategorySelect.jsx
│  │  ├─ ProductGrid.jsx  ProductCard.jsx
│  │  ├─ Pagination.jsx
│  │  ├─ ImageCollect.jsx  ReviewList.jsx
│  │  └─ States.jsx          # Loading, ErrorMessage, Empty, DetailLoading
│  ├─ pages/
│  │  ├─ Products.jsx
│  │  ├─ ProductDetail.jsx
│  │  ├─ Cart.jsx
│  │  └─ NotFound.jsx
│  └─ test/                  # vitest specs + setup.js
└─ README.md
```

## Architecture and Data Flow

## Getting data
- All data comes from the free **DummyJSON** API.
- `src/api/products.js` is the only file that talks to the network.
- It handles the product list, a single product, and the category list.
- When both a search term **and** a category are chosen (the API can't do both at once), it searches first and narrows the results itself.

## useFetch
- One small helper for data, loading, error, and retry.
- It ignores late responses so you never see results from an old search.

## Filters
- Search, category, sort, and page live in the **URL** (so refresh/share keeps them).
- Changing a filter resets you to page 1; changing only the page keeps your filters.
- The search box waits (debounce) before updating the URL.

## Product list
- Reads the filters → fetches matching products → shows the grid or a loading/error/empty state.
- Pagination only appears when there is more than one page.

## Product detail
- Fetches one product and shows the gallery, title, rating, price, stock, and reviews.
- "Add to cart" is disabled when the item is sold out or already at the stock limit.

## Cart
- A reducer handles add / remove / quantity / clear; it never mutates state, it returns a new one.
- Adding an item you already have just bumps the quantity (capped at stock).
- `CartContext` + `useCart()` make the cart available to any component.
- The cart auto-saves to the browser and loads back on your next visit.
- The header shows an item-count badge.

## Theme
- Tailwind toggles a `dark` class on the page root.
- `useTheme` starts from your saved choice, or your system setting if you have none.
- The sun/moon button flips it, and the choice is remembered.
- A tiny script in `index.html` sets the theme before the app loads, so dark-mode users don't see a white flash.

## Bugs I Encountered (small → big)

These are the bugs I ran into while building this by hand, roughly from smallest to biggest pain.

1. **Missing `key` warning** — `Each child in a list should have a unique "key" prop`. Happened when I rendered the product cards with `.map()` without a key. Small: it's only a warning, fixed by adding `key={product.id}`.

2. **`Objects are not valid as a React child`** — I tried to render a value that was an object (a whole category object) instead of a string. Small: the message is clear once you actually read it.

3. **`Cannot read properties of undefined (reading 'map')`** — I mapped over products before they had loaded, so the value was still `undefined`. Medium: the data isn't there *yet*, so fixing it means guarding with a loading check or `?.`.

4. **The cart silently didn't update** — the reducer read the product from the wrong place in the action (`action` instead of `action.product`), so dispatches did nothing. Medium–hard: no crash, just wrong behavior — the scary kind of bug, caught by a failing test.

5. **`useCart must be used within a CartProvider`** — a `useContext` call ran while no provider was above it in the tree. Big: the error names the caller, but the real mistake is somewhere higher up.

## One Bug I Hit

The `useContext` error (`useCart must be used within a CartProvider`) confused me the most.

I had a component that needed the cart, so I called `useCart()` at the top of it and expected it to just work. Instead the screen crashed with the provider error. My first instinct was that `useCart` itself was broken, so I re-read the hook again and again — it looked fine.

What I hadn't understood yet was that `useContext` doesn't read a global value; it reads from **the nearest provider above the component in the tree**. With no provider above it, it falls back to the empty default and throws. So the bug was never in `useCart` — it was in *where the component was rendered*. My component was sitting outside `<CartProvider>` in `main.jsx`.

Once I drew the component tree on paper and checked what wrapped what, the fix was obvious: make sure `CartProvider` wraps every component that reads the cart. Only a couple of lines changed, but finding it meant learning how context flows down the tree.

**Why it felt bigger than the others:** the `.map` and `key` errors pointed straight at the broken line. This one pointed at a *correct* line and hid the real cause somewhere else in the tree. That "the bug isn't where the error is" feeling is exactly what made it the hardest.

## Decisions and Tradeoffs

- **Filters in the URL, not local state** — makes results shareable and the back button work; cost is a little more syncing code.
- **Cart with `useReducer` + Context + `localStorage`** — no extra state library needed; logic stays testable in one place.
- **Plain `fetch` behind `useFetch`** instead of Axios/React Query — tiny bundle and visible mechanics; cost is no built-in caching.
- **Dark mode via a class on `<html>` + an inline script** — avoids the flash of the wrong theme; cost is a little duplicated logic in `index.html`.
- **Debounced search (400 ms)** — far fewer requests while typing; cost is a slight delay.
- **`react-icons` instead of emoji** — consistent rendering across devices and easy to hide from screen readers.

## What I'd Improve With More Time

- Cache responses (React Query) so revisiting the list doesn't refetch.
- Cancel in-flight requests with `AbortController` instead of just ignoring late results.
- More tests — the cart provider, filters hook, and detail page.
- TypeScript for safer props and state.
- Error boundaries so one broken component can't blank the app.
- An accessibility audit with a screen reader.
- Route-based code splitting to shrink the bundle.
- A real backend for the cart so it syncs across devices.
- Locale-aware currency formatting instead of a hardcoded `$`.

## How This Was Built (AI usage)

I used two AI assistants while building this:

- **opencode** — writing the tests and debugging the CSS dark mode
- **Claude** — planning the project structure and working through confusing parts, like how `useContext` and the cart's provider/reducer fit together.

Every change was reviewed and verified by running the app, the tests, and the linter — not accepted blindly.

