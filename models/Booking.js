import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  eventType: String,
  date: Date,
  amount: Number,
  paid: { type: Boolean, default: false },
  checkoutRequestId: String, // store STK Push request ID
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
