# Product Explorer

Product Explorer is a small online shop browser. You can look through products, search for something, filter by category, sort them, and open any product to see more details and reviews. If you like something, you add it to your cart. Your cart sticks around even after you close the page, and you can switch between a light and a dark look.
# Features
- Product List with search/category/sort/pagination
- Product detail with image gallery and reviews
- A cart with localStorage
- Light/dark Theme

# Tech Stack
React
jsdom

# File Structure
File structure
product_explorer/
├─ index.html                # root HTML + inline theme script (prevents FOUC)
├─ package.json
├─ vite.config.js            # react + tailwind plugins + vitest config
├─ src/
│  ├─ main.jsx               # StrictMode > BrowserRouter > CartProvider > App
│  ├─ App.jsx                # layout shell + Routes
│  ├─ index.css              # Tailwind import, dark variant, borders, focus styles
│  ├─ api/
│  │  └─ products.js         # DummyJSON API layer
│  ├─ context/
│  │  ├─ CartContext.jsx     # CartProvider + useCart hook + persistence
│  │  └─ cartReducer.js      # (ADD/REMOVE/SET_QUANTITY/CLEAR)
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
│  └─ test/

# Architecture and Dataflow
## Getting data
- uses DummyJSON
- api/products.js
- search + Category 

## useFetch
one helper for data loading error and retry

## FIlters
- live in URL
- changing filter resets to page 1
- Search box waits (debounce) before updating URL

## Product List 
- Reads filters -> fetches -> shows grid or loading/error/empty
- Pagination only when there's more than one page

## Product detail
- Fetches one product, shows gallary, rating, stock and reviews
- "Add to cart" disable when out of stock

## Cart 
- Reducer handles add/remove/quantity/clear, never mutates
- Adding an existing item bumps quantity
- CartContect + useCart() give any component the cart
- Auto- saves to browser storage, loads back on return
- Header shows item-count badge at top of cart

## Theme 
Tailwinf toggles a dark class
useTheme starts from your save choice
toggle sun/moon button

# AI coding assistant
Opencode-testing and for useTheme and ThemeToggle
Claude-for reviewing project structure and confusing bits like useContext