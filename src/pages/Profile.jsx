import { useSelector } from "react-redux";
import { BadgeCheck, ShieldCheck, Mail, User, UserCheck } from "lucide-react";

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <p className="text-center mt-20 text-gray-500">No user logged in.</p>;
  }

  return (
    <div className="min-h-[50vh] bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Profile Details
          </h2>
          {user.isVerified && (
            <span className="inline-flex items-center text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 mr-1" />
              Verified
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-medium text-gray-800">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-medium text-gray-800 capitalize">{user.role}</p>
            </div>
          </div>

          {user.googleId && (
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5"
              />
              <div>
                <p className="text-sm text-gray-500">Google ID</p>
                <p className="text-sm text-gray-700 break-all">{user.googleId}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-medium text-gray-800">{user.address}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
