import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const MapWithZipCodes = ({ zipCodeCoords }) => {
  const geoUrl =
    "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                default: {
                  fill: "#EAEAEC", // Light gray for states
                  stroke: "#607D8B", // Dark gray for state boundaries
                  strokeWidth: 0.75,
                },
                hover: {
                  fill: "#CFD8DC", // Light blue when hovered
                  stroke: "#607D8B",
                  strokeWidth: 1,
                },
                pressed: {
                  fill: "#FF5722", // Orange when clicked
                  stroke: "#607D8B",
                  strokeWidth: 1.5,
                },
              }}
            />
          ))
        }
      </Geographies>

      {zipCodeCoords.map((zip, index) => (
        <Marker key={index} coordinates={[zip.long, zip.lat]}>
          <circle r={5} fill="#FF5533" />
          <text
            textAnchor="middle"
            y={-10}
            style={{ fontFamily: "Arial", fill: "#5D5A6D", fontSize: "8px" }}
          >
            {zip.code}
          </text>
        </Marker>
      ))}

      {zipCodeCoords.length > 1 &&
        zipCodeCoords.map((zip, index) => {
          if (index < zipCodeCoords.length - 1) {
            return (
              <Line
                key={`line-${index}`}
                from={[zip.long, zip.lat]}
                to={[zipCodeCoords[index + 1].long, zipCodeCoords[index + 1].lat]}
                stroke="#FF5533"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="5,5"
              />
            );
          }
          return null;
        })}
    </ComposableMap>
  );
};

export default MapWithZipCodes;