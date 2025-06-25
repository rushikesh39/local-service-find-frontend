import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-white text-gray-800 py-12 px-4 md:px-10 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
          Contact Us
        </h2>

        <p className="text-lg text-gray-600 mb-10 text-center">
          Have a question or need help? Reach out to our team — we're here to assist you!
        </p>

        <form className="grid gap-6 md:grid-cols-2">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject (full width) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message (full width) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
