import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { ShoppingCart } from "lucide-react";

// Subcomponents
import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import MoreMenu from "./navbar/MoreMenu";
import ProfileMenu from "./navbar/ProfileMenu";
import MobileNavbar from "./navbar/MobileNavbar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown states
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Selection states
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  const locationRef = useRef(null);
  const moreRef = useRef(null);
  const profileRef = useRef(null);

  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Recent locations list matching design spec #7
  const recentSearches = [
    "Pune, Maharashtra",
    "Mumbai, Maharashtra",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
  ];

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll detection for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const locParam = selectedLocation !== "Select Location" ? `&location=${encodeURIComponent(selectedLocation)}` : "";
    navigate(`/search-results?query=${encodeURIComponent(searchQuery.trim())}${locParam}`);
  };

  const handleSelectCity = (cityName) => {
    setSelectedLocation(cityName);
    setIsLocationOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLocation("Pune, Maharashtra");
          setIsDetectingLocation(false);
          setIsLocationOpen(false);
        },
        (error) => {
          console.warn("Geolocation permission denied or failed:", error);
          setSelectedLocation("Pune, Maharashtra");
          setIsDetectingLocation(false);
          setIsLocationOpen(false);
        }
      );
    } else {
      setSelectedLocation("Pune, Maharashtra");
      setIsDetectingLocation(false);
      setIsLocationOpen(false);
    }
  };

  const filteredLocations = recentSearches.filter((city) =>
    city.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-all duration-200 ${isScrolled
        ? "shadow-[0_2px_12px_rgba(16,24,40,0.08)] border-b border-slate-100"
        : "border-b border-slate-100"
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Desktop Container (Height: 72px per design spec) */}
        <div className="hidden md:flex h-[72px] items-center justify-between gap-4">

          {/* 1. Brand Logo */}
          <Logo isMobile={false} />

          {/* 2. Combined Search & Location Pill Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchSubmit={handleSearchSubmit}
            selectedLocation={selectedLocation}
            locationRef={locationRef}
            isLocationOpen={isLocationOpen}
            setIsLocationOpen={setIsLocationOpen}
            isDetectingLocation={isDetectingLocation}
            locationSearchQuery={locationSearchQuery}
            setLocationSearchQuery={setLocationSearchQuery}
            filteredLocations={filteredLocations}
            handleSelectCity={handleSelectCity}
            handleUseCurrentLocation={handleUseCurrentLocation}
          />

          {/* 3. Action Nav Items (Cart, More, User Profile Menu) */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Shopping Cart with Badge */}
            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className="relative p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-[#00897B] transition-colors select-none group cursor-pointer"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#00897B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                2
              </span>
            </button>

            {/* More Menu Dropdown */}
            <MoreMenu
              isMoreOpen={isMoreOpen}
              setIsMoreOpen={setIsMoreOpen}
              moreRef={moreRef}
            />

            {/* User Profile Menu */}
            <ProfileMenu
              user={user}
              isProfileOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              profileRef={profileRef}
              handleLogout={handleLogout}
            />
          </div>
        </div>

        {/* Mobile Container (Height: 56px per design spec) */}
        <MobileNavbar
          user={user}
          selectedLocation={selectedLocation}
          isLocationOpen={isLocationOpen}
          setIsLocationOpen={setIsLocationOpen}
          isMoreOpen={isMoreOpen}
          setIsMoreOpen={setIsMoreOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDetectingLocation={isDetectingLocation}
          handleUseCurrentLocation={handleUseCurrentLocation}
          recentSearches={recentSearches}
          filteredLocations={filteredLocations}
          handleSelectCity={handleSelectCity}
          handleSearchSubmit={handleSearchSubmit}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Navbar;
