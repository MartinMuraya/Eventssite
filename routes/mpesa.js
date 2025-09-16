// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// // Safaricom Daraja credentials

// const SHORTCODE = process.env.MPESA_SHORTCODE;
// const LNM_PASSKEY = process.env.MPESA_PASSKEY;
// const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
// const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
// const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// // Get OAuth token

// async function getToken() {
//   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
//   const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
//     headers: { Authorization: `Basic ${auth}` }
//   });
//   const data = await response.json();
//   return data.access_token;
// }

// // Initiate STK Push

// router.post("/stkpush", async (req, res) => {
//   try {
//     const { phone, amount } = req.body;
//     const token = await getToken();
//     const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
//     const password = Buffer.from(`${SHORTCODE}${LNM_PASSKEY}${timestamp}`).toString("base64");

//     const body = {
//       BusinessShortCode: SHORTCODE,
//       Password: password,
//       Timestamp: timestamp,
//       TransactionType: "CustomerPayBillOnline",
//       Amount: amount,
//       PartyA: phone,
//       PartyB: SHORTCODE,
//       PhoneNumber: phone,
//       CallBackURL: CALLBACK_URL,
//       AccountReference: "EventBooking",
//       TransactionDesc: "Event Booking Payment",
//     };

//     const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(body)
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "STK Push failed" });
//   }
// });

// export default router;
// import express from "express";
// import fetch from "node-fetch";

// export default (Booking) => {
//   const router = express.Router();

//   // Generate access token
//   const getAccessToken = async () => {
//     const consumerKey = process.env.MPESA_CONSUMER_KEY;
//     const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
//     const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

//     const response = await fetch(
//       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//       { method: "GET", headers: { Authorization: `Basic ${auth}` } }
//     );
//     const data = await response.json();
//     return data.access_token;
//   };

//   // STK Push endpoint
//   router.post("/stkpush", async (req, res) => {
//     try {
//       const { phone, amount, bookingId } = req.body;
//       const token = await getAccessToken();
//       const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

//       const shortcode = process.env.MPESA_SHORTCODE;
//       const passkey = process.env.MPESA_PASSKEY;
//       const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

//       const stkResponse = await fetch(
//         "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             BusinessShortCode: shortcode,
//             Password: password,
//             Timestamp: timestamp,
//             TransactionType: "CustomerPayBillOnline",
//             Amount: amount,
//             PartyA: phone,
//             PartyB: shortcode,
//             PhoneNumber: phone,
//             CallBackURL: "https://yourdomain.com/api/mpesa/callback",
//             AccountReference: "DreamEvents",
//             TransactionDesc: "Event Booking Payment",
//           }),
//         }
//       );

//       const data = await stkResponse.json();

//       // Optional: mark booking as paid (after callback)
//       // await Booking.findByIdAndUpdate(bookingId, { paid: true });

//       res.json(data);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "STK Push failed" });
//     }
//   });

//   return router;
// };

import express from "express";
import fetch from "node-fetch"; //  node-fetch
import dotenv from "dotenv";
import Booking from "../models/Booking.js";

dotenv.config();
const router = express.Router();

// Generate access token
const getAccessToken = async () => {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const response = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      method: "GET",
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  const data = await response.json();
  return data.access_token;
};

// STK Push endpoint
router.post("/stkpush", async (req, res) => {
  try {
    const { bookingId, phone, amount } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);

    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const password = Buffer.from(shortcode + passkey + timestamp).toString("base64");

    const stkResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phone, // Customer phone
          PartyB: shortcode,
          PhoneNumber: phone,
          CallBackURL: "https://yourdomain.com/api/mpesa/callback", //  callback endpoint
          AccountReference: booking.eventType,
          TransactionDesc: "Event Booking Payment",
        }),
      }
    );

    const data = await stkResponse.json();
    res.json({ success: true, mpesaResponse: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "STK Push failed" });
  }
});

export default router;