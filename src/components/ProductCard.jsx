import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <article className="relative rounded border bg-white">
      <div className="aspect-square bg-gray-100">
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
        <p className="text-xs uppercase text-gray-500">{product.category}</p>

        <h2 className="font-medium">
          <Link to={`/products/${product.id}`} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h2>

        <div className="mt-2 flex justify-between">
          <span className="font-semibold">${product.price}</span>
          <span>★ {product.rating}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;