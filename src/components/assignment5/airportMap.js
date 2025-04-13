import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes';

function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirlineID } = props;

    // Define the projection
    const projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // Define the path generator
    const pathGenerator = geoPath().projection(projection);

    // Plot the world map
    const countryPaths = countries.features.map((feature, i) => (
        <path
            key={i}
            d={pathGenerator(feature)}
            stroke="#ccc"
            fill="#eee"
        />
    ));

    // Plot the airports
    const airportCircles = airports.map((airport, i) => {
        const [x, y] = projection([airport.Longitude, airport.Latitude]);
        return (
            <circle
                key={i}
                cx={x}
                cy={y}
                r={1}
                fill="#2a5599"
            />
        );
    });

    // Return the SVG group with map, airports, and routes
    return (
        <g>
            {countryPaths}
            {airportCircles}
            <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
        </g>
    );
}

export { AirportMap };