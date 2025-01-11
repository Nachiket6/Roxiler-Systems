import React from "react";

const Statistics = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Statistics</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Total Sales</span>
          <span className="text-xl font-bold text-green-500">${statistics.totalSales}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Sold Items</span>
          <span className="text-xl font-bold text-blue-500">{statistics.soldItems}</span>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Not Sold Items</span>
          <span className="text-xl font-bold text-red-500">{statistics.notSoldItems}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
