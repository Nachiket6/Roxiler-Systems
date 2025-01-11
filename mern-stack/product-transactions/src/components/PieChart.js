import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieChartData }) => {
  const data = {
    labels: pieChartData.map((item) => item.category),
    datasets: [
      {
        data: pieChartData.map((item) => item.count),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Teal
          "#FF9F40", // Orange
          "#9966FF", // Purple
        ],
        hoverBackgroundColor: [
          "#FF6384CC", // Semi-transparent red
          "#36A2EBCC", // Semi-transparent blue
          "#FFCE56CC", // Semi-transparent yellow
          "#4BC0C0CC", // Semi-transparent teal
          "#FF9F40CC", // Semi-transparent orange
          "#9966FFCC", // Semi-transparent purple
        ],
        borderWidth: 1,
        hoverOffset: 6, // Larger hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151", // Dark gray
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return ` ${value} items`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pie Chart Representation</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
