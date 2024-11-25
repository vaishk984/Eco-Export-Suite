document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map and set its view
  const map = L.map('map').setView([37.7749, -122.4194], 5); // Starting position (San Francisco)

  // Tile layer for the map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Arrays to hold markers and polylines
  let markers = [];
  let polylines = [];

  // Data for tracking statuses and substatuses with coordinates
  const trackingStatuses = {
    PRE_TRANSIT: {
      information_received: {
        definition: "Information about the package received.",
        meaning: "The carrier has received the necessary details about your package.",
        actionRequired: "No action required",
        location: { lat: 37.7749, lon: -122.4194 } // Example coordinates (San Francisco)
      },
      contact_carrier: {
        definition: "Contact the carrier for more information.",
        meaning: "The carrier needs additional information or action from you.",
        actionRequired: "Contact carrier to resolve the issue.",
        location: { lat: 40.7128, lon: -74.0060 } // Example coordinates (New York)
      },
      delayed: {
        definition: "Delivery of package is delayed.",
        meaning: "The delivery is experiencing a delay.",
        actionRequired: "No action required.",
        location: { lat: 41.8781, lon: -87.6298 } // Example coordinates (Chicago)
      },
      delivery_attempted: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      delivery_rescheduled: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      delivery_scheduled: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      location_inaccessible: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      notice_left: {
        location: { lat: 52.5200, lon: 13.4050 } // Berlin
      },
      outfordelivery: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_accepted: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      package_arrived: {
        location: { lat: 42.3601, lon: -71.0589 } // Boston
      },
      package_damaged: {
        location: { lat: 40.7128, lon: -74.0060 } // New York
      },
      package_departed: {
        location: { lat: 39.9526, lon: -75.1652 } // Philadelphia
      },
      package_forwarded: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_held: {
        location: { lat: 51.5074, lon: -0.1278 } // London
      },
      package_processed: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      package_processing: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      pickup_available: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      reschedule_delivery: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      }

    },
    TRANSIT: {
      address_issue: {
        definition: "Address information is incorrect.",
        meaning: "The address may be incorrect or incomplete.",
        actionRequired: "Contact carrier to ensure delivery.",
        location: { lat: 34.0522, lon: -118.2437 } // Example coordinates (Los Angeles)
      },
      contact_carrier: {
        definition: "Contact the carrier for more information.",
        meaning: "The carrier needs additional information or action from you.",
        actionRequired: "Contact carrier to resolve the issue.",
        location: { lat: 40.7128, lon: -74.0060 } // Example coordinates (New York)
      },
      delayed: {
        definition: "Delivery of package is delayed.",
        meaning: "The delivery is experiencing a delay.",
        actionRequired: "No action required.",
        location: { lat: 41.8781, lon: -87.6298 } // Example coordinates (Chicago)
      },


      delivery_attempted: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      delivery_rescheduled: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      delivery_scheduled: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      location_inaccessible: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      notice_left: {
        location: { lat: 52.5200, lon: 13.4050 } // Berlin
      },
      outfordelivery: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_accepted: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      package_arrived: {
        location: { lat: 42.3601, lon: -71.0589 } // Boston
      },
      package_damaged: {
        location: { lat: 40.7128, lon: -74.0060 } // New York
      },
      package_departed: {
        location: { lat: 39.9526, lon: -75.1652 } // Philadelphia
      },
      package_forwarded: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_held: {
        location: { lat: 51.5074, lon: -0.1278 } // London
      },
      package_processed: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      package_processing: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      pickup_available: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      reschedule_delivery: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      }

    },
    DELIVERED: {
      delivered: {
        location: { lat: 51.5074, lon: -0.1278 } // London
      }
    },
    RETURNED: {
      delivery_attempted: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      delivery_rescheduled: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      delivery_scheduled: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      location_inaccessible: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      notice_left: {
        location: { lat: 52.5200, lon: 13.4050 } // Berlin
      },
      outfordelivery: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_accepted: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      package_arrived: {
        location: { lat: 42.3601, lon: -71.0589 } // Boston
      },
      package_damaged: {
        location: { lat: 40.7128, lon: -74.0060 } // New York
      },
      package_departed: {
        location: { lat: 39.9526, lon: -75.1652 } // Philadelphia
      },
      package_forwarded: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_held: {
        location: { lat: 51.5074, lon: -0.1278 } // London
      },
      package_processed: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      package_processing: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      pickup_available: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      reschedule_delivery: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      returntosender: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      package_unclaimed: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      }
    },
    FAILURE: {
      package_undeliverable: {
        location: { lat: 40.7128, lon: -74.0060 } // New York
      },
      package_disposed: {
        location: { lat: 39.9526, lon: -75.1652 } // Philadelphia
      },
      package_lost: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      delivery_attempted: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      delivery_rescheduled: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      delivery_scheduled: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      location_inaccessible: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      notice_left: {
        location: { lat: 52.5200, lon: 13.4050 } // Berlin
      },
      outfordelivery: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_accepted: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      },
      package_arrived: {
        location: { lat: 42.3601, lon: -71.0589 } // Boston
      },
      package_damaged: {
        location: { lat: 40.7128, lon: -74.0060 } // New York
      },
      package_departed: {
        location: { lat: 39.9526, lon: -75.1652 } // Philadelphia
      },
      package_forwarded: {
        location: { lat: 37.7749, lon: -122.4194 } // San Francisco
      },
      package_held: {
        location: { lat: 51.5074, lon: -0.1278 } // London
      },
      package_processed: {
        location: { lat: 48.8566, lon: 2.3522 } // Paris
      },
      package_processing: {
        location: { lat: 40.730610, lon: -73.935242 } // Brooklyn, New York
      },
      pickup_available: {
        location: { lat: 41.8781, lon: -87.6298 } // Chicago
      },
      reschedule_delivery: {
        location: { lat: 34.0522, lon: -118.2437 } // Los Angeles
      }

    },
    UNKNOWN: {
      other: {
        location: { lat: 51.1657, lon: 10.4515 } // Germany (General fallback location)
      }
    }
  };


  // Function to fetch tracking data (updated to use the trackingStatuses with location)
  const getTrackingInfo = async (status, substatus) => {
    const statusInfo = trackingStatuses[status] && trackingStatuses[status][substatus];

    if (statusInfo) {
      return {
        status: status,
        substatus: substatus,
        definition: statusInfo.definition,
        meaning: statusInfo.meaning,
        actionRequired: statusInfo.actionRequired,
        location: statusInfo.location // Include coordinates
      };
    }

    // Return a default message if no status/substatus match
    return {
      status: "UNKNOWN",
      substatus: "other",
      definition: "Unrecognized carrier status.",
      meaning: "The status is unknown or unrecognized by the carrier.",
      actionRequired: "Contact carrier for more information.",
      location: { lat: 37.7749, lon: -122.4194 } // Default coordinates (San Francisco)
    };
  };

  // Function to remove all markers and polylines from the map
  const removeMarkersAndLines = () => {
    // Remove all markers from the map
    markers.forEach(marker => marker.remove());
    markers = []; // Clear the markers array

    // Remove all polylines from the map
    polylines.forEach(polyline => polyline.remove());
    polylines = []; // Clear the polylines array
  };

  // Function to plot the shipment location on the map
  const plotLocation = async (trackingData) => {
    const { location } = trackingData;

    // Remove previous markers and lines before adding new ones
    removeMarkersAndLines();

    // Plot the current location of the package
    const packageMarker = L.marker([location.lat, location.lon])
      .addTo(map)
      .bindPopup(`<strong>Status:</strong> ${trackingData.status} <br><strong>Substatus:</strong> ${trackingData.substatus}<br><strong>Definition:</strong> ${trackingData.definition}<br><strong>Meaning:</strong> ${trackingData.meaning}<br><strong>Action Required:</strong> ${trackingData.actionRequired}`);
    
    markers.push(packageMarker); // Add marker to the array

    // Optionally, zoom to the package location
    map.setView([location.lat, location.lon], 10);
  };

  // Function to initialize the map and fetch tracking info
  const initMap = async () => {
    const messageContainer = document.getElementById('messageContainer'); // Define the message container

    document.getElementById('trackButton').addEventListener('click', async () => {
      const selectedStatus = document.getElementById('trackingStatus').value;
      const selectedSubstatus = document.getElementById('trackingSubstatus').value;

      if (!selectedStatus || !selectedSubstatus) {
          messageContainer.textContent = 'Please select a tracking status and substatus.';
          messageContainer.style.color = 'red'; // Error message
          return;
      }

      const trackingData = await getTrackingInfo(selectedStatus, selectedSubstatus);

      if (trackingData) {
          plotLocation(trackingData); // Plot the package location on the map
          messageContainer.innerHTML = `
            <strong>Status:</strong> ${trackingData.status}<br>
            <strong>Substatus:</strong> ${trackingData.substatus}<br>
            <strong>Definition:</strong> ${trackingData.definition}<br>
            <strong>Meaning:</strong> ${trackingData.meaning}<br>
            <strong>Action Required:</strong> ${trackingData.actionRequired}
          `;
          messageContainer.style.color = 'green'; // Success message
      } else {
          messageContainer.textContent = 'Failed to fetch shipment data';
          messageContainer.style.color = 'red'; // Error message
      }
    });
  };

  // Initialize the map
  initMap();
});
