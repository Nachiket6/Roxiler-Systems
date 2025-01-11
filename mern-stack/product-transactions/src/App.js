import React, { useState, useEffect } from "react";
import axios from "axios";
import MonthSelector from "./components/MonthSelector";
import SearchBar from "./components/SearchBar";
import TransactionTable from "./components/TransactionTable";
import Pagination from "./components/Pagination";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: { search, month, page, limit: 10 },
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    if (!month) return;
    try {
      const response = await axios.get('http://localhost:5000/api/statistics', { params: { month } });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchBarChartData = async () => {
    if (!month) return;
    try {
      const response = await axios.get('http://localhost:5000/api/bar-chart', { params: { month } });
      setBarChartData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const fetchPieChartData = async () => {
    if (!month) return;
    try {
      const response = await axios.get('http://localhost:5000/api/pie-chart', { params: { month } });
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData();
  }, [search, month, page]);

  return (
    <div className="App bg-cyan-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center  mb-8">Product Transactions</h1>

      <div className="mb-6 flex justify-between items-center">
        <MonthSelector month={month} onMonthChange={(e) => setMonth(e.target.value)} />
        <SearchBar search={search} onSearchChange={(e) => setSearch(e.target.value)} />
      </div>

      {!loading && <TransactionTable transactions={transactions} />}
      {!loading && transactions.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Statistics</h2>
          <Statistics statistics={statistics} />
        </div>

        <div className="flex space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bar Chart</h2>
            <BarChart barChartData={barChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pie Chart</h2>
            <PieChart pieChartData={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;