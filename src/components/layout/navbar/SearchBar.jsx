import { Search } from "lucide-react";
import LocationDropdown from "./LocationDropdown";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  selectedLocation,
  locationRef,
  isLocationOpen,
  setIsLocationOpen,
  isDetectingLocation,
  locationSearchQuery,
  setLocationSearchQuery,
  filteredLocations,
  handleSelectCity,
  handleUseCurrentLocation,
}) => {
  return (
    <div className="relative flex-1 max-w-2xl mx-2">
      <div className="relative flex items-center w-full rounded-full border border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white focus-within:border-[#00897B] focus-within:ring-2 focus-within:ring-[#00897B]/20 transition-all p-1 shadow-xs">
        
        {/* Location Dropdown Selection */}
        <LocationDropdown
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

        {/* Vertical Divider Pill Separator */}
        <div className="h-5 w-[1px] bg-slate-200 shrink-0 mx-1"></div>

        {/* Search Form Input */}
        <form onSubmit={handleSearchSubmit} className="flex items-center flex-1 min-w-0">
          <Search className="w-4 h-4 text-slate-400 ml-2 mr-1.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What service do you need?"
            className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-xs lg:text-sm font-normal py-1 pr-2"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-9 h-9 rounded-full bg-[#00897B] hover:bg-[#00796B] active:scale-95 text-white flex items-center justify-center transition-all shrink-0 shadow-sm ml-1 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
