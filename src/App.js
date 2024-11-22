import React, { useState } from "react";
 // Import the CSS file for styles

function App() {
  const [shippingRates, setShippingRates] = useState([]); // State for storing rates
  const [error, setError] = useState(null); // For handling errors
  const [cheapestRate, setCheapestRate] = useState(null); // For storing the cheapest rate
  const [sortOrder, setSortOrder] = useState("asc"); // To track sorting order

  // State for user input
  const [addressFrom, setAddressFrom] = useState({
    name: "Mrs Hippo",
    street1: "1092 Indian Summer Ct",
    city: "San Jose",
    state: "CA",
    zip: "95122",
    country: "US",
    phone: "4159876543",
    email: "mrshippo@shippo.com",
  });

  const [addressTo, setAddressTo] = useState({
    name: "Mr Hippo",
    street1: "965 Mission St #572",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "US",
    phone: "4151234567",
    email: "mrhippo@shippo.com",
  });

  const [parcel, setParcel] = useState({
    length: "10",
    width: "15",
    height: "10",
    distance_unit: "in",
    weight: "1",
    mass_unit: "lb",
  });

  // Fetch Shipping Rates
  const fetchShippingRates = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      const response = await fetch("https://api.goshippo.com/shipments", {
        method: "POST",
        headers: {
          Authorization: `ShippoToken ${process.env.REACT_APP_SHIPPO_API_KEY}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address_from: addressFrom,
          address_to: addressTo,
          parcels: [parcel],
        }),
      });

      const data = await response.json();
      console.log("API Response: ", data);

      if (response.ok) {
        setShippingRates(data.rates); // Set all rates
        const minRate = data.rates.reduce((cheapest, current) => {
          return parseFloat(current.amount) < parseFloat(cheapest.amount)
            ? current
            : cheapest;
        }, data.rates[0]);
        setCheapestRate(minRate); // Set the cheapest rate
        setError(null); 
      } else {
        setError(data.messages); // Handle errors from API
      }
    } catch (err) {
      setError(err.message); // Catch any error during fetch
    }
  };

  // Function to sort shipping rates by amount
  const sortRates = (order) => {
    const sortedRates = [...shippingRates].sort((a, b) => {
      return order === "asc"
        ? parseFloat(a.amount) - parseFloat(b.amount)
        : parseFloat(b.amount) - parseFloat(a.amount);
    });
    setShippingRates(sortedRates); // Update state with sorted rates
    setSortOrder(order); // Update the current sort order
  };

  return (
    <div className="App">
      <style>
  {`
    /* General Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f7;
      color: #333;
      line-height: 1.6;
    }

    /* App Container */
    .App {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    /* Title */
    .title {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 40px;
      color: #4a90e2;
    }

    /* Form Styles */
    .form {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      margin-bottom: 40px;
    }

    .form-section {
      margin-bottom: 20px;
    }

    h2 {
      font-size: 18px;
      color: #4a90e2;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      background-color: #f9f9f9;
      transition: background-color 0.3s, border-color 0.3s;
    }

    .input:focus {
      background-color: #ffffff;
      border-color: #4a90e2;
    }

    .btn {
      background-color: #4a90e2;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-size: 16px;
      width: 100%;
    }

    .btn:hover {
      background-color: #357abd;
    }

    .btn:focus {
      outline: none;
    }

    /* Sorting Buttons */
    .sort-buttons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
      justify-content: center;
    }

    .sort-buttons .btn {
      width: auto;
    }

    /* Rate Display Section */
    .rate-display {
      background-color: #e9f7fb;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      margin-top: 30px;
    }

    .rate-display h2 {
      font-size: 20px;
      color: #333;
      margin-bottom: 15px;
    }

    .rate-display p {
      font-size: 16px;
      margin: 5px 0;
      color: #555;
    }

    /* Rate List */
    .rate-list {
      list-style-type: none;
      padding-left: 0;
      margin-top: 20px;
    }

    .rate-item {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
    }

    .rate-item p {
      font-size: 16px;
      color: #555;
      margin-bottom: 5px;
    }

    .rate-item p strong {
      color: #4a90e2;
    }

    /* Error Message */
    .error {
      color: #d9534f;
      font-size: 16px;
      text-align: center;
      margin-top: 20px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .App {
        padding: 15px;
      }

      .form {
        padding: 20px;
      }

      .btn {
        width: 100%;
      }

      .sort-buttons {
        flex-direction: column;
        gap: 10px;
      }
    }
  `}
</style>

      <h1 className="title">Shipping Rates</h1>

      {/* Input Form */}
      <form className="form" onSubmit={fetchShippingRates}>
        <div className="form-section">
          <h2>Sender's Address</h2>
          <input
            type="text"
            className="input"
            placeholder="City"
            value={addressFrom.city}
            onChange={(e) => setAddressFrom({ ...addressFrom, city: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="State"
            value={addressFrom.state}
            onChange={(e) => setAddressFrom({ ...addressFrom, state: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Zip Code"
            value={addressFrom.zip}
            onChange={(e) => setAddressFrom({ ...addressFrom, zip: e.target.value })}
          />
        </div>

        <div className="form-section">
          <h2>Receiver's Address</h2>
          <input
            type="text"
            className="input"
            placeholder="City"
            value={addressTo.city}
            onChange={(e) => setAddressTo({ ...addressTo, city: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="State"
            value={addressTo.state}
            onChange={(e) => setAddressTo({ ...addressTo, state: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Zip Code"
            value={addressTo.zip}
            onChange={(e) => setAddressTo({ ...addressTo, zip: e.target.value })}
          />
        </div>

        <div className="form-section">
          <h2>Parcel Details</h2>
          <input
            type="text"
            className="input"
            placeholder="Length"
            value={parcel.length}
            onChange={(e) => setParcel({ ...parcel, length: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Width"
            value={parcel.width}
            onChange={(e) => setParcel({ ...parcel, width: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Height"
            value={parcel.height}
            onChange={(e) => setParcel({ ...parcel, height: e.target.value })}
          />
          <input
            type="text"
            className="input"
            placeholder="Weight"
            value={parcel.weight}
            onChange={(e) => setParcel({ ...parcel, weight: e.target.value })}
          />
        </div>

        <button type="submit" className="btn">Fetch Rates</button>
      </form>

      <div className="sort-buttons">
        <button className="btn" onClick={() => sortRates("asc")}>Sort by Amount (Low to High)</button>
        <button className="btn" onClick={() => sortRates("desc")}>Sort by Amount (High to Low)</button>
      </div>

      {cheapestRate && (
        <div className="rate-display">
          <h2>Cheapest Rate</h2>
          <p><strong>Provider:</strong> {cheapestRate.provider}</p>
          <p><strong>Amount:</strong> {cheapestRate.amount} {cheapestRate.currency}</p>
          <p><strong>Service:</strong> {cheapestRate.servicelevel.name}</p>
        </div>
      )}

      {error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div>
          {shippingRates.length === 0 ? (
            <p>No rates available</p>
          ) : (
            <ul className="rate-list">
              {shippingRates.map((rate) => (
                <li key={rate.object_id} className="rate-item">
                  <p><strong>Provider:</strong> {rate.provider}</p>
                  <p><strong>Amount:</strong> {rate.amount} {rate.currency}</p>
                  <p><strong>Service:</strong> {rate.servicelevel.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


