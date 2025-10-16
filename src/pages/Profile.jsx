import React, { useState } from "react";
import { User, Camera } from "lucide-react";

const ProfilePage = () => {
  // Dummy profile data
  const [profile, setProfile] = useState({
    name: "Rushikesh Thange",
    email: "rushikesh@example.com",
    mobile: "9876543210",
    address: "Pune, Maharashtra, India",
    role: "User",
  });

  const [editField, setEditField] = useState(null);
  const [tempData, setTempData] = useState({});

  const handleEdit = (field) => {
    setEditField(field);
    setTempData({ ...profile });
  };

  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleSave = (field) => {
    setProfile({ ...profile, [field]: tempData[field] });
    setEditField(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-8">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
              {profile.name[0]}
            </div>
            <button className="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow hover:bg-gray-50">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">Manage your account details</p>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {[
            { label: "Full Name", field: "name" },
            { label: "Email Address", field: "email" },
            { label: "Mobile Number", field: "mobile" },
            { label: "Address", field: "address" },
            { label: "Role", field: "role" },
            { label: "Password", field: "password" },
          ].map((item) => (
            <div
              key={item.field}
              className="border rounded-lg p-5 hover:shadow transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{item.label}</h3>
                {editField !== item.field && (
                  <button
                    onClick={() => handleEdit(item.field)}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Field Render */}
              {editField === item.field ? (
                <div className="flex flex-col gap-3">
                  {item.field === "password" ? (
                    <>
                      <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        onChange={handleChange}
                        className="border rounded-lg p-2 focus:ring focus:ring-blue-200"
                      />
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="border rounded-lg p-2 focus:ring focus:ring-blue-200"
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="border rounded-lg p-2 focus:ring focus:ring-blue-200"
                      />
                    </>
                  ) : item.field === "role" ? (
                    <select
                      name="role"
                      value={tempData.role}
                      onChange={handleChange}
                      className="border rounded-lg p-2 focus:ring focus:ring-blue-200"
                    >
                      <option value="User">User</option>
                      <option value="Provider">Provider</option>
                    </select>
                  ) : item.field === "address" ? (
                    <textarea
                      name="address"
                      value={tempData.address}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
                    />
                  ) : (
                    <input
                      type="text"
                      name={item.field}
                      value={tempData[item.field]}
                      onChange={handleChange}
                      className="border rounded-lg p-2 w-full focus:ring focus:ring-blue-200"
                    />
                  )}

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleSave(item.field)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditField(null)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : item.field === "password" ? (
                <p className="text-gray-700">******** (hidden)</p>
              ) : (
                <p className="text-gray-700">{profile[item.field]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
