import React, { useState } from 'react';
import ZipCodeInput from './ZipCodeInput';
import MapWithZipCodes from './MapWithZipCodes';

function App() {
  const [zipCodeCoords, setZipCodeCoords] = useState([]); // To hold entered zip code coordinates

  const handleAddZipCode = (newZipCode) => {
    setZipCodeCoords([...zipCodeCoords, newZipCode]); // Add the new zip code with lat/long to the map
  };

  return (
    <div className="App">
      <h1>US Map POC</h1>
      <ZipCodeInput onAddZipCode={handleAddZipCode} />
      <MapWithZipCodes zipCodeCoords={zipCodeCoords} />
    </div>
  );
}

export default App;