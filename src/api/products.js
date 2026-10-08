const BASE_URL = "https://dummyjson.com";

export const PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: low to high", sortBy: "price", order: "asc" },
  { value: "price-desc", label: "Price: high to low", sortBy: "price", order: "desc" },
  { value: "rating-desc", label: "Rating: high to low", sortBy: "rating", order: "desc" },
];

export const getJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Request failed");
  }
  return res.json();
}

export const getCategories = async () => {
  const data = await getJson(`${BASE_URL}/products/categories`);
  // newer API versions return objects, older ones return plain strings
  return data.map((c) =>
    typeof c === "string" ? { slug: c, name: c } : c
  );
}

export const getProductList = async ({ q, category, sort, page }) => {
  const skip = (page - 1) * PAGE_SIZE;

  const params = new URLSearchParams();
  const sortOption = SORT_OPTIONS.find((s) => s.value === sort);
  if (sortOption && sortOption.sortBy) {
    params.set("sortBy", sortOption.sortBy);
    params.set("order", sortOption.order);
  }

  // search + category: the API can't do both, so we filter ourselves
  if (q && category) {
    params.set("q", q);
    params.set("limit", 0);
    const data = await getJson(`${BASE_URL}/products/search?${params}`);
    const filtered = data.products.filter((p) => p.category === category);
    return {
      products: filtered.slice(skip, skip + PAGE_SIZE),
      total: filtered.length,
    };
  }

  params.set("limit", PAGE_SIZE);
  params.set("skip", skip);

  let url = `${BASE_URL}/products`;
  if (q) {
    url = `${BASE_URL}/products/search`;
    params.set("q", q);
  } else if (category) {
    url = `${BASE_URL}/products/category/${category}`;
  }

  const data = await getJson(`${url}?${params}`);
  return { products: data.products, total: data.total };
}
