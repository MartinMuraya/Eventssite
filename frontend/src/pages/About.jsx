import React from "react";
import { FaHeart, FaStar, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
     
        <div className="relative h-10 md:h-60 bg-pink-100 flex items-center justify-center">
           <h1 className="text-3xl md:text-4xl font-bold text-white z-10 text-center drop-shadow-lg">
                   About Us
           </h1>
          <div className="absolute inset-0 bg-pink-500 opacity-50"></div>
        </div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-6">
          We create unforgettable wedding and events experiences that celebrate love, joy, and family. 
          Our team works tirelessly to bring your dream wedding or event to life with attention to every detail.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To craft unique, magical wedding and any event experiences that reflect your love story and create lasting memories.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-700">
              To be the most trusted and creative event's planning team, delivering excellence in every celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-pink-50">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Us</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaHeart className="text-pink-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2 text-center">Passionate Team</h4>
            <p className="text-gray-700 text-center">Our team loves what we do and it shows in every event we organize.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaStar className="text-pink-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2 text-center">Exceptional Service</h4>
            <p className="text-gray-700 text-center">We handle every detail with precision, ensuring a stress-free celebration.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <FaUsers className="text-pink-500 text-4xl mb-4 mx-auto" />
            <h4 className="text-xl font-semibold mb-2 text-center">Client-Focused</h4>
            <p className="text-gray-700 text-center">Your vision is our priority. We work closely with you from start to finish.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">Ready to plan your dream wedding/event?</h3>
        <Link
          to="/booking"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded shadow transition"
              >
            Book Your Event
        </Link>
      </section>
    </div>
  );
}

export default About;
