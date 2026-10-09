import { SORT_OPTIONS } from "../api/products";

const SortSelect = ({ value, onChange }) => {
  return (
    <div className="w-full sm:w-56">
      <label htmlFor="sort" className="mb-1 block text-sm font-medium">
        Sort by
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded bg-white px-3 py-2 dark:bg-gray-800"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelect;