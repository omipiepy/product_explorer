import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getProduct,
  getCategories,
  getProductList,
  PAGE_SIZE,
} from "../api/products";

function jsonResponse(body, { ok = true, status = 200 } = {}) {
  return { ok, status, json: async () => body };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("getProduct", () => {
  it("throws a not-found error for 404", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(null, { ok: false, status: 404 }));
    await expect(getProduct(999)).rejects.toThrow("Product not found");
  });

  it("throws a generic error for other failures", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(null, { ok: false, status: 500 }));
    await expect(getProduct(1)).rejects.toThrow("Could not load product");
  });

  it("returns the parsed product on success", async () => {
    const product = { id: 1, title: "Phone" };
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(product));

    await expect(getProduct(1)).resolves.toEqual(product);
  });
});

describe("getCategories", () => {
  it("normalises plain string categories into objects", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse(["beauty", "fragrances"]));

    await expect(getCategories()).resolves.toEqual([
      { slug: "beauty", name: "beauty" },
      { slug: "fragrances", name: "fragrances" },
    ]);
  });
});

describe("getProductList", () => {
  it("requests a page using limit and skip", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ products: [], total: 0 }));

    await getProductList({ q: "", category: "", sort: "", page: 3 });

    const url = global.fetch.mock.calls[0][0];
    expect(url).toContain("/products?");
    expect(url).toContain(`limit=${PAGE_SIZE}`);
    expect(url).toContain(`skip=${2 * PAGE_SIZE}`);
  });

  it("maps the sort option to sortBy and order", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ products: [], total: 0 }));

    await getProductList({ q: "", category: "", sort: "price-desc", page: 1 });

    const url = global.fetch.mock.calls[0][0];
    expect(url).toContain("sortBy=price");
    expect(url).toContain("order=desc");
  });

  it("uses the search endpoint when only a query is set", async () => {
    global.fetch = vi.fn().mockResolvedValue(jsonResponse({ products: [], total: 0 }));

    await getProductList({ q: "phone", category: "", sort: "", page: 1 });

    expect(global.fetch.mock.calls[0][0]).toContain("/products/search?");
  });

  it("filters by category client-side when q and category are both set", async () => {
    global.fetch = vi.fn().mockResolvedValue(
      jsonResponse({
        products: [
          { id: 1, category: "beauty" },
          { id: 2, category: "fragrances" },
        ],
      })
    );

    const result = await getProductList({
      q: "a",
      category: "beauty",
      sort: "",
      page: 1,
    });

    expect(result.products).toEqual([{ id: 1, category: "beauty" }]);
    expect(result.total).toBe(1);
  });
});
