import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="z-10 max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Opps! you’re on the wrong place.
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Can’t find what you need? Take a moment and do a search below <br />
          or start from our Homepage.
        </p>
        <Link
          to="/"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-3 rounded-full transition"
        >
          Back to home
        </Link>
        <div className="mt-10 flex justify-center">
          <img
            src="https://html.creativegigstf.com/jano/jano/images/assets/ils_06.svg"
            alt="Illustration"
          />
        </div>
      </div>

      <img
        src="https://html.creativegigstf.com/jano/jano/images/shape/shape_178.svg"
        alt="Background Shape"
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
};

export default ErrorPage;
