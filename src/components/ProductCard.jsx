import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <article className="relative rounded border bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={product.thumbnail}
          alt={product.title}
          width="300"
          height="300"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="p-3">
        <p className="text-xs uppercase text-gray-500 dark:text-gray-400">{product.category}</p>

        <h2 className="font-medium dark:text-gray-100">
          <Link to={`/products/${product.id}`} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h2>

        <div className="mt-2 flex justify-between">
          <span className="font-semibold dark:text-gray-100">${product.price}</span>
          <span className="dark:text-gray-300"><FaStar className="inline" aria-hidden="true"/> {product.rating}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;