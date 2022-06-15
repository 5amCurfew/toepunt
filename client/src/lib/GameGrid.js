import React from 'react';
import * as d3 from 'd3';
import { useD3 } from './useD3';

const GameGrid = ({ data }) => {
  const ref = useD3( (svg) => {
      
    const margin = {top: 0, right: 0, bottom: 0, left: 0};
    const width = 420 - margin.left - margin.right;
    const height = 380 - margin.top - margin.bottom;

    svg
      .attr("viewBox", `-40 -40 ${width + 50} ${height + 50}`)

    var x = d3
      .scaleBand()
      .range([ 0, width ])
      .domain(['0', '1', '2', '3', '4', '5+'])
      .padding(0.05);
    
    svg.append('g')
      .style('font-size', 15)
      .style('color', "grey")
      .style('font-weight', "lighter")
      .call(d3.axisTop(x).tickSize(0))
      .select('.domain')
      .remove()
    
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain((['0', '1', '2', '3', '4', '5+']).reverse())
      .padding(0.05)

    svg.append('g')
      .style('font-size', 15)
      .style('color', "grey")
      .style('font-weight', "lighter")
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove()

    // Build color scale
    var homeColour = d3.scaleLinear()
      .domain([0,0.12])
      .range(['#cde4f1', '#077bbd'])
    var awayColour = d3.scaleLinear()
      .domain([0,0.12])
      .range(['#ffddf4', '#ff59cc'])
    var drawColour = d3.scaleLinear()
      .domain([0,0.12])
      .range(['#e4e4e4', '#7C7C7C'])
    
    svg.selectAll()
      .data(data.scores, function(d) {return d.away+':'+d.home;})
      .enter()
      .append('rect')
      .attr('x', function(d) { return x(d.away) })
      .attr('y', function(d) { return y(d.home) })
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth() )
      .attr('height', y.bandwidth() )
      .style('fill', function(d) { 
          if(d.result === 'HOME'){
              return homeColour(d.probability)
          } else if(d.result === 'AWAY'){
              return awayColour(d.probability)
          } else{
              return drawColour(d.probability)
          }
      })
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central") 
      .style('stroke-width', 1)
      .style('stroke', 'grey')
      .style('opacity', 0.8)

      svg.selectAll()
        .data(data.scores)
        .enter()
        .append("text")
        .attr("class", "probLabel")
        .attr('opacity', .5)
        .attr("x", function(d) { return x(d.away) + width/20 })
        .attr("y", function(d) { return y(d.home) + height/10})
        .text(function(d) {
            return `${Math.round(d.probability*100)}%`;
        })
    
    }, 
    [data.scores]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: "40%",
        width: "40%"
      }}
    >
      <g className="plot-area"/>
    </svg>
  );
}
  
export default GameGrid;