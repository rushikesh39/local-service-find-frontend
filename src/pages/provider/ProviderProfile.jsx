import { useSelector } from "react-redux";

const ProviderProfile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto mt-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mt-2">{user?.name}</h2>
        <p className="text-gray-500 capitalize">{user?.role}</p>
        {user?.isVerified && (
          <p className="text-green-600 text-sm mt-1">✅ Verified</p>
        )}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Google ID:</span>
          <span>{user?.googleId || "Not Linked"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Created At:</span>
          <span>{new Date(user?.createdAt).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Last Updated:</span>
          <span>{new Date(user?.updatedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
