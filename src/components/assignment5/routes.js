import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    // If no airline is selected, return an empty <g> element (no routes displayed)
    if (selectedAirlineID === null) {
        return <g></g>;
    }

    // Filter the routes to include only those that belong to the selected airline
    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);

    // Map through the filtered routes and draw a <line> for each one
    const routeLines = selectedRoutes.map((route, i) => {
        // Use the projection function to convert geographic coordinates to SVG positions
        const [startX, startY] = projection([route.SourceLongitude, route.SourceLatitude]);
        const [endX, endY] = projection([route.DestLongitude, route.DestLatitude]);

        return (
            <line
                key={i}
                x1={startX}     // starting x position (source airport)
                y1={startY}     // starting y position (source airport)
                x2={endX}       // ending x position (destination airport)
                y2={endY}       // ending y position (destination airport)
                stroke="#7A2048" // route line color (can be customized)
                strokeWidth={1} // route line thickness
            />
        );
    });

    // Return a group element containing all the route lines
    return <g>{routeLines}</g>;
}

export { Routes };
