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
            .attr("viewBox", [-margin.left - 20, -margin.top, width + 75, height + 100])
        
        // X Axis
        var x = d3.scaleLinear()
            .range( [0, width] )
            .domain( [0, 1] );
        
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
        
        // Y Axis
        var y = d3.scaleLinear()
            .range( [height, 0] )
            .domain( [0, 1] )
        
        svg.append('g')
            .call(d3.axisLeft(y))

        // Add a scale for bubble size (number of observations)
        var z = d3.scaleLinear()
            .domain([0, 100])
            .range([4, 10]);

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", (d) => x(d.forecastBin) )
                .attr("cy", (d) => y(d.observed) )
                .attr("r",  (d) => z(d.observations) )
                .attr("color", "red")
                .attr("stroke", "black")
        
        svg.append("line")
            .attr("x1", x(0))
            .attr("y1", y(0))
            .attr("x2", x(1))
            .attr("y2", y(1))
            .attr("stroke", "black")
            .style("stroke-dasharray", ("10"))

        svg.append("text")             
            .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 10) + ")")
            .style("text-anchor", "middle")
            .text("Forecast");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left - 20)
            .attr("x",0 - (height/2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Observed"); 
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
  
    return <svg ref={svgRef} className="CalibrationPlot"/>;
  };
    
  export default CalibrationPlot;