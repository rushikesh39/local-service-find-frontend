import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white text-gray-800 py-12 px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
          About Us
        </h2>

        <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Locafy is your go-to platform for finding trusted local service providers — fast, easy, and secure.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To simplify how people connect with local experts and make everyday services accessible for everyone.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">What We Offer</h3>
            <p className="text-gray-600">
              Verified professionals, instant bookings, transparent reviews, and a seamless user experience.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become India’s most trusted local service marketplace — empowering users and providers alike.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-md md:text-lg text-gray-700">
            Join thousands of happy users and providers using <span className="font-semibold text-blue-600">Locafy</span> to make everyday life easier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
