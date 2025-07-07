import React, { useState, useEffect } from "react";

// Testimonials data
const testimonials = [
  {
    quote: "Locafy helped me find a reliable electrician in minutes. The experience was seamless and stress-free!",
    name: "Amit K.",
    role: "Homeowner, Pune",
  },
  {
    quote: "Thanks to Locafy, I now get regular bookings for my cleaning services. It's changed my business!",
    name: "Rina S.",
    role: "Service Provider, Mumbai",
  },
  {
    quote: "This is the platform I always wished existed. Hassle-free bookings and great customer support.",
    name: "Neeraj M.",
    role: "Freelancer, Bangalore",
  },
];

// Features section
const features = [
  {
    title: "Our Mission",
    description: "We bridge the gap between users and trustworthy local professionals by providing a secure, easy-to-use service platform.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 19a7 7 0 100-14 7 7 0 000 14z" />
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M6.34 6.34l-1.42-1.42m12.02 0l1.42 1.42M6.34 17.66l1.42 1.42" />
      </svg>
    ),
  },
  {
    title: "What We Offer",
    description: "Instant bookings, verified providers, user reviews, and a seamless experience from search to service.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M2 7h20M5 7v13h14V7M9 7V4h6v3" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    description: "To become India’s most trusted local service marketplace — empowering users and service providers alike.",
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

// How it works steps
const steps = [
  {
    step: "1",
    title: "Search for a Service",
    description: "Find providers based on category and location.",
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Compare & Book",
    description: "Read reviews, compare professionals, and make a booking.",
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Get the Job Done",
    description: "Sit back while our verified pros get the job done.",
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2l4-4M7 12a5 5 0 0010 0a5 5 0 10-10 0z" />
      </svg>
    ),
  },
];

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 px-6 md:px-12 lg:px-32">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 mb-24">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              About <span className="text-blue-600">Locafy</span>
            </h2>
            <p className="text-lg text-gray-600">
              We’re building the smartest way to discover and connect with trusted local services — from home repairs to tutors, all in one place.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="About Locafy"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg border-t-4 border-blue-500 transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center mb-24">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-md transition border-t-4 border-blue-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white p-2 rounded-full shadow">{item.icon}</div>
                  <h4 className="text-lg font-semibold text-blue-700">Step {item.step}</h4>
                </div>
                <h5 className="text-md font-semibold text-gray-800 mb-2">{item.title}</h5>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">What Our Users Say</h3>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border border-blue-100">
            <p className="text-gray-700 italic mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="font-semibold text-blue-700">
              — {testimonials[currentIndex].name}
            </p>
            <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-800 text-lg max-w-2xl mx-auto">
            Thousands already trust <span className="font-bold text-blue-600">Locafy</span> to simplify their service needs. Join the movement today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
