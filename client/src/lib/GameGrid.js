import React from 'react';
import * as d3 from 'd3';

const boxes = [
  {
      "home": "0",
      "away": "0"
  },
  {
      "home": "0",
      "away": "1"
  },
  {
      "home": "0",
      "away": "2"
  },
  {
      "home": "0",
      "away": "3"
  },
  {
      "home": "0",
      "away": "4"
  },
  {
      "home": "1",
      "away": "0"
  },
  {
      "home": "1",
      "away": "1"
  },
  {
      "home": "1",
      "away": "2"
  },
  {
      "home": "1",
      "away": "3"
  },
  {
      "home": "1",
      "away": "4"
  },
  {
      "home": "2",
      "away": "0"
  },
  {
      "home": "2",
      "away": "1"
  },
  {
      "home": "2",
      "away": "2"
  },
  {
      "home": "2",
      "away": "3"
  },
  {
      "home": "2",
      "away": "4"
  },
  {
      "home": "3",
      "away": "0"
  },
  {
      "home": "3",
      "away": "1"
  },
  {
      "home": "3",
      "away": "2"
  },
  {
      "home": "3",
      "away": "3"
  },
  {
      "home": "3",
      "away": "4"
  },
  {
      "home": "4",
      "away": "0"
  },
  {
      "home": "4",
      "away": "1"
  },
  {
      "home": "4",
      "away": "2"
  },
  {
      "home": "4",
      "away": "3"
  },
  {
      "home": "4",
      "away": "4"
  },
  {
      "home": "0",
      "away": "5+"
  },
  {
      "home": "1",
      "away": "5+"
  },
  {
      "home": "2",
      "away": "5+"
  },
  {
      "home": "3",
      "away": "5+"
  },
  {
      "home": "4",
      "away": "5+"
  },
  {
      "home": "5+",
      "away": "0"
  },
  {
      "home": "5+",
      "away": "1"
  },
  {
      "home": "5+",
      "away": "2"
  },
  {
      "home": "5+",
      "away": "3"
  },
  {
      "home": "5+",
      "away": "4"
  },
  {
      "home": "5+",
      "away": "5+"
  }]

const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

const GameGrid = ({ data }) => {
    const svgRef = React.useRef(null);

    const margin = {top: 25, right: 25, bottom: 25, left: 25};
    const width = 420 - margin.left - margin.right;
    const height = 380 - margin.top - margin.bottom;

    React.useEffect(() => {
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove();
    
        const svg = svgEl
        .attr("viewBox", `-30 -40 ${width + 50} ${height + 50}`)
    
        var x = d3
            .scaleBand()
            .range([ 0, width ])
            .domain(['0', '1', '2', '3', '4', '5+'])
            .padding(0.05);
        
        svg.append('g')
            .style('font-size', 15)
            .style('color', "black")
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
            .style('color', "black")
            .style('font-weight', "lighter")
            .call(d3.axisLeft(y).tickSize(0))
            .select('.domain')
            .remove()
    
        // Build color scale
        var homeColour = d3.scaleLinear()
            .domain([0,0.12])
            .range(['#FFFFFF', '#077bbd'])
        var awayColour = d3.scaleLinear()
            .domain([0,0.12])
            .range(['#FFFFFF', '#ff59cc'])
        var drawColour = d3.scaleLinear()
            .domain([0,0.12])
            .range(['#FFFFFF', '#7C7C7C'])
        
        svg.selectAll()
            .data(boxes, function(d) {return d.away+':'+d.home;})
            .join('rect')
                .attr('class', 'gridBox')
                .attr('x', function(d) { return x(d.away) })
                .attr('y', function(d) { return y(d.home) })
                .attr('rx', 4)
                .attr('ry', 4)
                .attr('width', x.bandwidth() )
                .attr('height', y.bandwidth() )
                .style('stroke-width', 1)
                .style('stroke', 'grey')
                .style('opacity', 0.8)
                .style('fill', 'transparent')

        svg.selectAll('.gridBox')
            .data(data.scores)
            .join("rect")
            .style('fill', function(d) { 
                if(d.result === 'HOME'){
                    return homeColour(d.probability)
                } else if(d.result === 'AWAY'){
                    return awayColour(d.probability)
                } else{
                    return drawColour(d.probability)
                }
            })

        svg.selectAll()
            .data(data.scores)
            .enter()
            .append("text")
                .attr('fill', 'black')
                .attr('opacity', function(d) { return scale(d.probability, 0, 0.2, 0.2, 1) })
                .attr("x", function(d) { return x(d.away) + 16 })
                .attr("y", function(d) { return y(d.home) + 30 })
                .text(function(d) {
                    return `${Math.round(d.probability*100)}%`;
                })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <svg ref={svgRef}/>;
};
  
export default GameGrid;