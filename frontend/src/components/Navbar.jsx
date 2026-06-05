import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useState } from "react";

import { FiClock, FiHome, FiMenu, FiSend, FiUser, FiX } from "react-icons/fi";

const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-400">
            PayWallet
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={navLinkClass("/")}>
              <FiHome />
              Dashboard
            </Link>

            <Link to="/send-money" className={navLinkClass("/send-money")}>
              <FiSend />
              Send Money
            </Link>

            <Link to="/transactions" className={navLinkClass("/transactions")}>
              <FiClock />
              Transactions
            </Link>

            <Link to="/profile" className={navLinkClass("/profile")}>
              <FiUser />
              Profile
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <Link
              to="/"
              className={navLinkClass("/")}
              onClick={() => setMenuOpen(false)}
            >
              <FiHome />
              Dashboard
            </Link>

            <Link
              to="/send-money"
              className={navLinkClass("/send-money")}
              onClick={() => setMenuOpen(false)}
            >
              <FiSend />
              Send Money
            </Link>

            <Link
              to="/transactions"
              className={navLinkClass("/transactions")}
              onClick={() => setMenuOpen(false)}
            >
              <FiClock />
              Transactions
            </Link>

            <Link
              to="/profile"
              className={navLinkClass("/profile")}
              onClick={() => setMenuOpen(false)}
            >
              <FiUser />
              Profile
            </Link>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md">
            <div className="border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold text-red-600">Logout</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your PayWallet account?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition font-medium"
              >
                Cancel{" "}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
