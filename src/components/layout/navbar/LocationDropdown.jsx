import { MapPin, ChevronDown, LocateFixed, Search } from "lucide-react";

const LocationDropdown = ({
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
    <div className="relative" ref={locationRef}>
      <button
        type="button"
        onClick={() => setIsLocationOpen(!isLocationOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs lg:text-sm font-medium text-slate-800 hover:text-[#00897B] transition-colors rounded-full shrink-0 select-none max-w-[180px] lg:max-w-[210px] truncate cursor-pointer"
      >
        <MapPin className="w-4 h-4 text-[#00897B] shrink-0" />
        <span className="truncate">{selectedLocation}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isLocationOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Location Dropdown Card (Design Spec #7) */}
      {isLocationOpen && (
        <div className="absolute left-0 top-full mt-3 w-80 rounded-2xl bg-white p-4 shadow-xl border border-slate-100 z-50 animate-fade-in-down">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Select Your Location
          </h4>

          {/* Detect current location button */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isDetectingLocation}
            className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#E6F4F1]/70 transition-colors text-left group border border-transparent hover:border-[#00897B]/20 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F4F1] text-[#00897B] flex items-center justify-center shrink-0 group-hover:bg-[#00897B] group-hover:text-white transition-colors">
              <LocateFixed className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs lg:text-sm font-semibold text-slate-900 group-hover:text-[#00897B]">
                {isDetectingLocation ? "Detecting location..." : "Use Current Location"}
              </div>
              <div className="text-[11px] text-slate-500">
                Detect my current location
              </div>
            </div>
          </button>

          {/* OR Divider */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <span className="relative bg-white px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              OR
            </span>
          </div>

          {/* City Search Box */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search city or area"
              value={locationSearchQuery}
              onChange={(e) => setLocationSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#00897B] focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Recent Searches Header */}
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
            Recent Searches
          </div>

          {/* City Options List */}
          <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                    selectedLocation === city
                      ? "bg-[#E6F4F1] text-[#00897B] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#00897B]"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{city}</span>
                </button>
              ))
            ) : (
              <div className="py-3 text-center text-xs text-slate-400">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
