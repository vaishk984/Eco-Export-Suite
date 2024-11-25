const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware with custom settings
app.use(cors({
  origin: '*', // Allow all origins (or specify your domain)
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

