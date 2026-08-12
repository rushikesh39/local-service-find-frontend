import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Check,
  Zap,
  ShieldCheck,
  Star,
  Users,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Gift,
  CheckCircle2,
  Headphones,
  Wrench,
  Sparkles,
  Droplets,
  Paintbrush,
  Hammer,
  Scissors,
  Grid,
  ClipboardCheck,
} from "lucide-react";
import Swal from "sweetalert2";

const HeroSection = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("Pune, Maharashtra");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const popularSearches = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "Cleaning",
    "Painting",
  ];

  const popularCategories = [
    {
      id: "plumbing",
      name: "Plumbing",
      pros: "2,340 Pros",
      icon: Droplets,
      bgColor: "bg-blue-50/80 hover:bg-blue-100/80 border-blue-100",
      iconBg: "bg-blue-100 text-blue-600",
      query: "Plumber",
    },
    {
      id: "electrical",
      name: "Electrical",
      pros: "2,560 Pros",
      icon: Zap,
      bgColor: "bg-amber-50/80 hover:bg-amber-100/80 border-amber-100",
      iconBg: "bg-amber-100 text-amber-600",
      query: "Electrician",
    },
    {
      id: "ac-repair",
      name: "AC Repair",
      pros: "1,890 Pros",
      icon: Wrench,
      bgColor: "bg-cyan-50/80 hover:bg-cyan-100/80 border-cyan-100",
      iconBg: "bg-cyan-100 text-cyan-600",
      query: "AC Repair",
    },
    {
      id: "cleaning",
      name: "Cleaning",
      pros: "3,210 Pros",
      icon: Sparkles,
      bgColor: "bg-purple-50/80 hover:bg-purple-100/80 border-purple-100",
      iconBg: "bg-purple-100 text-purple-600",
      query: "Cleaning",
    },
    {
      id: "painting",
      name: "Painting",
      pros: "1,540 Pros",
      icon: Paintbrush,
      bgColor: "bg-emerald-50/80 hover:bg-emerald-100/80 border-emerald-100",
      iconBg: "bg-emerald-100 text-emerald-600",
      query: "Painting",
    },
    {
      id: "carpentry",
      name: "Carpentry",
      pros: "1,230 Pros",
      icon: Hammer,
      bgColor: "bg-orange-50/80 hover:bg-orange-100/80 border-orange-100",
      iconBg: "bg-orange-100 text-orange-600",
      query: "Carpenter",
    },
    {
      id: "salon-spa",
      name: "Salon & Spa",
      pros: "1,980 Pros",
      icon: Scissors,
      bgColor: "bg-rose-50/80 hover:bg-rose-100/80 border-rose-100",
      iconBg: "bg-rose-100 text-rose-600",
      query: "Salon",
    },
    {
      id: "more",
      name: "More",
      pros: "Explore all",
      icon: Grid,
      bgColor: "bg-slate-100/80 hover:bg-slate-200/80 border-slate-200",
      iconBg: "bg-slate-200 text-slate-700",
      query: "",
      isViewAll: true,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search-results?query=${encodeURIComponent(searchQuery.trim())}&location=${encodeURIComponent(selectedLocation)}`);
  };

  const handleCategoryClick = (category) => {
    if (category.isViewAll) {
      navigate("/services");
    } else {
      navigate(`/search-results?query=${encodeURIComponent(category.query)}`);
    }
  };

  const handlePopularPillClick = (query) => {
    setSearchQuery(query);
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText("LOCAFY10");
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Promo Code 'LOCAFY10' copied!",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const scrollSlider = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. MAIN HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Main Copy & Search Bar */}
          <div className="lg:col-span-7 z-10">
            
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E6F4F1] border border-[#00897B]/20 text-[#00897B] font-medium text-xs sm:text-sm mb-6 shadow-xs">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer"
                />
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#00897B] fill-[#00897B] text-white shrink-0" />
              <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                Trusted by <span className="text-[#00897B]">1M+</span> happy customers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#0F172A] mb-4">
              Find Trusted <br className="hidden sm:inline" />
              <span className="text-[#00897B] bg-gradient-to-r from-[#00897B] to-[#00a884] bg-clip-text text-transparent">
                Local Service Providers
              </span>{" "}
              Near You
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mb-6 leading-relaxed font-normal">
              Locafy connects you with verified professionals for every kind of home and local need.
            </p>

            {/* Feature Bullets */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-semibold text-slate-700 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#00897B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>Secure Payments</span>
              </div>
            </div>

            {/* Embedded Search & Location Bar Pill Card */}
            <div className="bg-white p-2 rounded-3xl sm:rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 mb-6 max-w-2xl">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
                
                {/* Location Select Button */}
                <div className="relative w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                    className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-2.5 rounded-full hover:bg-slate-50 text-slate-800 font-medium text-xs sm:text-sm transition-colors border border-slate-100 sm:border-none"
                  >
                    <div className="flex items-center gap-2 truncate max-w-[170px]">
                      <MapPin className="w-4 h-4 text-[#00897B] shrink-0" />
                      <span className="truncate">{selectedLocation}</span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>

                  {/* Dropdown Options */}
                  {isLocationDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-white p-3 shadow-xl border border-slate-100 z-50 animate-fade-in-down">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                        Select City
                      </div>
                      {["Pune, Maharashtra", "Mumbai, Maharashtra", "Bangalore, Karnataka", "Hyderabad, Telangana"].map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(city);
                            setIsLocationDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                            selectedLocation === city ? "bg-[#E6F4F1] text-[#00897B]" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{city}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider Line */}
                <div className="hidden sm:block h-6 w-[1px] bg-slate-200 my-auto"></div>

                {/* Search Input */}
                <div className="flex-1 flex items-center gap-2 w-full px-3 py-1">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What service do you need?"
                    className="w-full bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-medium py-1"
                  />
                </div>

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#00897B] hover:bg-[#00796B] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#00897B]/20 shrink-0"
                >
                  Search Now
                </button>
              </form>
            </div>

            {/* Popular Searches Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                Popular Searches:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularPillClick(term)}
                  className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#E6F4F1] border border-slate-200/80 hover:border-[#00897B]/30 text-slate-700 hover:text-[#00897B] text-xs font-medium transition-all shadow-2xs"
                >
                  {term}
                </button>
              ))}
              <button
                type="button"
                onClick={() => navigate("/services")}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600 hover:text-slate-900 text-xs font-medium transition-all flex items-center gap-1"
              >
                <span>More</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Hero Illustration & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            
            {/* Circular Green Background Graphic */}
            <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-[#E6F4F1] via-[#d4eee8] to-[#bce5dc] absolute -z-10 shadow-inner"></div>

            {/* Professional Provider Image */}
            <div className="relative z-10 max-w-[340px] sm:max-w-[420px] drop-shadow-xl">
              <img
                src="/hero-provider.png"
                alt="Locafy Professional Service Provider"
                className="w-full h-auto object-contain pointer-events-none transform hover:scale-102 transition-transform duration-300"
              />
            </div>

            {/* Floating Card 1: Fast Booking (Top Left) */}
            <div className="absolute top-4 left-0 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce-slow">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-emerald-500 text-emerald-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Fast Booking</div>
                <div className="text-[10px] text-slate-500 font-medium">Average booking in just 2 mins</div>
              </div>
            </div>

            {/* Floating Card 2: Verified Pros (Middle Left) */}
            <div className="absolute bottom-28 left-0 sm:-left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E6F4F1] text-[#00897B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Verified Pros</div>
                <div className="text-[10px] text-slate-500 font-medium">All professionals background verified</div>
              </div>
            </div>

            {/* Floating Card 3: Top Rated (Top Right) */}
            <div className="absolute top-12 right-0 sm:-right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Top Rated</div>
                <div className="text-[10px] text-slate-500 font-medium">4.8/5 average customer rating</div>
              </div>
            </div>

            {/* Floating Card 4: Happy Customers (Middle Right) */}
            <div className="absolute bottom-32 right-0 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Happy Customers</div>
                <div className="text-[10px] text-slate-500 font-medium">98% customers recommend us</div>
              </div>
            </div>

            {/* Floating Promo Coupon Card (Bottom Center/Right overlay) */}
            <div className="absolute bottom-2 right-2 sm:right-6 z-30 bg-[#0F4C44] text-white rounded-2xl px-4 py-2.5 shadow-xl border border-emerald-700/50 flex items-center gap-3 max-w-sm">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">Get 10% OFF</span> on your first booking
              </div>
              <button
                type="button"
                onClick={handleCopyPromo}
                className="ml-auto bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1 transition-all shrink-0"
              >
                <span>Code: LOCAFY10</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER STRIP BANNER */}
      <section className="bg-white border-y border-slate-100 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
          
          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-11 h-11 rounded-2xl bg-[#E6F4F1] text-[#00897B] flex items-center justify-center shrink-0 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A]">1M+</div>
              <div className="text-xs text-slate-500 font-medium">Happy Customers</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A]">15K+</div>
              <div className="text-xs text-slate-500 font-medium">Verified Professionals</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A]">2.5M+</div>
              <div className="text-xs text-slate-500 font-medium">Services Completed</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 rounded-xl">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A]">50+</div>
              <div className="text-xs text-slate-500 font-medium">Service Categories</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 rounded-xl col-span-2 md:col-span-1">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-[#0F172A]">24x7</div>
              <div className="text-xs text-slate-500 font-medium">Customer Support</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POPULAR SERVICE CATEGORIES SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Popular Service Categories
            </h2>
          </div>

          {/* Controls & View All Link */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#00796B] transition-colors group mr-2"
            >
              <span>View all categories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Slider Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                aria-label="Previous categories"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider("right")}
                aria-label="Next categories"
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Carousel / Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto scrollbar-none pb-2"
        >
          {popularCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer group shadow-2xs hover:shadow-md ${cat.bgColor}`}
              >
                {/* Category Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${cat.iconBg}`}
                >
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Category Title */}
                <h3 className="text-sm font-bold text-slate-900 mb-0.5 text-center group-hover:text-[#00897B] transition-colors">
                  {cat.name}
                </h3>

                {/* Pros count / Subtext */}
                <span className="text-[11px] font-medium text-slate-500 text-center">
                  {cat.pros}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
