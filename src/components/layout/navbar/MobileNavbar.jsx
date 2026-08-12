import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ShoppingCart,
  LayoutGrid,
  User,
  ChevronDown,
  Search,
  X,
  LocateFixed,
  Briefcase,
  Tag,
  Calendar,
  HelpCircle,
  Gift,
  BookOpen,
  Info,
  Phone,
  Heart,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

const MobileNavbar = ({
  user,
  selectedLocation,
  isLocationOpen,
  setIsLocationOpen,
  isMoreOpen,
  setIsMoreOpen,
  isProfileOpen,
  setIsProfileOpen,
  searchQuery,
  setSearchQuery,
  isDetectingLocation,
  handleUseCurrentLocation,
  recentSearches,
  filteredLocations,
  handleSelectCity,
  handleSearchSubmit,
  handleLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex md:hidden flex-col py-2.5 gap-2">
      {/* Mobile Top Header Row */}
      <div className="flex h-10 items-center justify-between gap-2">
        {/* Mobile Logo */}
        <Logo isMobile={true} />

        {/* Mobile Actions */}
        <div className="flex items-center gap-1.5">
          {/* Cart */}
          <button
            type="button"
            onClick={() => navigate("/my-bookings")}
            className="relative p-1.5 rounded-full hover:bg-slate-100 text-slate-700 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#00897B] text-white text-[9px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          {/* Grid / More */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          {/* User Avatar or Profile */}
          {user ? (
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer"
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : "R"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Combined Search & Location Pill Bar (Design Spec #5, #6) */}
      <div className="w-full">
        <div className="relative flex items-center w-full rounded-full border border-slate-200 bg-slate-50 p-1 shadow-xs">
          {/* Location Select Button */}
          <button
            type="button"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-800 shrink-0 max-w-[130px] truncate cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00897B] shrink-0" />
            <span className="truncate">{selectedLocation}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 shrink-0 mx-1"></div>

          {/* Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service do you need?"
              className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-xs py-1 pr-1"
            />
            <button
              type="submit"
              aria-label="Search"
              className="w-7 h-7 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0 ml-1 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Location Dropdown Drawer Modal */}
      {isLocationOpen && (
        <div className="fixed inset-0 top-[110px] bg-slate-900/40 backdrop-blur-xs z-50 flex justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl border border-slate-100 h-fit max-h-[80vh] overflow-y-auto animate-fade-in-down">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select Your Location
              </h4>
              <button onClick={() => setIsLocationOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isDetectingLocation}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#E6F4F1]/60 text-left mb-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                <LocateFixed className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  {isDetectingLocation ? "Detecting location..." : "Use Current Location"}
                </div>
                <div className="text-[10px] text-slate-500">Detect my current location</div>
              </div>
            </button>

            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Recent Searches
              </div>
              {recentSearches.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left cursor-pointer ${
                    selectedLocation === city
                      ? "bg-[#E6F4F1] text-[#00897B] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile More Options Dropdown Drawer Modal */}
      {isMoreOpen && (
        <div className="fixed inset-0 top-[110px] bg-slate-900/40 backdrop-blur-xs z-50 flex justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl border border-slate-100 h-fit max-h-[80vh] overflow-y-auto animate-fade-in-down">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Links / More Options
              </h4>
              <button onClick={() => setIsMoreOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/provider");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span>Become a Provider</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/offers");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Tag className="w-4 h-4 text-slate-500" />
                <span>Offers &amp; Deals</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/my-bookings");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Track Booking</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/contact-us");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>Help Center</span>
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/gift-cards");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Gift className="w-4 h-4 text-slate-500" />
                <span>Gift Cards</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/blogs");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Blogs</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/about-us");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Info className="w-4 h-4 text-slate-500" />
                <span>About Us</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMoreOpen(false);
                  navigate("/contact-us");
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-xl transition-colors text-left cursor-pointer"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown Modal */}
      {isProfileOpen && user && (
        <div className="fixed inset-0 top-[110px] bg-slate-900/40 backdrop-blur-xs z-50 flex justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl border border-slate-100 h-fit max-h-[80vh] overflow-y-auto animate-fade-in-down">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00897B] text-white flex items-center justify-center font-bold text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "R"}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{user?.name || "Rushi Thange"}</div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="text-xs text-[#00897B] font-medium cursor-pointer"
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <button onClick={() => setIsProfileOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/my-bookings");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>My Bookings</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/wishlist");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <Heart className="w-4 h-4 text-slate-500" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/addresses");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Addresses</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/payments");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>Payments</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/notifications");
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-slate-500" />
                  <span>Notifications</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#00897B] text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-red-500 mt-2 border-t border-slate-100 pt-3 cursor-pointer hover:bg-red-50 rounded-lg transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
