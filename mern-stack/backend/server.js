const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Load JSON data     
const dataPath = path.join(__dirname, 'data', 'product_transaction.json');
const transactions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Utility function to filter transactions by month
function filterByMonth(transactions, month) {
  return transactions.filter((transaction) => {
    const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
    return transactionMonth === month;
  });
}

// Initialize API (no database, this simply loads the JSON file)
app.get('/api/initialize', (req, res) => {
  res.status(200).json({
    message: 'Data initialized successfully from JSON file',
    totalTransactions: transactions.length,
  });
});

// API to list transactions
app.get('/api/transactions', (req, res) => {
  const { search = '', page = 1, limit = 10, month } = req.query;

  let filtered = month ? filterByMonth(transactions, parseInt(month)) : transactions;

  if (search) {
    filtered = filtered.filter((transaction) =>
      transaction.productTitle.toLowerCase().includes(search.toLowerCase()) ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.price.toString().includes(search)
    );
  }

  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + parseInt(limit));

  res.status(200).json({
    total: filtered.length,
    currentPage: parseInt(page),
    totalPages: Math.ceil(filtered.length / limit),
    transactions: paginated,
  });
});

// API to get statistics
app.get('/api/statistics', (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const filtered = filterByMonth(transactions, parseInt(month));

  const totalSales = filtered.reduce((sum, transaction) => sum + transaction.price, 0);
  const soldItems = filtered.filter((transaction) => transaction.sold).length;
  const notSoldItems = filtered.filter((transaction) => !transaction.sold).length;

  res.status(200).json({
    totalSales,
    soldItems,
    notSoldItems,
  });
});
// API for bar chart (price range and count of items in selected month)
app.get('/api/bar-chart', (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const filtered = filterByMonth(transactions, parseInt(month));

  const priceRanges = [
    { range: '0-100', min: 0, max: 100, count: 0 },
    { range: '101-200', min: 101, max: 200, count: 0 },
    { range: '201-300', min: 201, max: 300, count: 0 },
    { range: '301-400', min: 301, max: 400, count: 0 },
    { range: '401-500', min: 401, max: 500, count: 0 },
    { range: '501-600', min: 501, max: 600, count: 0 },
    { range: '601-700', min: 601, max: 700, count: 0 },
    { range: '701-800', min: 701, max: 800, count: 0 },
    { range: '801-900', min: 801, max: 900, count: 0 },
    { range: '901-above', min: 901, max: Infinity, count: 0 },
  ];

  filtered.forEach((transaction) => {
    const price = transaction.price;
    priceRanges.forEach((range) => {
      if (price >= range.min && price <= range.max) {
        range.count += 1;
      }
    });
  });

  res.status(200).json(priceRanges);
});

// API for pie chart (unique categories and item count in selected month)
app.get('/api/pie-chart', (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const filtered = filterByMonth(transactions, parseInt(month));

  const categoryCount = {};

  filtered.forEach((transaction) => {
    const category = transaction.category || 'Unknown';
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const response = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
  }));

  res.status(200).json(response);
});

// API to combine data from all three APIs
app.get('/api/combined-data', async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  // Call the other APIs internally
  const barChartResponse = await new Promise((resolve) => {
    app.handle({ method: 'GET', url: `/api/bar-chart?month=${month}` }, {
      status: (code) => ({
        json: (data) => resolve({ code, data }),
      }),
    });
  });

  const pieChartResponse = await new Promise((resolve) => {
    app.handle({ method: 'GET', url: `/api/pie-chart?month=${month}` }, {
      status: (code) => ({
        json: (data) => resolve({ code, data }),
      }),
    });
  });

  const statisticsResponse = await new Promise((resolve) => {
    app.handle({ method: 'GET', url: `/api/statistics?month=${month}` }, {
      status: (code) => ({
        json: (data) => resolve({ code, data }),
      }),
    });
  });

  // Combine data from all APIs
  const combinedData = {
    barChart: barChartResponse.data,
    pieChart: pieChartResponse.data,
    statistics: statisticsResponse.data,
  };

  res.status(200).json(combinedData);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));