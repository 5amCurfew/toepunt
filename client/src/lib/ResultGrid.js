import React from 'react';
import * as d3 from 'd3';


const ResultGrid = ({ data }) => {
    const svgRef = React.useRef(null);
  
    const margin = {top: 25, right: 25, bottom: 25, left: 25};
    const width = 420 - margin.left - margin.right;
    const height = 100 - margin.top - margin.bottom;
  
    React.useEffect(() => {

        const dims = [
            {
                start: 0,
                probability: data.resultHome,
                end: data.resultHome,
                colour: '#6aafd7'
            },
            {
                start: data.resultHome,
                probability: data.resultDraw,
                end: data.resultHome + data.resultDraw,
                colour: '#b0b0b0'
            },
            {
                start: (data.resultHome + data.resultDraw),
                probability: data.resultAway,
                end: 1,
                colour: '#ff9be0'
            }
        ] 

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove();
    
        const svg = svgEl
            .attr("viewBox", [0, 0, width, height])
        
        const x = d3.scaleLinear([0, 1], [margin.left, width - margin.right])
        
        svg.append("g")
            .selectAll("rect")
            .data(dims)
            .join("rect")
                .attr("fill", d => d.colour)
                .attr("x", d => x(d.start))
                .attr("y", margin.top)
                .attr("width", d => x(d.end) - x(d.start))
                .attr("height", height)
        
        svg.append("g")
            .selectAll("text")
            .data(dims)
            .join("text")
                .attr("fill", "black")
                .attr("x", d => x( (d.start + d.end)/2 - .04 ))
                .attr("y", height - margin.top/3)
                .attr("opacity", .5)
                .text((d) => Math.round(d.probability*100) + '%')
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
  
    return <svg ref={svgRef}/>;
  };
    
  export default ResultGrid;