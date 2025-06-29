// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchServices } from "../api/auth";
import HashLoader from "react-spinners/HashLoader";
import ServiceCard from "./ServiceCard";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const location = queryParams.get("location");
  const query = queryParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await searchServices(query, location);
        console.log("search result",res)
        setResults(res || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query && location) fetchResults();
  }, [query, location]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Search Results for "{query}" in "{location}"
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <HashLoader color="#155dfc" size={60} />
        </div>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {results.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
