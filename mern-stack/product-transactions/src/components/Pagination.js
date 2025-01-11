import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white rounded-lg shadow-lg transform transition duration-300 ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 hover:bg-gradient-to-l hover:from-purple-600 hover:to-teal-600"
        }`}
      >
        Previous
      </button>
      <span className="text-gray-800 font-semibold text-lg">
        {`Page ${currentPage} of ${totalPages}`}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white rounded-lg shadow-lg transform transition duration-300 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 hover:bg-gradient-to-l hover:from-purple-600 hover:to-teal-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
