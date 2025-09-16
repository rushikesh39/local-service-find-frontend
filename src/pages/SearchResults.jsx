// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchServices } from "../api/auth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ServiceCard from "./ServiceCard";

const SearchResults = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(query,lat,lng)
        setLoading(true);
        const res = await searchServices(query);
        console.log("search result", res);
        setResults(res);
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

      {loading ? (
        // 🔹 Skeleton Loader Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl shadow">
                <Skeleton height={150} className="rounded-xl" />
                <div className="mt-4">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={15} width="60%" className="mt-2" />
                  <Skeleton height={15} width="40%" className="mt-2" />
                </div>
              </div>
            ))}
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          {/* Aesthetic Vector Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 h-64 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M9.75 17.25A7.5 7.5 0 109.75 2.25a7.5 7.5 0 000 15z"
            />
          </svg>
          <h3 className="mt-6 text-xl font-semibold text-gray-700">
            No services found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or explore other categories.
          </p>
        </div>
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
