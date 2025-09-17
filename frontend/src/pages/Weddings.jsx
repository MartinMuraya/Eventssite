import React from 'react';

function Weddings() {
  const events = [
    { title: "Abby & Martin's Wedding", date: "Oct 12, 2025", location: "Diani", img: "/images/img3.jpg" },
    { title: "Sophia & Mark's Wedding", date: "Nov 5, 2025", location: "Maasai Mara", img: "/images/img11.jpg" },
    { title: "Rahab & Ally's Wedding", date: "Dec 20, 2025", location: "Watamu Island", img: "/images/img11.jpg" }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Upcoming Wedding Events</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded shadow overflow-hidden">
            <img src={event.img} alt={event.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{event.date} - {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weddings;
