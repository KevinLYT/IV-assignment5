import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";

export function BarChart (props) {
    const {
        offsetX, offsetY, data, height, width,
        selectedAirlineID, setSelectedAirlineID
    } = props;

    // 1. Find the maximum value of the 'Count' attribute from the dataset
    const maxCount = max(data, d => d.Count);

    // 2. Define the yScale using scaleBand for airline names (categorical)
    const airlines = data.map(d => d.AirlineName);
    const yScale = scaleBand()
        .domain(airlines)
        .range([0, height])
        .padding(0.2);  // Add spacing between bars

    // 3. Define the xScale using scaleLinear for Count values (numerical)
    const xScale = scaleLinear()
        .domain([0, maxCount])
        .range([0, width]);

    // Task 3.1: Define a color function to highlight selected airline
    const color = (d) => (
        d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599"
    );

    // Task 3.2: Define onMouseOver to set the selected airline ID
    const handleMouseOver = (d) => {
        setSelectedAirlineID(d.AirlineID);
    };

    // Task 3.3: Define onMouseOut to reset the selected airline ID
    const handleMouseOut = () => {
        setSelectedAirlineID(null);
    };

    // 4. Map through the data and create <rect> bars with proper dimensions and events
    const bars = data.map((d, i) => (
        <rect
            key={i}
            x={0}
            y={yScale(d.AirlineName)}
            width={xScale(d.Count)}
            height={yScale.bandwidth()}
            fill={color(d)}  // Task 3.1: Set fill color based on selection
            onMouseOver={() => handleMouseOver(d)}  // Task 3.2: Highlight on hover
            onMouseOut={handleMouseOut}             // Task 3.3: Unhighlight on mouse leave
        />
    ));

    // 5. Return the chart group with bars and axes, transformed to the given offset
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {bars}
            <YAxis yScale={yScale} height={height} />
            <XAxis xScale={xScale} height={height} width={width} />
        </g>
    );
}
