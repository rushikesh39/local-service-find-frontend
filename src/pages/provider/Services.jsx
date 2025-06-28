import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getServices, deleteServices } from "../../api/auth";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader"; // ✅ Import SyncLoader

const Services = () => {
  const navigate = useNavigate();
  const providerId = useSelector((state) => state.user.user?.id);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(providerId);
        setServices(data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [providerId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await deleteServices(id);
      setServices((prev) => prev.filter((service) => service._id !== id));
      alert("Service deleted successfully.");
    } catch (error) {
      console.error("Failed to delete service:", error);
      alert("Failed to delete service. Please try again.");
    }
  };

  return (
    <div className="p-4 min-h-[70vh] bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Services</h2>
        <NavLink
          to={"add-new-service"}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add New Service
        </NavLink>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <SyncLoader color="#2563eb" size={15} />
        </div>
      ) : services.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-2xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{service.name}</td>
                  <td className="p-3">{service.category}</td>
                  <td className="p-3">{service.location}</td>
                  <td className="p-3 text-center">
                    <NavLink
                      to={`update/${service._id}`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No services found. Click “Add New Service” to get started.
        </div>
      )}
    </div>
  );
};

export default Services;
