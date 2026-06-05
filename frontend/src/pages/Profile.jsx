import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setProfile(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await api.get(
        "/wallet/balance"
      );

      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBalance();
  }, []);

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Profile Header */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40"></div>

          <div className="px-6 pb-8">

            <div className="-mt-16 flex flex-col items-center">

              <img
                src={
                  profile.profileImage ||
                  "https://i.pravatar.cc/300"
                }
                alt=""
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />

              <h1 className="text-3xl font-bold mt-4">
                {profile.name}
              </h1>

              <p className="text-gray-500">
                {profile.email}
              </p>

              <Link
                to="/edit-profile"
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Edit Profile
              </Link>

            </div>

          </div>

        </div>

        {/* User Information Section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="font-bold text-lg mb-3">
              Personal Information
            </h3>

            <p>
              Phone:
              {" "}
              {profile.phone || "-"}
            </p>

            <p>
              Gender:
              {" "}
              {profile.gender || "-"}
            </p>

            <p>
              DOB:
              {" "}
              {profile.dob
                ? new Date(
                    profile.dob
                  ).toLocaleDateString()
                : "-"}
            </p>

            <p>
              Address:
              {" "}
              {profile.address || "-"}
            </p>

          </div>

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="font-bold text-lg mb-3">
              Account Details
            </h3>

            <p>
              User ID:
              {" "}
              {profile._id}
            </p>

            <p>
              Joined:
              {" "}
              {new Date(
                profile.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        {/* Wallet Card */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-6 mt-6">

          <h3 className="text-lg">
            Wallet Balance
          </h3>

          <h1 className="text-4xl font-bold">
            ₹{balance}
          </h1>

        </div>

      </div>
    </>
  );
};

export default Profile;