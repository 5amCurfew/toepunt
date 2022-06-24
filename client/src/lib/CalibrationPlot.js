import React from 'react';
import * as d3 from 'd3';


const CalibrationPlot = ({ data }) => {
    const svgRef = React.useRef(null);
  
    const margin = {top: 25, right: 25, bottom: 25, left: 30};
    const width = 420 - margin.left - margin.right;
    const height = 420 - margin.top - margin.bottom;
  
    React.useEffect(() => {

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove();
    
        const svg = svgEl
            .attr("viewBox", [-margin.left, -margin.top, width + 50, height + 50])
        
        // X Axis
        var x = d3
            .scaleBand()
            .range([0, width] )
            .domain( Array(11).fill(0).map( (_, i) => i/10 ) ) // [0, 0.1, 0.2, ..., 1]
            .padding(0.05);
        
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
        
        // Y Axis
        var y = d3.scaleLinear()
            .domain( [0,1] )
            .range( [  height, 0 ] )
        
        svg.append('g')
            .call(d3.axisLeft(y))

        // Add a scale for bubble size (number of observations)
        var z = d3.scaleLinear()
            .domain([0, 100])
            .range([8, 20]);

        svg.append("path")
            .datum(data)
            .attr("d", d3.line()
                .x(function(d) { return x(d.forecastBin) })
                .y(function(d) { return y(d.forecastBin) })
            )
            .attr("stroke", "black")

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", (d) => x(d.forecastBin) )
                .attr("cy", (d) => y(d.observed) )
                .attr("r",  (d) => z(d.obervations) )
                .style("stroke-dasharray", ("10,3"))
                .attr("stroke", "black")
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
  
    return <svg ref={svgRef} class="CalibrationPlot"/>;
  };
    
  export default CalibrationPlot;