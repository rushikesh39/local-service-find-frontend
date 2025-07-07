import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 p-4 ">
       {/*<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
   
        <div>
          <h2 className="text-2xl font-bold text-white">LocalServiceFinder</h2>
          <p className="mt-2 text-sm text-gray-400">
            Helping you find trusted services quickly and easily across your city.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div> */}

      <div className="text-center text-gray-500 text-sm ">
        © {new Date().getFullYear()} LocalServiceFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
