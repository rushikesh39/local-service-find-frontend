import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronDown } from "lucide-react";

const Footer = () => {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const footerSections = [
    {
      key: "company",
      title: "Company",
      links: [
        { label: "About Us", path: "/about-us" },
        { label: "Careers", path: "/careers" },
        { label: "Blogs", path: "/blogs" },
        { label: "Press", path: "/press" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
      ],
    },
    {
      key: "customers",
      title: "For Customers",
      links: [
        { label: "Search Services", path: "/services" },
        { label: "Locafy App", path: "/app" },
        { label: "Offers & Deals", path: "/offers" },
        { label: "Gift Cards", path: "/gift-cards" },
        { label: "Safety First", path: "/safety" },
      ],
    },
    {
      key: "professionals",
      title: "For Professionals",
      links: [
        { label: "Become a Provider", path: "/provider" },
        { label: "Provider Dashboard", path: "/provider" },
        { label: "Partner Stories", path: "/stories" },
        { label: "Community", path: "/community" },
      ],
    },
    {
      key: "support",
      title: "Support",
      links: [
        { label: "Help Center", path: "/contact-us" },
        { label: "Contact Us", path: "/contact-us" },
        { label: "COVID Guidelines", path: "/guidelines" },
        { label: "Report Issue", path: "/contact-us" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-12 pb-16 md:pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-8 border-b border-slate-800">
          
          {/* Brand info column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#00897B] text-white flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5 fill-white text-[#00897B]" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Locafy</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Your trusted platform to find and book local service professionals near you. Verified experts, instant booking, and guaranteed quality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#00897B] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#00897B] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#00897B] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-[#00897B] text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Desktop Link Columns */}
          <div className="hidden md:grid lg:col-span-8 grid-cols-4 gap-6">
            {footerSections.map((sec) => (
              <div key={sec.key}>
                <h4 className="text-white font-bold text-sm mb-4">{sec.title}</h4>
                <ul className="space-y-2.5 text-xs text-slate-400">
                  {sec.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="hover:text-[#00897B] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Link Accordions */}
          <div className="md:hidden lg:col-span-8 space-y-2">
            {footerSections.map((sec) => {
              const isOpen = openAccordions[sec.key];
              return (
                <div key={sec.key} className="border-b border-slate-800 pb-2">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(sec.key)}
                    className="w-full flex items-center justify-between py-2 text-white text-sm font-semibold"
                  >
                    <span>{sec.title}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <ul className="space-y-2 pt-1 pb-2 pl-2 text-xs text-slate-400">
                      {sec.links.map((link) => (
                        <li key={link.label}>
                          <Link to={link.path} className="hover:text-[#00897B]">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Locafy Inc. All rights reserved. Made with ❤️ for local services.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-400">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms</Link>
            <Link to="/contact-us" className="hover:text-slate-400">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
