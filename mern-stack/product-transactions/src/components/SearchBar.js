import React from "react";

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="search"
        className="block text-lg font-bold text-gray-800 mb-3"
      >
        🔍 Search Transactions
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          value={search}
          onChange={onSearchChange}
          placeholder="Search by title, description, or price..."
          className="w-full p-3 pl-10 text-gray-800 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18l6-6m0 0l-6-6m6 6H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
