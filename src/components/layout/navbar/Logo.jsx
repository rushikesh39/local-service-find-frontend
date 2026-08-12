import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const Logo = ({ isMobile = false }) => {
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center shadow-xs">
          <MapPin className="w-4 h-4 text-white fill-white/20 stroke-[2.5]" />
        </div>
        <span className="text-xl font-bold text-[#0F172A]">Locafy</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
    >
      <div className="w-10 h-10 rounded-full bg-[#00897B] text-white flex items-center justify-center shadow-md shadow-[#00897B]/20 group-hover:scale-105 transition-transform">
        <MapPin className="w-5 h-5 text-white fill-white/20 stroke-[2.5]" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-[#0F172A] group-hover:text-[#00897B] transition-colors">
        Locafy
      </span>
    </div>
  );
};

export default Logo;
