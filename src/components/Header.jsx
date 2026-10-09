import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          Product Explorer
        </Link>

        <Link
          to="/cart"
          aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          className="relative rounded px-3 py-2"
        >
          <span aria-hidden="true">🛒 Cart</span>
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs text-white"
            >
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;