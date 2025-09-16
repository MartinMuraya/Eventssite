// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import mpesaRoutes from "./routes/mpesa.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

// // Booking schema & model
// const bookingSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   eventType: String,
//   date: Date,
//   amount: Number,
//   paid: { type: Boolean, default: false },
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// // POST booking + STK Push
// app.post("/bookings", async (req, res) => {
//   try {
//     const { name, email, phone, eventType, date, amount } = req.body;
//     const booking = new Booking({ name, email, phone, eventType, date, amount });
//     await booking.save();

//     // Send STK push
//     const tokenResponse = await fetch(`http://localhost:${PORT}/api/mpesa/stkpush`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone, amount }),
//     });
//     const mpesaResponse = await tokenResponse.json();

//     res.json({ success: true, booking, mpesaResponse });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// app.use("/api/mpesa", mpesaRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import mpesaRoutes from "./routes/mpesa.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // --- Schemas ---
// // Event schema
// const eventSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   date: { type: Date, required: true },
//   description: String,
//   image: String,
// });
// const Event = mongoose.model("Event", eventSchema);

// // Booking schema
// const bookingSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   eventType: String,
//   date: Date,
//   amount: Number,
//   paid: { type: Boolean, default: false },
// });
// const Booking = mongoose.model("Booking", bookingSchema);

// // --- Seed sample events ---
// const seedEvents = async () => {
//   const count = await Event.estimatedDocumentCount();
//   if (count === 0) {
//     await Event.insertMany([
//       { title: "React Conference 2025", date: new Date("2025-11-10"), description: "A conference about React." },
//       { title: "Node.js Meetup", date: new Date("2025-10-05"), description: "Networking and Node.js talks." },
//       { title: "MongoDB Workshop", date: new Date("2025-09-30"), description: "Hands-on MongoDB workshop." },
//     ]);
//     console.log("Sample events inserted");
//   }
// };
// seedEvents().catch(err => console.error(err));

// // --- Routes ---
// app.use("/api/mpesa", mpesaRoutes(Booking)); // pass Booking model to mpesa

// app.get("/", (req, res) => res.send("API is running"));

// // Event routes
// app.get("/events", async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// app.post("/events", async (req, res) => {
//   try {
//     const { title, date, description, image } = req.body;
//     const event = new Event({ title, date, description, image });
//     await event.save();
//     res.json({ success: true, event });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Booking routes
// app.post("/bookings", async (req, res) => {
//   try {
//     const { name, email, phone, eventType, date, amount } = req.body;
//     const booking = new Booking({ name, email, phone, eventType, date, amount });
//     await booking.save();
//     res.json({ success: true, booking });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// app.get("/bookings", async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import mpesaRoutes from "./routes/mpesa.js";

// Import models
import Event from "./models/Event.js";
import Booking from "./models/Booking.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// --- Use MPesa routes ---
app.use("/api/mpesa", mpesaRoutes);

// --- Routes for Events and Bookings ---
app.get("/", (req, res) => res.send("API is running"));

// GET all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking
app.post("/bookings", async (req, res) => {
  try {
    const { name, email, phone, eventType, date, amount } = req.body;
    const booking = new Booking({ name, email, phone, eventType, date, amount });
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));