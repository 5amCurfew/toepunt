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
                .attr("y", margin.top/2)
                .attr("width", d => x(d.end) - x(d.start))
                .attr("height", height/2)
        
        svg.append("g")
            .selectAll("text")
            .data(dims)
            .join("text")
                .attr("fill", "black")
                .style('font', "12px monospace")
                .attr("x", d => x( (d.start + d.end)/2 - .1 ))
                .attr("y", height - margin.top + 4)
                .attr("opacity", (d) => data.scores != null && d.end - d.start > 0.06 ? 1 : 0 )
                .text((d) => Math.round(d.probability*100) + '% (' + Math.round(1/d.probability*10)/10 + ')')
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
  
    return <svg ref={svgRef} className="ResultsGrid"/>;
  };
    
  export default ResultGrid;