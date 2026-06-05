import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const SendMoney = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get("/wallet/balance");

      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const response = await api.get(`/users/search?query=${value}`);

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setQuery(user.name);
    setUsers([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
toast.error(
  "Please select a user"
);      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/transactions/send", {
        receiverEmail: selectedUser.email,
        amount: Number(amount),
      });

toast.success(
  response.data.message
);
      setAmount("");
      setQuery("");
      setSelectedUser(null);

      fetchBalance();
    } catch (error) {
toast.error(
  error.response?.data?.message ||
  "Transfer failed"
);    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">Send Money</h1>

          {/* Wallet Balance */}

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-gray-600">Available Balance</p>

            <h2 className="text-3xl font-bold text-blue-600">₹{balance}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Search User */}

            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search User"
              value={query}
              onChange={(e) => searchUsers(e.target.value)}
            />

            {/* Search Results */}

            {users.length > 0 && (
              <div className="border rounded-lg max-h-60 overflow-y-auto bg-white shadow">
                {users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleSelectUser(user)}
                    className="p-3 border-b cursor-pointer hover:bg-gray-100"
                  >
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Selected User */}

            {selectedUser && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-700 mb-2">
                  Selected User
                </h3>

                <p>{selectedUser.name}</p>

                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
            )}

            {/* Amount */}

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Quick Amount Buttons */}

            <div className="flex flex-wrap gap-2">
              {[100, 500, 1000, 2000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value.toString())}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  ₹{value}
                </button>
              ))}
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading || !selectedUser || !amount}
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {loading ? "Processing..." : "Send Money"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
