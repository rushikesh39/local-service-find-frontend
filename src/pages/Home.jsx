import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  Tag,
  ChevronRight,
  Heart,
  Clock,
  MapPin,
  CheckCircle,
  Smartphone,
  QrCode,
  Search,
  UserCheck,
  CalendarCheck,
  Home as HomeIcon,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  Award,
  DollarSign,
  Lock,
  Headphones,
  Check,
} from "lucide-react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import HeroSection from "../components/comman/HeroSection";
import { popularServices, topRatedServices } from "../api/auth";

const Home = () => {
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  // Sample static data matching design spec screens
  const topProfessionals = [
    {
      id: "pro1",
      name: "Rahul Sharma",
      role: "Electrician",
      rating: 4.9,
      reviews: 785,
      response: "5 min",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: "pro2",
      name: "Amit Verma",
      role: "Plumber",
      rating: 4.8,
      reviews: 632,
      response: "10 min",
      image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: "pro3",
      name: "Sanjay Patil",
      role: "AC Technician",
      rating: 4.9,
      reviews: 540,
      response: "7 min",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: "pro4",
      name: "Vikram Singh",
      role: "Carpenter",
      rating: 4.7,
      reviews: 412,
      response: "15 min",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    },
  ];

  const popularServicesData = [
    {
      _id: "s1",
      name: "AC Installation & Service",
      category: "AC Repair",
      rating: 4.8,
      numReviews: 120,
      price: 799,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
    },
    {
      _id: "s2",
      name: "Plumbing Leakage Repair",
      category: "Plumbing",
      rating: 4.7,
      numReviews: 98,
      price: 499,
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80",
    },
    {
      _id: "s3",
      name: "Full Home Deep Cleaning",
      category: "Cleaning",
      rating: 4.9,
      numReviews: 210,
      price: 1299,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80",
    },
    {
      _id: "s4",
      name: "Complete Wall Painting",
      category: "Painting",
      rating: 4.8,
      numReviews: 165,
      price: 1999,
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=80",
    },
  ];

  const popularAreas = [
    { name: "Baner", pros: "1,240 Pros", image: "https://images.unsplash.com/photo-1477959858617-67f30ac4fe00?w=300&auto=format&fit=crop&q=80" },
    { name: "Hinjewadi", pros: "2,340 Pros", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&auto=format&fit=crop&q=80" },
    { name: "Kothrud", pros: "1,890 Pros", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=300&auto=format&fit=crop&q=80" },
  ];

  const loadServices = async () => {
    try {
      const pData = await popularServices();
      if (pData && pData.length > 0) setPopular(pData);
      else setPopular(popularServicesData);

      const tData = await topRatedServices();
      if (tData && tData.length > 0) setTopRated(tData);
      else setTopRated(popularServicesData);
    } catch (err) {
      console.warn("Using fallback service data", err);
      setPopular(popularServicesData);
      setTopRated(popularServicesData);
    } finally {
      setLoadingPopular(false);
      setLoadingTopRated(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleBookNow = (service) => {
    navigate(`/book/${service._id || service.id}`);
  };

  const handleCardClick = (service) => {
    navigate(`/service/${service._id || service.id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION & CATEGORIES */}
      <HeroSection />

      {/* 2. POPULAR SERVICES NEAR YOU */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            Popular Services Near You
          </h2>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#00796B] flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingPopular ? (
            Array(4)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
                  <Skeleton height={160} className="rounded-xl" />
                  <Skeleton width="75%" height={20} />
                  <Skeleton width="50%" height={16} />
                </div>
              ))
          ) : (
            popular.slice(0, 4).map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80"}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#00897B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      Popular
                    </span>
                    <button
                      type="button"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs text-slate-600 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1 group-hover:text-[#00897B] transition-colors">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{service.rating || 4.8}</span>
                      </div>
                      <span>({service.numReviews || 120})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-50 pt-3">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Starting from</div>
                    <div className="text-base font-extrabold text-[#0F172A]">
                      ₹{service.price || 499}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleBookNow(service)}
                    className="px-4 py-2 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 3. BOOK SERVICES ON THE GO (APP BANNER) */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#0F4C44] to-[#0A332E] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Book Services On The Go
            </h2>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Easy Booking in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Real-time Professional Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-100 font-medium">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>100% Secure &amp; Protected Payments</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => Swal.fire("App Link Sent!", "Download link sent to your registered number.", "success")}
              className="px-6 py-3 rounded-full bg-white text-[#0F4C44] hover:bg-emerald-50 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>Download App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-5 relative flex justify-center z-10">
            <div className="w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&auto=format&fit=crop&q=80"
                alt="Locafy Mobile App"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP RATED PROFESSIONALS */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            Top Rated Professionals
          </h2>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-semibold text-[#00897B] hover:text-[#00796B] flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topProfessionals.map((pro) => (
            <div
              key={pro.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-slate-900 text-sm">{pro.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-[#00897B] fill-[#E6F4F1]" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mb-1">{pro.role}</div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{pro.rating}</span>
                      <span className="text-slate-400 font-normal">({pro.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 text-[11px] text-slate-600 font-medium mb-4 flex items-center justify-between">
                  <span>Response Time:</span>
                  <span className="font-bold text-[#00897B]">in {pro.response}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/services`)}
                className="w-full py-2 rounded-xl bg-[#E6F4F1] hover:bg-[#00897B] text-[#00897B] hover:text-white font-bold text-xs transition-colors"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BECOME A SERVICE PROVIDER BANNER */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950">
              Become a Service Provider
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 font-medium leading-relaxed">
              Join thousands of professionals and grow your business with Locafy. Get instant customer bookings in your area.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/provider")}
            className="px-6 py-3 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Join as Provider</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. WHY CHOOSE LOCAFY? */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-6">
          Why Choose Locafy?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6F4F1] text-[#00897B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Verified Professionals</div>
                <div className="text-[11px] text-slate-500 font-medium">All pros are background verified</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Affordable Pricing</div>
                <div className="text-[11px] text-slate-500 font-medium">Transparent pricing with no hidden charges</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">Secure Payments</div>
                <div className="text-[11px] text-slate-500 font-medium">100% secure payments</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">24/7 Support</div>
                <div className="text-[11px] text-slate-500 font-medium">We're here to help you anytime</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </section>

      {/* 7. WHAT OUR CUSTOMERS SAY */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            What Our Customers Say
          </h2>
          <span className="text-xs font-semibold text-[#00897B]">View all</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm max-w-2xl">
          <div className="flex items-center gap-1 text-amber-400 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <p className="text-slate-700 text-xs sm:text-sm font-medium italic mb-4 leading-relaxed">
            "Booked cleaning service for my home. The staff was very polite and did an amazing job. Will definitely use Locafy again!"
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
              alt="Sneha Kulkarni"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900">Sneha Kulkarni</div>
              <div className="text-[11px] text-slate-400">Pune</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EXCLUSIVE OFFERS & HOW IT WORKS */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Exclusive Offers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-[#0F172A]">Exclusive Offers</h3>
            <span className="text-xs font-semibold text-[#00897B]">View all</span>
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-1">AC Service</div>
            <div className="text-2xl font-black mb-1">Flat 15% OFF</div>
            <div className="text-xs text-purple-100 font-medium mb-4">On AC Repair &amp; Installation</div>
            <span className="inline-block bg-white/20 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold">
              Code: COOL15
            </span>
          </div>
        </div>

        {/* How It Works Timeline */}
        <div>
          <h3 className="text-lg font-extrabold text-[#0F172A] mb-4">How It Works</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#00897B] text-white text-xs font-bold flex items-center justify-center shrink-0">01</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Search Service</div>
                <div className="text-[11px] text-slate-500">Search for the service you need</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#00897B] text-white text-xs font-bold flex items-center justify-center shrink-0">02</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Choose Provider</div>
                <div className="text-[11px] text-slate-500">Compare &amp; select the best professional</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-3 rounded-2xl border border-slate-100">
              <span className="w-7 h-7 rounded-full bg-[#00897B] text-white text-xs font-bold flex items-center justify-center shrink-0">03</span>
              <div>
                <div className="text-xs font-bold text-slate-900">Book &amp; Pay</div>
                <div className="text-[11px] text-slate-500">Schedule your slot and pay securely</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. POPULAR IN YOUR AREA */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            Popular in Your Area
          </h2>
          <span className="text-xs font-semibold text-[#00897B]">View all</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {popularAreas.map((area) => (
            <div key={area.name} className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 shadow-xs">
              <img src={area.image} alt={area.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{area.name}</h4>
                <div className="text-xs text-slate-500 font-medium">{area.pros}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
