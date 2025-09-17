// import React, { useState } from "react";
// import axios from "axios";

// function Booking() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     eventType: "",
//     date: "",
//     amount: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await axios.post("http://localhost:5000/bookings", formData);
//       const { mpesaResponse } = response.data;

//       if (mpesaResponse.ResponseCode === "0") {
//         setMessage(
//           "STK Push sent! Please check your phone and complete the payment."
//         );
//       } else {
//         setMessage("Failed to initiate payment. Try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("Error submitting booking. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form
//         className="bg-white shadow-md rounded p-6 w-full max-w-md"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Book Your Event</h2>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="e.g., 2547XXXXXXXX"
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Event Type</label>
//           <input
//             type="text"
//             name="eventType"
//             value={formData.eventType}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="Wedding, Birthday, etc."
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Amount (KES)</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className={`w-full p-3 text-white font-bold rounded ${
//             loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Book & Pay"}
//         </button>

//         {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//       </form>
//     </div>
//   );
// }

// export default Booking;

// 

import React, { useState } from "react";
import axios from "axios";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Save booking in backend
      const bookingRes = await axios.post("http://localhost:5000/bookings", formData);

      // 2️⃣ Trigger MPesa STK Push
      const mpesaRes = await axios.post("http://localhost:5000/api/mpesa/stkpush", {
        phone: formData.phone,
        amount: formData.amount,
        accountReference: `Booking-${bookingRes.data.booking._id}`,
        transactionDesc: `Payment for ${formData.eventType}`,
      });

      setMessage("Payment prompt sent! Check your phone to complete payment.");
      console.log(mpesaRes.data);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Book Your Event</h2>
      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}

      <form onSubmit={handleBooking} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone (2547XXXXXXXX)"
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="eventType"
          placeholder="Event Type (e.g., Wedding)"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (KES)"
          value={formData.amount}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Book & Pay"}
        </button>
      </form>
    </div>
  );
}

export default Booking;
