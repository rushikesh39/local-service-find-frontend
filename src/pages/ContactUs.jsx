import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { contact_us } from "../api/auth";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name || !email || !message) {
      Swal.fire("Error", "Name, Email, and Message are required", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await contact_us(formData);
      Swal.fire("Success", res.message || "Message sent!", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.error || "Failed to send", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-gray-200 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Contact Us</h2>
          <div className="mt-2 w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          <p className="text-lg text-gray-600 mt-4">
            Need help? Got feedback? Let us know — we’re here for you!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-white/70 p-5 rounded-xl shadow">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Phone</h4>
                <p className="text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/70 p-5 rounded-xl shadow">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@locafy.in</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/70 p-5 rounded-xl shadow">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Office</h4>
                <p className="text-gray-600">123 Locafy Lane, Pune, Maharashtra</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg mt-4 border border-blue-100">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.012235394855!2d73.8496369148936!3d18.520430087402956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c09f7e7ff2db%3A0xf3f2d015e5b7b1ff!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1641902670860!5m2!1sen!2sin"
                width="100%"
                height="230"
                loading="lazy"
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-blue-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl text-lg font-semibold transition duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
