// src/components/Navbar.jsx

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user); // assuming user slice

  const renderUserAvatar = () => {
    if (!user || !user.name) return null;
    const initial = user.name.charAt(0).toUpperCase();
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {initial}
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-blue-600">
              ServiceFinder
            </NavLink>
          </div>

          {/* Menu Button for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* NavLinks Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/" className="text-gray-700 hover:text-blue-600">Home</NavLink>
            <NavLink to="/services" className="text-gray-700 hover:text-blue-600">Services</NavLink>
            <NavLink to="/providers" className="text-gray-700 hover:text-blue-600">Providers</NavLink>
            <NavLink to="/about" className="text-gray-700 hover:text-blue-600">About</NavLink>

            {user ? (
              renderUserAvatar()
            ) : (
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ height: isOpen ? "auto" : "0" }}
      >
        <div className="px-4 pb-4">
          <NavLink to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</NavLink>
          <NavLink to="/services" className="block py-2 text-gray-700 hover:text-blue-600">Services</NavLink>
          <NavLink to="/providers" className="block py-2 text-gray-700 hover:text-blue-600">Providers</NavLink>
          <NavLink to="/about" className="block py-2 text-gray-700 hover:text-blue-600">About</NavLink>

          {user ? (
            <div className="mt-4">{renderUserAvatar()}</div>
          ) : (
            <NavLink
              to="/login"
              className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
