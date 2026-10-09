import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="shadow bg-white dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold dark:text-gray-100">
          Product Explorer
        </Link>

        <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          to="/cart"
          aria-label={`Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
          className="relative rounded px-3 py-2 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          <span aria-hidden="true"><FiShoppingCart className="inline"/> Cart</span>
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs text-white"
            >
              {itemCount}
            </span>
          )}
        </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;