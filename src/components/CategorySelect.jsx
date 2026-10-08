import { getCategories } from "../api/products";
import useFetch from "../hooks/useFetch";

const CategorySelect = ({ value, onChange }) => {
  const { data, error } = useFetch(() => getCategories(), []);
  const categories = data || [];

  return (
    <div className="w-full sm:w-56">
      <label htmlFor="category" className="mb-1 block text-sm font-medium">
        Category
      </label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={Boolean(error)}
        className="w-full rounded border bg-white px-3 py-2"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;