const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 12, skip = 0) {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

  if (!res.ok) {
    throw new Error("Could not load products");
  }

  return res.json();
}