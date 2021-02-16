import * as d3 from "d3";

// import another component
d3.select("svg")
    .append("circle")
    .attr("r", 5)
    .attr("cx", 12)
    .attr("cy", 12)
    .attr("fill", "red");