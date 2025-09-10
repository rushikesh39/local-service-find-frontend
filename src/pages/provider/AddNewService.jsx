import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewServices } from "../../api/auth";
import Swal from "sweetalert2";
import { Upload, X, MapPin } from "lucide-react";

const serviceOptions = [
  { value: "AC Repair", label: "AC Repair" },
  { value: "Appliance Repair", label: "Appliance Repair" },
  { value: "Automobile Services", label: "Automobile Services" },
  { value: "Baby Sitting", label: "Baby Sitting" },
  { value: "Beauty Services", label: "Beauty Services" },
  { value: "Car Cleaning", label: "Car Cleaning" },
  { value: "Carpentry", label: "Carpentry" },
  { value: "Catering", label: "Catering" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Computer Repair", label: "Computer Repair" },
  { value: "Cook Services", label: "Cook Services" },
  { value: "Driver on Call", label: "Driver on Call" },
  { value: "Electrician", label: "Electrician" },
  { value: "Event Management", label: "Event Management" },
  { value: "Fitness Trainer", label: "Fitness Trainer" },
  { value: "Gardening", label: "Gardening" },
  { value: "Home Automation", label: "Home Automation" },
  { value: "Home Cleaning", label: "Home Cleaning" },
  { value: "Home Tutor", label: "Home Tutor" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "Laundry", label: "Laundry" },
  { value: "Massage Therapy", label: "Massage Therapy" },
  { value: "Mechanic", label: "Mechanic" },
  { value: "Painter", label: "Painter" },
  { value: "Pest Control", label: "Pest Control" },
  { value: "Pet Care", label: "Pet Care" },
  { value: "Photographer", label: "Photographer" },
  { value: "Plumber", label: "Plumber" },
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Security Services", label: "Security Services" },
  { value: "Tailoring", label: "Tailoring" },
  { value: "Technician", label: "Technician" },
  { value: "Vehicle Towing", label: "Vehicle Towing" },
  { value: "Water Purifier Services", label: "Water Purifier Services" },
  { value: "Web Development", label: "Web Development" },
  { value: "Yoga Instructor", label: "Yoga Instructor" },
  { value: "Other", label: "Other" },
];

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
    coordinates: null,
    address: "",
  });

  const [error, setError] = useState("");
  const [locating, setLocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredOptions = serviceOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Get user location + reverse geocode
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      return setError("Geolocation is not supported by your browser.");
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Reverse Geocoding with OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          setFormData((prev) => ({
            ...prev,
            coordinates: [longitude, latitude],
            address: data.display_name || "Unknown Address",
          }));
          setError("");
           setLocating(false);
        } catch (err) {
          setError("Failed to fetch address. Please try again.");
          setLocating(false);
        }
      },
      (err) => {
        setError("Unable to fetch location. Please allow location access.");
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];
      if (!file) return setError("Please select an image.");
      if (!file.type.startsWith("image/"))
        return setError("File must be an image.");
      if (file.size > 2 * 1024 * 1024)
        return setError("Image must be less than 2MB.");
      setFormData((prev) => ({ ...prev, image: file }));
      setError("");
    } else if (name === "category") {
      setFormData((prev) => ({ ...prev, category: value }));
      setSearchTerm("");
    } else if (name === "serviceSearch") {
      setSearchTerm(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError("");
    }
  };

  const validateInputs = () => {
    const { name, category, description, price, image, coordinates } = formData;
    if (!name.trim()) return "Service name is required.";
    if (!category.trim()) return "Service category is required.";
    if (!coordinates) return "Please fetch your location.";
    if (!description.trim()) return "Description is required.";
    if (!price || Number(price) <= 0) return "Price must be a positive number.";
    if (!image) return "Service image is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) return setError(validationError);

    setError("");
    setLoading(true);

    try {
      const serviceData = new FormData();
      serviceData.append("name", formData.name.trim());
      serviceData.append("category", formData.category.trim());
      serviceData.append("description", formData.description.trim());
      serviceData.append("price", formData.price);
      serviceData.append("image", formData.image);
      serviceData.append("coordinates", JSON.stringify(formData.coordinates));
      serviceData.append("address", formData.address);

      await addNewServices(serviceData);

      Swal.fire({
        title: "Success!",
        text: "Service added successfully.",
        icon: "success",
        confirmButtonText: "Go to My Services",
      }).then(() => navigate("/provider/services"));
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong while adding the service.";
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-2xl p-6 w-full max-w-2xl mx-auto"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm" role="alert">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. AC Repair"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Service Category with Search */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Search Service Category
          </label>
          <input
            type="text"
            name="serviceSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search service category..."
            className="w-full border border-gray-300 rounded-md p-2 mb-1"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            {filteredOptions.length === 0 && (
              <option disabled>No matching services</option>
            )}
            {filteredOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}

            {!filteredOptions.find((opt) => opt.value === formData.category) &&
              formData.category && (
                <option value={formData.category}>{formData.category}</option>
              )}
          </select>
        </div>

        {/* Location (Auto Detect) */}
        <div>
          {/* Address Input */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">
              Service Location
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter or click Get Location"
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating} // ✅ Disable during fetch
            className={`w-full flex items-center justify-center gap-2 
    ${
      locating
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
    } 
    px-3 py-2 rounded-md text-sm mt-6`}
          >
            <MapPin className="w-4 h-4" />
            {locating ? "Fetching Location..." : "Get Location"}
          </button>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 499"
            min="1"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the service"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Service Image */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Service Image
          </label>
          {!formData.image && (
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 border border-dashed border-blue-300 rounded-md p-4 text-blue-700 cursor-pointer transition"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Service Image (Max 2MB)</span>
            </label>
          )}

          <input
            type="file"
            id="fileUpload"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            required
          />

          {formData.image && (
            <div className="mt-2 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-700">
              <span className="truncate">{formData.image.name}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: null }))
                }
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Adding Service..." : "Add Service"}
      </button>
    </form>
  );
};

export default AddServiceForm;
