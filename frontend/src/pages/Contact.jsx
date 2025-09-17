import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // Success/Error message
  const [loading, setLoading] = useState(false); // Loading state

  const API_URL = import.meta.env.VITE_API_URL; //dynamic backend URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">Contact Us</h1>

      <p className="text-gray-700 text-center mb-12 max-w-2xl">
        Got a question or want to book a wedding event with us? Reach out through any of the options below.
      </p>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link
          to="/booking"
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
        >
          <FaEnvelope className="text-pink-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Email Us</h2>
          <p className="text-gray-600">Click to book your event</p>
        </Link>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <FaPhoneAlt className="text-pink-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Call Us</h2>
          <p className="text-gray-600">+254718 571 870</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
          <FaMapMarkerAlt className="text-pink-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Visit Us</h2>
          <p className="text-gray-600">Crest Park Avenue, Nairobi City</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-12 w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">Send a Message</h2>

        {status && (
          <p
            className={`text-center mb-4 ${
              status.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 h-32 resize-none"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 text-white font-semibold py-3 rounded-md hover:bg-pink-700 transition-colors duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;