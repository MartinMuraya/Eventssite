import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  eventType: String,
  date: Date,
  amount: Number,
  paid: { type: Boolean, default: false },
});

export default mongoose.model("Booking", bookingSchema);
