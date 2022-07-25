import React from 'react';
import * as d3 from 'd3';


const BettingPlot = ({ data }) => {
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
            .domain( [0, 5] );
        
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
        
        // Y Axis
        var y = d3.scaleLinear()
            .range( [height, 0] )
            .domain( [0, 5] )
        
        svg.append('g')
            .call(d3.axisLeft(y))

        // Add a scale for bubble size (size of wager)
        var z = d3.scaleLinear()
            .domain([0, 300])
            .range([9, 18]);

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
                .append("circle")
                .attr("cx", (d) => x(d.toepuntOdds) )
                .attr("cy", (d) => y(d.marketOdds) )
                .attr("r",  (d) => z(d.betValue) )
                .attr("fill", (d) => d.result === "WON" ? '#5bb899' : '#f9f9f9')
                .attr("stroke", "black")
                .on("click", (d, i) => {

                    d3.selectAll(".betTooltip").remove()

                    //d3.select(d.target).attr("stroke-width", 2)

                    svg.append("text")
                        .attr("class", "betTooltip")
                        .attr("id", i.date + "::" + i.game)
                        .attr("x", x(i.toepuntOdds))
                        .attr("y", y(i.marketOdds) - 60)
                        .attr("size", "10px")
                        .style("text-anchor", "middle")
                        .text(`${i.game}`)
                    
                    svg.append("text")
                        .attr("class", "betTooltip")
                        .attr("id", i.date + "::" + i.game)
                        .attr("x", x(i.toepuntOdds))
                        .attr("y", y(i.marketOdds) - 60)
                        .attr("dy", "1em")
                        .attr("size", "10px")
                        .style("text-anchor", "middle")
                        .text(`${i.toepuntOdds} vs ${i.marketOdds}`)
                    
                    svg.append("text")
                        .attr("class", "betTooltip")
                        .attr("id", i.date + "::" + i.game)
                        .attr("x", x(i.toepuntOdds))
                        .attr("y", y(i.marketOdds) - 60)
                        .attr("dy", "2em")
                        .attr("size", "10px")
                        .style("text-anchor", "middle")
                        .text(`${i.result} (${i.result === "WON" ? '+' : '-'}£${i.resultValue})`)
                })
        
        svg.append("line")
            .attr("x1", x(0))
            .attr("y1", y(0))
            .attr("x2", x(5))
            .attr("y2", y(5))
            .attr("stroke", "black")
            .style("stroke-dasharray", ("10"))

        svg.append("text")             
            .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 10) + ")")
            .style("text-anchor", "middle")
            .text("Toepunt Price");
        
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left - 20)
            .attr("x",0 - (height/2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Market Price");   
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
  
    return <svg ref={svgRef} className="BettingPlot"/>;
  };
    
  export default BettingPlot;