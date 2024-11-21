import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = 5000;
const API_KEY = process.env.SHIPPO_API_KEY;

if (!API_KEY) {
  throw new Error("SHIPPO_API_KEY is not defined in the environment variables.");
}

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Fetch shipping rates
const fetchShippingRates = async (shipmentData) => {
  const response = await fetch('https://api.goshippo.com/shipments', {
    method: 'POST',
    headers: {
      'Authorization': `ShippoToken ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shipmentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Shippo API Error: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
};

// API endpoint
app.post('/api/shipments', async (req, res) => {
  try {
    const shipmentData = req.body; // Dynamic data from frontend
    const rates = await fetchShippingRates(shipmentData);
    res.json(rates);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error fetching shipping rates', error: error.message });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
