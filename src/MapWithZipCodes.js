import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

// Coordinates for the constant "DC" zip codes
const constantZipCodes = [
  { code: "72712", lat: 36.3729, long: -94.2088, label: "DC" }, // Bentonville, AR
  { code: "96080", lat: 40.1785, long: -122.2408, label: "DC" }, // Red Bluff, CA
];

// Function to calculate the distance between two points using the Haversine formula
const haversineDistance = (coords1, coords2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(coords2.lat - coords1.lat);
  const dLong = toRadians(coords2.long - coords1.long);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coords1.lat)) *
      Math.cos(toRadians(coords2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

// Function to find the nearest DC
const findNearestDC = (zipCoords) => {
  let nearestDC = constantZipCodes[0];
  let minDistance = haversineDistance(zipCoords, constantZipCodes[0]);

  constantZipCodes.forEach((dc) => {
    const distance = haversineDistance(zipCoords, dc);
    if (distance < minDistance) {
      minDistance = distance;
      nearestDC = dc;
    }
  });

  return nearestDC;
};

const MapWithZipCodes = ({ zipCodeCoords }) => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: "#EAEAEC",
                  stroke: "#607D8B",
                  strokeWidth: 0.75,
                },
                hover: {
                  fill: "#CFD8DC",
                  stroke: "#607D8B",
                  strokeWidth: 1,
                },
                pressed: {
                  fill: "#FF5722",
                  stroke: "#607D8B",
                  strokeWidth: 1.5,
                },
              }}
            />
          ))
        }
      </Geographies>

      {/* Constant Markers for DC zip codes */}
      {constantZipCodes.map((zip, index) => (
        <Marker key={index} coordinates={[zip.long, zip.lat]}>
          <circle r={6} fill="#0000FF" /> {/* Blue marker for DC */}
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: "Arial", fill: "#000000", fontSize: "8px" }}
          >
            {zip.label}
          </text>
        </Marker>
      ))}

      {/* Dynamically Added Zip Code Markers */}
      {zipCodeCoords.map((zip, index) => {
        const nearestDC = findNearestDC(zip); // Find nearest DC for each entered zip code

        return (
          <React.Fragment key={index}>
            <Marker coordinates={[zip.long, zip.lat]}>
              <circle r={5} fill="#FF5533" />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "Arial", fill: "#5D5A6D", fontSize: "8px" }}
              >
                {zip.code}
              </text>
            </Marker>

            {/* Draw a line from the zip code to the nearest DC */}
            <Line
              from={[zip.long, zip.lat]}
              to={[nearestDC.long, nearestDC.lat]}
              stroke="#FF5533"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="5,5"
            />
          </React.Fragment>
        );
      })}
    </ComposableMap>
  );
};

export default MapWithZipCodes;