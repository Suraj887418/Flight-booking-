fetch(
  "https://flight-booking-web-app-1csg.onrender.com/api/v1/flights/search",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Delhi, National Capital Territory of Delhi, India",
      to: "Mumbai, Maharashtra, India",
      departDate: "2026-07-17",
      flightType: "Economy",
    }),
  },
)
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
