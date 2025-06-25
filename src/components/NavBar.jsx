import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import {
  CalendarDays,
  UserCircle,
  LogOut,
  Wrench,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.user.user);
  console.log("user",user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const avatarInitial = user?.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <nav className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            ServiceFinder
          </NavLink>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </NavLink>
            <NavLink to="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </NavLink>
            {user?.role === "provider" && (
              <NavLink to="/provider" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </NavLink>
            )}
            <NavLink to="/about-us" className="text-gray-700 hover:text-blue-600">
              About US
            </NavLink>
            <NavLink to="/contact-us" className="text-gray-700 hover:text-blue-600">
              contact Us
            </NavLink>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold focus:outline-none"
                >
                  {avatarInitial}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                    <button
                      onClick={() => handleNavigate("/my-bookings")}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <CalendarDays className="w-4 h-4 mr-2 text-blue-600" />
                      My Bookings
                    </button>
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircle className="w-4 h-4 mr-2 text-gray-700" />
                      My Info
                    </button>

                    {user?.role === "provider" && (
                      <>
                        <div className="border-t my-2 border-gray-100" />
                        <button
                          onClick={() => handleNavigate("/provider")}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <Wrench className="w-4 h-4 mr-2 text-orange-600" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => handleNavigate("/add-service")}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <PlusCircle className="w-4 h-4 mr-2 text-green-600" />
                          Add Service
                        </button>
                        <button
                          onClick={() => handleNavigate("/my-services")}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          <ClipboardList className="w-4 h-4 mr-2 text-indigo-600" />
                          My Services
                        </button>
                      </>
                    )}

                    <div className="border-t my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2 text-red-600" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-inner">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </NavLink>
          <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
            Services
          </NavLink>
          {user?.role === "provider" && (
            <NavLink to="/provider" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
              Dashboard
            </NavLink>
          )}
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
            About
          </NavLink>

          {user && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <button
                onClick={() => handleNavigate("/my-bookings")}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                My Bookings
              </button>
              <button
                onClick={() => handleNavigate("/profile")}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <UserCircle className="w-5 h-5 mr-2 text-gray-700" />
                My Info
              </button>

              {user?.role === "provider" && (
                <>
                  <button
                    onClick={() => handleNavigate("/provider")}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Wrench className="w-5 h-5 mr-2 text-orange-600" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigate("/add-service")}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <PlusCircle className="w-5 h-5 mr-2 text-green-600" />
                    Add Service
                  </button>
                  <button
                    onClick={() => handleNavigate("/my-services")}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <ClipboardList className="w-5 h-5 mr-2 text-indigo-600" />
                    My Services
                  </button>
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-2 text-red-600" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
