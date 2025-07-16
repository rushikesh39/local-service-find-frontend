import React, { useState } from "react";
import { Upload, Mail, Phone, Lock } from "lucide-react";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Rushikesh Thange",
    email: "rushikesh@example.com",
    mobile: "9876543210",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    // TODO: call API to update profile
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1 flex flex-col items-center text-center border-r border-gray-200 pr-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
            <img
              src="https://ui-avatars.com/api/?name=Rushikesh+Thange"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{formData.name}</h2>
          <p className="text-gray-600 flex items-center justify-center gap-1 text-sm">
            <Mail size={16} /> {formData.email}
          </p>
          <p className="text-gray-600 flex items-center justify-center gap-1 text-sm">
            <Phone size={16} /> {formData.mobile}
          </p>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
