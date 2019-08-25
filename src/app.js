import { data1, data2, data3, data4, data5 } from './data';

$(window).ready(function() {

    // set margins for horizontal 
    var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 40
    };

    // charts drawing function declaration
    function draw(data, targetChartDiv) {

        //set raw width and height        
        var width = $(".chCols").width();
        var height = $(".chCols").height();

        //set tuned 'width' and 'height' according to its correspondent margin object
        width = width - margin.left - margin.right * 2.5;
        height = height - margin.top - margin.bottom;

        //set scales & ranges
        var xScale = d3.scaleLinear()
            .range([0, width * 1.1]);

        var yScale = d3.scaleBand()
            .range([30, height]).padding(0.3);

        //draw the svg
        var svg = d3.select(targetChartDiv)
            .append("svg")
            .attr("width", width + margin.left + margin.right * 3)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left * 1.4 + "," + margin.top + ")");

        //Add a Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 11)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Title");

        //force data

        data.forEach(function(d) {
            return d.growth = +d.growth;
        });

        //set domains

        yScale.domain(data.map(d => d.country));

        xScale.domain([0, d3.max(data, d => d.growth)]);

        //add X & Y axes and append the bars to Y axis

        var xAxis = svg.append("g")
            .attr("class", xAxis)
            .attr("transform", "translate(" + 0 + "," + height + ")")
            .call(d3.axisBottom(xScale));

        var yAxis = svg.append("g")
            .attr("class", yAxis)
            .call(d3.axisLeft(yScale))
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("stroke", "transparent")
            .attr("stroke-width", 4)
            .attr("class", "bar")
            .attr("height", yScale.bandwidth())
            .attr("x", 0.5)
            .attr("y", function(d) {
                return yScale(d.country)
            })
            .attr("width", 0)
            .transition()
            .duration(3800)
            .delay((d, i) => (i + 1) * 200)
            .ease(d3.easeElastic)
            .attr("width", function(d) {
                return xScale(d.growth)
            })
            .style("fill", "#00338D")
            .on('end', function() {
                d3.select(this)
                    .on("mouseover", function() {
                        d3.select(this)
                            .transition().duration(600)
                            .attr("stroke", "#6D2077")
                            .attr("stroke-width", 3)
                            .style("fill", "#6D2077")
                        d3.selectAll(".textCircle")
                            .transition().duration(600)
                            .attr("r", yScale.bandwidth() / 1.9)
                            .attr("stroke", "#6D2077")
                            .attr("stroke-width", 1)
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                            .transition()
                            .duration(600)
                            .attr("stroke", "transparent")
                            .attr("stroke-width", 0)
                            .style("fill", "#00338D")
                        d3.selectAll(".textCircle")
                            .transition().duration(600)
                            .attr("r", yScale.bandwidth() / 2)
                            .attr("stroke", "transparent")

                    });

            });

        var newG = svg.append("g")

        newG.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "textCircle")
            .attr("cx", d => xScale(d.growth))
            .attr("cy", d => yScale(d.country) + yScale.bandwidth() / 2)
            .attr("r", 0)
            .transition()
            .duration(1200)
            .delay((d, i) => (i + 1) * 450)
            .attr("r", yScale.bandwidth() / 2)
            .attr("opacity", 1)
            .style("fill", "#005EB8")
            .attr("stroke", "transparent")
            .ease(d3.easeElastic);



        var newG4text = svg.append("g").attr("class", "newG4text");

        newG4text.selectAll(".text").data(data)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.growth))
            .attr("y", d => yScale(d.country) + yScale.bandwidth() / 2)
            .attr("dx", "-.45em")
            .attr("dy", ".4em")
            .style("font-size", ".8em")
            .style("fill", "#FFF")
            .text(d => d.growth);

    }

    //function for vertical bars ==========================================================

    function DrawVertical(data, targetChartDiv) {

        //set raw width and height
        var width = $(".chCols").width();
        var height = $(".chCols").height();

        data.reverse();

        //set scales and ranges
        var xScale = d3.scaleBand().range([0, width * 0.9]).padding(.1);

        var yScale = d3.scaleLinear().range([height * .9, 30]);

        //append the svg element and central g
        var svg = d3.select(targetChartDiv)
            .append("svg")
            .attr("width", width + margin.left + margin.right * 3)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left / 2 + "," + margin.top * 0.8 + ")");


        //Add a Title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 11)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Title for a vertical bar chart");

        data.forEach(function(d) {
            return d.growth = +d.growth;
        });

        //set domains
        xScale.domain(data.map(function(d) {
            return d.country;
        }));

        yScale.domain([0, d3.max(data, function(d) {
            return d.growth;
        })]).nice();

        //set axes

        var xAxis = svg.append("g")
            .attr("transform", "translate(" + 0 + "," + height * .9 + ")")
            .call(d3.axisBottom(xScale));

        svg.selectAll("rects")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) {
                return xScale(d.country)
            })
            .transition()
            .duration((d, i) => (i + 1) * 500)
            .attr("y", (d) => (height * .9) - yScale(d.growth))
            .transition()
            .duration((d, i) => (i + 1) * 1500)
            .ease(d3.easeElastic)
            .duration((d, i) => (1 + i) * 1000)
            .delay((d, i) => (1 + i) * 30)
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d.growth);
            })

        .attr("fill", "#470A68");

        var yAxis = svg.append("g")
            .attr("transform", "rotateX(180deg)")

        .call(d3.axisRight(yScale));
    }

    // Execute the functions

    draw(data1, ".chartDivs1");
    draw(data2, ".chartDivs2");
    draw(data3, ".chartDivs3");
    DrawVertical(data1, ".chartDivs4");
    DrawVertical(data1, ".chartDivs6");

    // Re-execute the functions on resize

    $(window).resize(function() {
        location.reload();
        $(".chartDivs1,.chartDivs2,.chartDivs3,.chartDivs4,.chartDivs6,").empty();
        draw(data1, ".chartDivs1");
        draw(data2, ".chartDivs2");
        draw(data3, ".chartDivs3");
        DrawVertical(data4, ".chartDivs4");
        DrawVertical(data5, ".chartDivs6");

    });
});