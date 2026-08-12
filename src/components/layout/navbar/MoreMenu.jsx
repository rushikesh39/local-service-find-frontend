import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LayoutGrid,
  Briefcase,
  Tag,
  Calendar,
  HelpCircle,
  Gift,
  BookOpen,
  Info,
  Phone,
} from "lucide-react";

const MoreMenu = ({ isMoreOpen, setIsMoreOpen, moreRef }) => {
  const navigate = useNavigate();

  return (
    <div className="relative" ref={moreRef}>
      <button
        type="button"
        onClick={() => setIsMoreOpen(!isMoreOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-[#00897B] hover:bg-slate-50 font-medium text-xs lg:text-sm transition-colors select-none cursor-pointer"
      >
        <LayoutGrid className="w-4 h-4 text-slate-600" />
        <span>More</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isMoreOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* More Menu Card */}
      {isMoreOpen && (
        <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-white py-2 shadow-xl border border-slate-100 z-50 animate-fade-in-down">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Links
          </div>
          <button
            type="button"
            onClick={() => {
              setIsMoreOpen(false);
              navigate("/provider");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] transition-colors text-left cursor-pointer"
          >
            <Phone className="w-4 h-4 text-slate-500" />
            <span>Contact Us</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreMenu;
