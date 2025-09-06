import { IndianRupee } from "lucide-react";

const ServiceCard = ({ service, onBookNow, onServiceNow }) => {
  const renderStars = (rating) => {
    if (!rating || rating <= 0) {
      return (
        <span className="text-sm text-gray-500 italic">
          No rating available
        </span>
      );
    }

    const stars = [];
    const fullStars = Math.floor(rating);
    const decimal = parseFloat((rating - fullStars).toFixed(1));
    const totalStars = 5;

    const getFillPercent = (decimal) => {
      if (decimal >= 0.5) return 100;
      if (decimal >= 0.4) return 80;
      if (decimal >= 0.3) return 60;
      if (decimal >= 0.2) return 40;
      if (decimal >= 0.1) return 20;
      return 0;
    };

    const fillPercent = getFillPercent(decimal);

    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
          </svg>
        );
      } else if (i === fullStars + 1 && fillPercent > 0) {
        // Partial star with gradient
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24">
            <defs>
              <linearGradient
                id={`grad-${rating}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset={`${fillPercent}%`} stopColor="#facc15" />
                <stop offset={`${fillPercent}%`} stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#grad-${rating})`}
              d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
          </svg>
        );
      }
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}/5
        </span>
      </div>
    );
  };

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
        <h2 className="">{service.category}</h2>
        <p className="text-gray-600">
          {typeof service.location === "string"
            ? service.location
            : service.location?.address}
        </p>
        <div className="flex justify-between items-center mt-2">
          {renderStars(service.rating)}
          <span className="flex items-center gap-1 text-black font-medium">
            <IndianRupee size={16} />
            {service.price}
          </span>
        </div>
      </div>

      <button
        className="mt-4 w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={() => onBookNow(service)}
      >
        Book Now
      </button>
    </div>
  );
};

export default ServiceCard;
