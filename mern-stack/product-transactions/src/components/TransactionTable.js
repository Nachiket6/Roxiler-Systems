import React from "react";

const TransactionTable = ({ transactions }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Transactions</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-indigo-500 via-blue-500 to-teal-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-semibold">Product Title</th>
              <th className="px-6 py-4 text-left text-lg font-semibold">Description</th>
              <th className="px-6 py-4 text-right text-lg font-semibold">Price</th>
              <th className="px-6 py-4 text-center text-lg font-semibold">Sold</th>
              <th className="px-6 py-4 text-left text-lg font-semibold">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-purple-50"
                } hover:bg-indigo-100 transition-all duration-200 ease-in-out`}
              >
                <td className="px-6 py-4 text-gray-900 font-medium text-lg">
                  {transaction.productTitle}
                </td>
                <td className="px-6 py-4 text-gray-700 text-lg">{transaction.description}</td>
                <td className="px-6 py-4 text-right text-lg font-semibold text-green-600">
                  ${transaction.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-2 rounded-full text-sm font-medium ${
                      transaction.sold
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    {transaction.sold ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 text-lg">
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
