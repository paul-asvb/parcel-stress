import * as d3 from "d3";
import DatabaseService from "./database.service"

// import another component
const initD3 = async () => {
    const db = await DatabaseService.get()

    const query = db.heroes.findOne();

    query.$.subscribe((results) => {
        console.log("got results in d3: ", results);
        d3.select("circle").attr("r", 10).style("fill", "red");
    });

    db.heroes.insert({
        color: "foo",
    });

    d3.select("svg")
        .append("circle")
        .attr("r", 5)
        .attr("cx", 12)
        .attr("cy", 12)
        .attr("fill", "red");
}

initD3()