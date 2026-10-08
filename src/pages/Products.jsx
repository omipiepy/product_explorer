import { getProducts } from "../api/products";
import useFetch from "../hooks/useFetch";
import ProductGrid from "../components/ProductGrid";
import { Loading, ErrorMessage, Empty } from "../components/States";

export default function Products() {
  const { data, loading, error, retry } = useFetch(() => getProducts(12, 0), []);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>

      {loading && <Loading />}

      {error && <ErrorMessage message={error} onRetry={retry} />}

      {data && data.products.length === 0 && <Empty text="No products found" />}

      {data && data.products.length > 0 && <ProductGrid products={data.products} />}
    </section>
  );
}