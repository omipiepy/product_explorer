import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/products";
import useFetch from "../hooks/useFetch";
import ImageCollect from "../components/ImageCollect";
import ReviewList from "../components/ReviewList";
import { DetailLoading, ErrorMessage } from "../components/States";
import { useCart} from "../context/CartContext";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

function getStockStatus(stock) {
  if (stock === 0) return { text: "Out of stock", style: "bg-red-100 text-red-800" };
  if (stock <= 5) return { text: `Low stock (${stock} left)`, style: "bg-yellow-100 text-yellow-800" };
  return { text: "In stock", style: "bg-green-100 text-green-800" };
}

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, loading, error, retry } = useFetch(() => getProduct(id), [id]);
  const {items, addItem} = useCart();
  const inCart = product ? items.find((item) => item.id === product.id) : null;
  return (
    <div>
      <Link to="/" className="text-indigo-600 underline dark:text-indigo-400">
        <FiArrowLeft className="inline" aria-hidden="true" /> Back to products
      </Link>

      {loading && <DetailLoading />}

      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} onRetry={retry} />
        </div>
      )}

      {!loading && product && (
        <article className="mt-6 grid gap-8 md:grid-cols-2">
          <ImageCollect key={product.id} images={product.images} title={product.title} />

          <div>
            <p className="text-sm uppercase text-gray-500">{product.category}</p>
            <h1 className="mt-1 text-3xl font-bold">{product.title}</h1>

            <p className="mt-2">
              <span aria-label={`Rated ${product.rating} out of 5`}>★ {product.rating}</span>
            </p>

            <p className="mt-4 text-3xl font-semibold">${product.price}</p>

            <p className={`mt-4 inline-block rounded px-3 py-1 text-sm ${getStockStatus(product.stock).style}`}>
              {getStockStatus(product.stock).text}
            </p>

            <p className="mt-6 text-gray-700 dark:text-gray-300">{product.description}</p>

            <button
              onClick={() => addItem(product)}
              disabled={product.stock === 0 || (inCart && inCart.quantity >= product.stock)}
              className="mt-6 rounded bg-indigo-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {product.stock === 0 ? "Out of stock" : "Add to cart"}
            </button>

            <p aria-live="polite" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {inCart ? `${inCart.quantity} in your cart` : ""}
            </p>
          </div>

          <section className="md:col-span-2" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="mb-4 text-xl font-bold">
              Reviews
            </h2>
            <ReviewList reviews={product.reviews} />
          </section>
        </article>
      )}
    </div>
  );
}

export default ProductDetail;