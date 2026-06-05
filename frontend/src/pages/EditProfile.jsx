import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    gender: "Other",
    dob: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");

      const user = response.data.user;

      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "Other",
        dob: user.dob ? user.dob.split("T")[0] : "",
        profileImage: user.profileImage || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);

      setFormData({
        ...formData,
        profileImage: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/profile", formData);

      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label>Profile Photo</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded p-3 mt-1"
              />
              {formData.profileImage && (
                <img
                  src={formData.profileImage}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover mt-4"
                />
              )}
            </div>

            <div>
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded p-3 mt-1"
              />
            </div>

            <div>
              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded p-3 mt-1"
              />
            </div>

            <div>
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-3 mt-1"
              >
                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded p-3 mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
