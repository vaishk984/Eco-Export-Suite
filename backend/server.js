import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;

// API key for Shippo (stored securely in .env file)
const API_KEY = process.env.SHIPPO_API_KEY;

// Endpoint for fetching shipping rates
app.get('/api/shipments', async (req, res) => {
  try {
    // Replace with the actual shipment data
    const shipmentData = {
        address_to: {
            "name": "Mr Hippo",
            "street1": "965 Mission St #572",
            "city": "San Francisco",
            "state": "CA",
            "zip": "94103",
            "country": "US",
            "phone": "4151234567",
            "email": "mrhippo@shippo.com"
        },
      address_from: {
        "name": "Mrs Hippo",
        "street1": "1092 Indian Summer Ct",
        "city": "San Jose",
        "state": "CA",
        "zip": "95122",
        "country": "US",
        "phone": "4159876543",
        "email": "mrshippo@shippo.com"
      },
      parcels: [
        {
          "length": "10",
          "width": "15",
          "height": "10",
          "distance_unit": "in",
          "weight": "1",
          "mass_unit": "lb"
        },
      ],
    };

    // Make request to Shippo API
    const response = await fetch('https://api.goshippo.com/shipments', {
      method: 'POST',
      headers: {
        'Authorization': `ShippoToken ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipmentData),
    });

    const data = await response.json();

    if (response.ok) {
      res.json(data); // Return shipping rates to the frontend
    } else {
      res.status(500).json({ message: 'Error fetching shipping rates', details: data });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

