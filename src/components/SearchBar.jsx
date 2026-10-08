import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ value, onSearch }) => {
  const [text, setText] = useState(value);
  const debouncedText = useDebounce(text, 400);

  // after the user stops typing, update the URL
  useEffect(() => {
    const trimmed = debouncedText.trim();
    if (trimmed !== value) {
      onSearch(trimmed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  // when the URL changes (Back button, clear filters), update the input
  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="w-full sm:flex-1">
      <label htmlFor="search" className="mb-1 block text-sm font-medium">
        Search products
      </label>
      <input
        id="search"
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search by title..."
        autoComplete="off"
        className="w-full rounded border bg-white px-3 py-2"
      />
    </div>
  );
}

export default SearchBar;