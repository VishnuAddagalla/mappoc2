import React, { useState } from 'react';
import zipcodes from 'zipcodes'; // to get lat/long

const ZipCodeInput = ({ onAddZipCode }) => {
  const [zipCode, setZipCode] = useState('');  // For holding the current input zip code
  const [zipCodes, setZipCodes] = useState([]); // To store all entered zip codes

  const handleInputChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleAddZipCode = () => {
    // Validate and add zip code if it is valid
    if (zipCode.length === 5 && /^\d{5}$/.test(zipCode)) {
      const location = zipcodes.lookup(zipCode); // Get lat/long from zip code
      if (location) {
        const newZip = { code: zipCode, lat: location.latitude, long: location.longitude };
        setZipCodes([...zipCodes, newZip]); // Add the new zip code with lat/long
        onAddZipCode(newZip); // Pass the new zip code with coordinates to parent
        setZipCode(''); // Reset the input field
      } else {
        alert('Invalid zip code');
      }
    } else {
      alert('Please enter a valid 5-digit zip code');
    }
  };

  return (
    <div>
      <h3>Enter Zip Codes</h3>
      <input
        type="text"
        value={zipCode}
        onChange={handleInputChange}
        placeholder="Enter Zip Code"
      />
      <button onClick={handleAddZipCode}>Add Zip Code</button>

      <div>
        <h4>Entered Zip Codes:</h4>
        <ul>
          {zipCodes.map((z, index) => (
            <li key={index}>{z.code} ({z.lat}, {z.long})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ZipCodeInput;