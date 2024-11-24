<<<<<<< HEAD
// Event listener for the form submission
document.getElementById('shipping-form').addEventListener('submit', fetchShippingRates);

// State variables
let shippingRates = [];
let cheapestRate = null;
let error = null;
let sortOrder = 'asc';

const mockRates = [
  { object_id: '1', provider: 'UPS', amount: 10.5, currency: 'USD', servicelevel: { name: 'Ground' } },
  { object_id: '2', provider: 'FedEx', amount: 5.5, currency: 'USD', servicelevel: { name: 'Express' } },
  { object_id: '3', provider: 'DHL', amount: 8.0, currency: 'USD', servicelevel: { name: 'Air' } },
];

const addressFrom = {
  city: "New York",
  state: "NY",
  zip: "10001",
  country: "US",
};

const addressTo = {
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
  country: "US",
};

const parcel = {
  length: "10",
  width: "15",
  height: "10",
  distance_unit: "in",
  weight: "1",
  mass_unit: "lb",
};

const requestPayload = {
  address_from: addressFrom,
  address_to: addressTo,
  parcels: [parcel],
};

const API_KEY = 'shippo_test_b245199ee22a8b7186d213ecfca55127a683389f';

async function fetchShippingRates(event) {
  event.preventDefault();

  // Reset state before making a new request
  error = null;
  shippingRates = [];
  cheapestRate = null;

  try {
    const response = await fetch('https://api.goshippo.com/shipments', {
      method: 'POST',
      headers: {
        "Authorization": `ShippoToken ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    const data = await response.json();
    if (response.ok) {
      // Use actual data here instead of mock data
      shippingRates = data.rates || [];

      // Find the cheapest rate
      cheapestRate = shippingRates.reduce((prev, current) => {
        return parseFloat(prev.amount) < parseFloat(current.amount) ? prev : current;
      }, shippingRates[0]);

    } else {
      error = data.errors ? data.errors : "An error occurred while fetching rates.";
    }
  } catch (err) {
    error = err.message || "An unknown error occurred";
  }

  displayRates();
}

function displayRates() {
  const rateList = document.getElementById('rate-list');
  const errorMessage = document.getElementById('error-message');
  const cheapestRateDisplay = document.getElementById('cheapest-rate');
  const cheapestProvider = document.getElementById('cheapest-provider');
  const cheapestAmount = document.getElementById('cheapest-amount');
  const cheapestService = document.getElementById('cheapest-service');

  // Clear previous content
  rateList.innerHTML = '';
  errorMessage.innerHTML = '';
  cheapestRateDisplay.style.display = 'none';

  if (error) {
    errorMessage.innerHTML = `Error: ${error}`;
    errorMessage.style.display = 'block';
  } else {
    if (shippingRates.length === 0) {
      rateList.innerHTML = 'No rates available';
    } else {
      shippingRates.forEach(rate => {
        const li = document.createElement('li');
        li.classList.add('rate-item');
        li.innerHTML = `
          <p><strong>Provider:</strong> ${rate.provider}</p>
          <p><strong>Amount:</strong> ${rate.amount} ${rate.currency}</p>
          <p><strong>Service:</strong> ${rate.servicelevel.name}</p>
        `;
        rateList.appendChild(li);
      });

      if (cheapestRate) {
        cheapestRateDisplay.style.display = 'block';
        cheapestProvider.textContent = cheapestRate.provider;
        cheapestAmount.textContent = `${cheapestRate.amount} ${cheapestRate.currency}`;
        cheapestService.textContent = cheapestRate.servicelevel.name;
      }
    }
  }
}

function sortRates(order) {
  if (order === 'asc') {
    shippingRates.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
  } else if (order === 'desc') {
    shippingRates.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
  }
  displayRates();
}
=======

function initChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.innerHTML = "<p>Welcome to EcoExportSuite Chatbot!</p>";
}

function initShipmentTracker() {
    const mapContainer = document.getElementById('map-container');
    
    mapContainer.innerHTML = "<p>Loading Shipment Tracker Map...</p>";
}


function initDocumentValidator() {
    const validatorContainer = document.getElementById('document-validator-container');
    validatorContainer.innerHTML = "<p>Upload a document for validation.</p>";
}


function initRateComparator() {
    const comparatorContainer = document.getElementById('rate-comparator-container');
    comparatorContainer.innerHTML = "<p>Compare shipment rates here.</p>";
}

window.onload = function() {
    initChatbot();
    initShipmentTracker();
    initDocumentValidator();
    initRateComparator();
};
>>>>>>> e93e06ab029d43729688f3f9b0b9ce9fade540b7
