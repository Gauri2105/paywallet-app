import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import SentReceivedPieChart from "../components/charts/SentReceivedPieChart";
import RecentContacts from "../components/RecentContacts";
import MonthlyChart from "../components/charts/MonthlyChart";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await api.get("/analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await api.get("/analytics/monthly");

      setMonthlyData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchAnalytics();
    fetchMonthlyAnalytics();
  }, []);

  if (!dashboard) {
    return (
      <>
        <Navbar />

        <div className="flex justify-center items-center h-[80vh]">
          <h2 className="text-2xl font-semibold">Loading Dashboard...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Welcome Card */}

        {dashboard.recentTransactions.length === 0 && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome to PayWallet 🎉</h2>

            <p>
              Add money and make your first transaction to start tracking
              analytics.
            </p>
          </div>
        )}

        {/* Summary Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Wallet Balance</p>

            <h2 className="text-4xl font-bold mt-2">₹{dashboard.balance}</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Sent</p>

            <h2 className="text-4xl font-bold mt-2">₹{dashboard.totalSent}</h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Received</p>

            <h2 className="text-4xl font-bold mt-2">
              ₹{dashboard.totalReceived}
            </h2>
          </div>
        </div>

        {/* Analytics */}

        <div className="bg-white rounded-2xl shadow p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Analytics</h2>

          {analytics &&
          analytics.totalSent === 0 &&
          analytics.totalReceived === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold">No Analytics Available</h3>

              <p className="text-gray-500 mt-2">
                Start sending or receiving money to view charts.
              </p>
            </div>
          ) : (
            analytics && (
              <SentReceivedPieChart
                sent={analytics.totalSent}
                received={analytics.totalReceived}
              />
            )
          )}
        </div>

        {/* Monthly Activity */}

        <div className="mt-8">
          <MonthlyChart data={monthlyData} />
        </div>

        {/* Recent Contacts */}

        <div className="mt-8">
          <RecentContacts />
        </div>

        {/* Recent Transactions */}

        <h2 className="text-2xl font-bold mt-8 mb-4">Recent Transactions</h2>

        {dashboard.recentTransactions.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h3 className="text-lg font-semibold">No Transactions Yet</h3>

            <p className="text-gray-500 mt-2">
              Your transaction history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {dashboard.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-white shadow rounded-xl p-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div>
                    <p>
                      Amount:
                      <strong> ₹{transaction.amount}</strong>
                    </p>

                    <p>Sender: {transaction.sender?.name}</p>

                    <p>Receiver: {transaction.receiver?.name}</p>
                  </div>

                  <div className="text-gray-500 text-sm">
                    {new Date(transaction.createdAt).toLocaleDateString()}
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

export default Dashboard;
