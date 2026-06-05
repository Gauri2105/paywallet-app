import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const ChangePassword = () => {
  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        "/profile/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      alert(
        "Password changed successfully"
      );
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-5">
          Change Password
        </h1>

        <form
          onSubmit={submit}
          className="space-y-4"
        >
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-3 rounded"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded">
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;