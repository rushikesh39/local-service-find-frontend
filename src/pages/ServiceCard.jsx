const ServiceCard = ({ service, onBookNow, onServiceNow }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div
        className="cursor-pointer transition"
        onClick={() => onServiceNow(service)}
      >
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold">{service.name}</h2>
        <p className="text-gray-600">{service.location}</p>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-yellow-600">⭐ {service.rating}</span>
          <span className="font-medium">{service.price}</span>
        </div>
      </div>

      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        onClick={() => onBookNow(service)}
      >
        Book Now
      </button>
    </div>
  );
};

export default ServiceCard;
