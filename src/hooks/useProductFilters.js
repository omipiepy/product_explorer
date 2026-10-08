import { useSearchParams } from "react-router-dom";

const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page"), 10);

  const filters = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || "",
    sort: searchParams.get("sort") || "",
    // if the URL has something invalid like ?page=abc, fall back to page 1
    page: pageNumber > 0 ? pageNumber : 1,
  };

  function updateFilters(changes) {
    const next = new URLSearchParams(searchParams);

    for (const key in changes) {
      const value = changes[key];
      if (value === "" || (key === "page" && value === 1)) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    // changing search, category or sort sends the user back to page 1
    if (!("page" in changes)) {
      next.delete("page");
    }

    // page changes are added to history so Back works; typing/filtering replaces
    setSearchParams(next, { replace: !("page" in changes) });
  }

  return { filters, updateFilters };
}

export default useProductFilters;