import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">
          Product Explorer
        </Link>

        <Link to="/cart">Cart (0)</Link>
      </nav>
    </header>
  );
}

export default Header;