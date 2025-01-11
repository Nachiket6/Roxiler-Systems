import React from "react";

const MonthSelector = ({ month, onMonthChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="month" className="block text-gray-700 font-semibold mb-2">
        Select Month:
      </label>
      <select
        id="month"
        value={month}
        onChange={onMonthChange}
        className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Month</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default MonthSelector;
