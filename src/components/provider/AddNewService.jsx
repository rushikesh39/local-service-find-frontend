import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewServices } from "../../api/auth";

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
    type: "",
    location: "",
    description: "",
    price: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  // Filter service options based on search term
  const filteredOptions = serviceOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files && files[0];

      if (!file) {
        setError("Please select an image.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Selected file must be an image.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB.");
        return;
      }

      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
      setError("");
    } else if (name === "type") {
      setFormData((prev) => ({ ...prev, type: value }));
      setSearchTerm(""); // reset search on selection
      if (error) setError("");
    } else if (name === "serviceSearch") {
      setSearchTerm(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (error) setError("");
    }
  };

  const validateInputs = () => {
    const { name, type, location, description, price, image } = formData;
    if (!name.trim()) return "Service name is required.";
    if (!type.trim()) return "Service type is required.";
    if (!location.trim()) return "Location is required.";
    if (!description.trim()) return "Description is required.";
    if (!price || Number(price) <= 0) return "Price must be a positive number.";
    if (!image) return "Service image is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const serviceData = new FormData();
      serviceData.append("name", formData.name.trim());
      serviceData.append("category", formData.type.trim()); // Backend expects 'category'
      serviceData.append("location", formData.location.trim());
      serviceData.append("description", formData.description.trim());
      serviceData.append("price", formData.price);
      serviceData.append("image", formData.image);

      console.log("Sending data:", Object.fromEntries(serviceData.entries()));

      await addNewServices(serviceData);

      alert("Service added successfully!");
      navigate("/provider/services");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong while adding the service.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-2xl p-6 w-full max-w-2xl mx-auto"
      noValidate
      aria-live="polite"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>

      {error && (
        <div className="mb-4 text-red-600 text-sm" role="alert" aria-atomic="true">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Service Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. AC Repair"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="serviceSearch" className="block text-sm font-medium mb-1">
            Search Service Type
          </label>
          <input
            type="text"
            id="serviceSearch"
            name="serviceSearch"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search service type..."
            className="w-full border border-gray-300 rounded-md p-2 mb-1"
            aria-label="Search service type"
          />
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            aria-required="true"
            size={filteredOptions.length > 5 ? 5 : filteredOptions.length}
          >
            {filteredOptions.length === 0 && (
              <option disabled>No matching services</option>
            )}
            {filteredOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Pune"
            className="w-full border border-gray-300 rounded-md p-2"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 499"
            className="w-full border border-gray-300 rounded-md p-2"
            min="1"
            required
            aria-required="true"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the service"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            aria-required="true"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Service Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            aria-required="true"
            aria-describedby="image-desc"
            className="block w-full text-sm text-gray-600"
          />
          <p id="image-desc" className="text-xs text-gray-500 mt-1">
            Max size: 2MB. Allowed types: JPG, PNG, GIF, etc.
          </p>

          {previewImage && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">Preview:</p>
              <img
                src={previewImage}
                alt="Service Preview"
                className="max-w-xs max-h-48 rounded border"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition"
        aria-busy={loading}
      >
        {loading ? "Adding Service..." : "Add Service"}
      </button>
    </form>
  );
};

export default AddServiceForm;
