import React from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "Search dishes...",
}) {
  return (
    <div className="mb-3 w-50 text-center" style={{ marginTop: "1rem" }}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="btn btn-primary fw-bold"
          type="button"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
