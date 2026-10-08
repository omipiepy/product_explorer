import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Page not found</h1>
      <Link to="/" className="text-indigo-600 underline">
        Back to products
      </Link>
    </div>
  );
}

export default NotFound;