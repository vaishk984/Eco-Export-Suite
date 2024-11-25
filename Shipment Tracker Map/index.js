document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map and set its view
    const map = L.map('map').setView([37.7749, -122.4194], 5); // Starting position (San Francisco)
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Function to fetch tracking data from Shippo API
    const getTrackingInfo = async (status) => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = `https://api.goshippo.com/tracks/`;
      const apiKey = 'shippo_test_b245199ee22a8b7186d213ecfca55127a683389f'; // Replace with your actual Shippo API token
  
      // Manually assign a dummy tracking number for testing purposes or you can query an actual tracking number from Shippo API.
      const dummyTrackingNumber = "SHIPPO_DELIVERED"; // Replace with a valid tracking number if available
      const carrier = "shippo"; // Use Shippo as the carrier for this example
  
      const payload = {
        tracking_number: dummyTrackingNumber,
        carrier: carrier,
      };
  
      console.log('Payload:', payload);
  
      try {
        const response = await fetch(proxyUrl + apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `ShippoToken ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('API Response Error:', errorResponse);
          throw new Error(`Failed to fetch shipment data: ${errorResponse.detail}`);
        }
  
        const data = await response.json();
        console.log('Shipment Data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching shipment data:', error);
        return null;
      }
    };
  
    // Function to geocode a location if lat/lon are missing
    const geocodeLocation = async (location) => {
      const { city, state, country } = location;
      const query = `${city}, ${state}, ${country}`;
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json`;
  
      try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        if (data && data[0]) {
          return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          };
        }
      } catch (error) {
        console.error('Error geocoding location:', error);
      }
  
      // Default to San Francisco if geocoding fails
      return { latitude: 37.7749, longitude: -122.4194 };
    };
  
    // Function to plot the shipment locations on the map
    const plotLocations = async (trackingData) => {
      const { address_from, address_to } = trackingData;
  
      // Geocode and plot "From" address
      let fromCoords = {
        latitude: address_from.latitude,
        longitude: address_from.longitude,
      };
      if (!fromCoords.latitude || !fromCoords.longitude) {
        fromCoords = await geocodeLocation(address_from);
      }
  
      L.marker([fromCoords.latitude, fromCoords.longitude])
        .addTo(map)
        .bindPopup(`<strong>From:</strong> ${address_from.city}, ${address_from.state}, ${address_from.country}`);
  
      // Geocode and plot "To" address
      let toCoords = {
        latitude: address_to.latitude,
        longitude: address_to.longitude,
      };
      if (!toCoords.latitude || !toCoords.longitude) {
        toCoords = await geocodeLocation(address_to);
      }
  
      L.marker([toCoords.latitude, toCoords.longitude])
        .addTo(map)
        .bindPopup(`<strong>To:</strong> ${address_to.city}, ${address_to.state}, ${address_to.country}`);
  
      // Optionally draw a line between "From" and "To"
      L.polyline(
        [
          [fromCoords.latitude, fromCoords.longitude],
          [toCoords.latitude, toCoords.longitude],
        ],
        { color: 'blue' }
      ).addTo(map);
    };
  
    // Function to initialize the map and fetch tracking info
    const initMap = async () => {
      document.getElementById('trackButton').addEventListener('click', async () => {
        const selectedStatus = document.getElementById('trackingStatus').value; // Get the selected status
  
        if (!selectedStatus) {
            messageContainer.textContent = 'Please select a tracking status';
            messageContainer.style.color = 'red'; // Change text color to red for errors
            return;
        }
  
        const trackingData = await getTrackingInfo(selectedStatus);
  
        if (trackingData) {
            plotLocations(trackingData);
            messageContainer.textContent = 'Shipment data fetched successfully!';
            messageContainer.style.color = 'green'; // Change text color to green for success
          } else {
            messageContainer.textContent = 'Failed to fetch shipment data';
            messageContainer.style.color = 'red'; // Change text color to red for errors
          }
      });
    };
  
    // Initialize the map
    initMap();
  });
  