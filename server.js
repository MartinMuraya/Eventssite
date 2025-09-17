// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import mpesaRoutes from "./routes/mpesa.js";

// import Event from "./models/Event.js";
// import Booking from "./models/Booking.js";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Seed events
// const seedEvents = async () => {
//   const count = await Event.estimatedDocumentCount();
//   if (count === 0) {
//     await Event.insertMany([
//       {
//         title: "React Conference 2025",
//         date: new Date("2025-11-10"),
//         description: "A conference about React.",
//       },
//       {
//         title: "Node.js Meetup",
//         date: new Date("2025-10-05"),
//         description: "Networking and Node.js talks.",
//       },
//       {
//         title: "MongoDB Workshop",
//         date: new Date("2025-09-30"),
//         description: "Hands-on MongoDB workshop.",
//       },
//     ]);
//     console.log("Sample events inserted");
//   }
// };
// seedEvents();

// // Routes
// app.use("/api/mpesa", mpesaRoutes);

// app.get("/", (req, res) => res.send("API is running"));
// app.get("/events", async (req, res) => {
//   const events = await Event.find().sort({ date: 1 });
//   res.json(events);
// });

// app.post("/bookings", async (req, res) => {
//   try {
//     const booking = new Booking(req.body);
//     await booking.save();
//     res.json({ success: true, booking });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get("/bookings", async (req, res) => {
//   const bookings = await Booking.find();
//   res.json(bookings);
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mpesaRoutes from "./routes/mpesa.js";
import Event from "./models/Event.js";
import Booking from "./models/Booking.js";

dotenv.config();
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Seed events ---
const seedEvents = async () => {
  const count = await Event.estimatedDocumentCount();
  if (count === 0) {
    await Event.insertMany([
      {
        title: "React Conference 2025",
        date: new Date("2025-11-10"),
        description: "A conference about React.",
      },
      {
        title: "Node.js Meetup",
        date: new Date("2025-10-05"),
        description: "Networking and Node.js talks.",
      },
      {
        title: "MongoDB Workshop",
        date: new Date("2025-09-30"),
        description: "Hands-on MongoDB workshop.",
      },
    ]);
    console.log("🌱 Sample events inserted");
  }
};
seedEvents();

// --- Routes ---
app.use("/api/mpesa", mpesaRoutes);  //Mpesa routes
// Base route
app.get("/", (req, res) => res.send("API is running"));

// Events
app.get("/events", async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json(events);
});

// Bookings
app.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
