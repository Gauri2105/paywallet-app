import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/history");

      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadge = (type) => {
    switch (type) {
      case "TOPUP":
        return "bg-blue-100 text-blue-700";

      case "TRANSFER":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const sender = transaction.sender?.name?.toLowerCase() || "";

    const receiver = transaction.receiver?.name?.toLowerCase() || "";

    const query = search.toLowerCase();

    const matchesSearch = sender.includes(query) || receiver.includes(query);

    const matchesFilter = filter === "ALL" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">Transaction History</h1>

          <CSVLink
            data={transactions}
            filename="transactions.csv"
            className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition text-center"
          >
            Export CSV
          </CSVLink>
        </div>

        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by sender or receiver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "ALL" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("TRANSFER")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "TRANSFER"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Transfer
              </button>

              <button
                onClick={() => setFilter("TOPUP")}
                className={`px-4 py-2 rounded-lg ${
                  filter === "TOPUP"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Topup
              </button>
            </div>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-10 text-center">
            <h3 className="text-lg font-semibold">No Transactions Yet</h3>

            <p className="text-gray-500 mt-2">
              Your transaction history will appear here.
            </p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="bg-white shadow rounded-xl p-10 text-center">
            <h3 className="text-lg font-semibold">No Matching Transactions</h3>

            <p className="text-gray-500 mt-2">Try changing search or filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-xl">₹{transaction.amount}</h3>

                    <p className="text-gray-600 mt-2">
                      <strong>From:</strong> {transaction.sender?.name || "N/A"}
                    </p>

                    <p className="text-gray-600">
                      <strong>To:</strong> {transaction.receiver?.name || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadge(
                        transaction.type,
                      )}`}
                    >
                      {transaction.type || "UNKNOWN"}
                    </span>

                    <p className="text-sm text-gray-500">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
