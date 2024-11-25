const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// Webhook listener
app.post('/webhook', (req, res) => {
  const payload = req.body;
  console.log('Received Webhook:', JSON.stringify(payload, null, 2));

  // Check the event type
  if (payload.event === 'track_updated') {
    // Process the payload
    const trackingNumber = payload.data.tracking_number;
    const trackingStatus = payload.data.tracking_status.status;
    const statusDetails = payload.data.tracking_status.status_details;
    const eta = payload.data.eta;
    const location = payload.data.tracking_status.location;

    // Log or process the tracking update
    console.log(`Tracking Number: ${trackingNumber}`);
    console.log(`Status: ${trackingStatus}`);
    console.log(`Details: ${statusDetails}`);
    console.log(`Estimated Arrival: ${eta}`);
    console.log(`Location: ${location.city}, ${location.state}`);

    // You can save this data to a database or update your front-end in real-time

    // Send a success response to Shippo
    res.status(200).send('Webhook received successfully');
  } else {
    res.status(400).send('Invalid event type');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook listener running on port ${port}`);
});
