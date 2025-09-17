import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-8">
      {/* Hero Section */}
      <section className="text-center my-8">
        <h1 className="text-4xl font-bold text-red-600">Your Dream Wedding/Event Starts Here</h1>
        <p className="mt-4 text-gray-700">Plan, book, and celebrate your perfect wedding with us.</p>
        <Link
          to="/booking"
          className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Book Your Event
        </Link>
      </section>

      {/* Events Section */}
      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {[
          { img: "/images/img2.jpg", title: "Elegant Weddings" },
          { img: "/images/img4.webp", title: "Photography Sessions" },
          { img: "/images/img6.jpg", title: "Other Events" },
          { img: "/images/img11.jpg", title: "Birthday Parties" },
          { img: "/images/img13.jpg", title: "Bridal Showers" },
          { img: "/images/img7.jpeg", title: "Entertainment Services" },
        ].map((event, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img src={event.img} alt={event.title} className="rounded"/>
            <h3 className="text-xl font-semibold mt-2">{event.title}</h3>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
