import express from "express";
import Booking from "../models/Booking.js"; // Booking model
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const router = express.Router();

// Generate access token

const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    method: "GET",
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = await response.json();
  return data.access_token;
};

// STK Push

router.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount, accountReference, transactionDesc } = req.body;
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString("base64");

    const stkResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phone,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: phone,
          CallBackURL: "https://eventssite-1.onrender.com/api/mpesa/callback",
          AccountReference: accountReference || "DreamEvents",
          TransactionDesc: transactionDesc || "Event Booking Payment",
        }),
      }
    );

    const data = await stkResponse.json();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "STK Push failed" });
  }
});

// Callback URL (called by Safaricom after payment)
router.post("/callback", async (req, res) => {
  try {
    const callbackData = req.body;
    console.log("MPesa callback received:", callbackData);

    // Extract relevant info
    const resultCode = callbackData.Body.stkCallback.ResultCode;
    const checkoutRequestID = callbackData.Body.stkCallback.CheckoutRequestID;

    if (resultCode === 0) {
      // Successful payment
      const amount = callbackData.Body.stkCallback.CallbackMetadata.Item.find(i => i.Name === "Amount").Value;
      const phone = callbackData.Body.stkCallback.CallbackMetadata.Item.find(i => i.Name === "PhoneNumber").Value;

      // Update booking based on phone number & amount
      await Booking.findOneAndUpdate(
        { phone, amount, paid: false },
        { $set: { paid: true } }
      );
    }

    res.status(200).json({ message: "Callback received" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process callback" });
  }
});

export default router;
