import { useEffect } from "react";
import { getProductList, PAGE_SIZE } from "../api/products";
import useFetch from "../hooks/useFetch";
import useProductFilters from "../hooks/useProductFilters";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import SortSelect from "../components/SortSelect";
import CategorySelect from "../components/CategorySelect";
import SearchBar from "../components/SearchBar";
import { Loading, ErrorMessage, Empty } from "../components/States";

const Products = () => {
  const { filters, updateFilters } = useProductFilters();

  const { data, loading, error, retry } = useFetch(
    () => getProductList(filters),
    [filters.q, filters.category, filters.sort, filters.page]
  );

  // scroll to the top when the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filters.page]);

  return (
    <section>
      <h1 className="mb-6 text-2xl font-bold">Products</h1>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <SortSelect
                value={filters.sort}
                onChange={(value) => updateFilters({ sort: value })}
            />
            <CategorySelect
                value={filters.category}
                onChange={(value) => updateFilters({ category: value })}
            />
            <SearchBar
                value={filters.q}
                onSearch={(value) => updateFilters({ q: value })}
            />
        </div>
      {loading && <Loading />}

      {error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && data && data.products.length === 0 && (
        <Empty text="No products found" />
      )}

      {!loading && data && data.products.length > 0 && (
        <ProductGrid products={data.products} />
      )}

      {!loading && data && data.total > PAGE_SIZE && (
        <Pagination
          page={filters.page}
          total={data.total}
          pageSize={PAGE_SIZE}
          onPageChange={(p) => updateFilters({ page: p })}
        />
      )}

    </section>
  );
}

export default Products;