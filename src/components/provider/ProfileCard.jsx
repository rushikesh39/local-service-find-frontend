const ProfileCard = () => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 text-center">
      <img
        className="w-24 h-24 mx-auto rounded-full mb-2"
        src="https://via.placeholder.com/150"
        alt="Provider"
      />
      <h3 className="text-lg font-semibold">Rushikesh Thange</h3>
      <p className="text-gray-500 text-sm">Pune, Maharashtra</p>
      <button className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
