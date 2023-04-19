const svg = d3.select("svg");
const data = d3.range(100).map(() => [Math.random() * 400+50, Math.random() * 450]);

var x = d3.scaleLinear()
    .domain([0, 500])
    .range([ 30, 450 ]);
svg.append("g")
    .attr("transform", "translate(10," + 460 + ")")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 500])
    .range([ 450, 0]);
svg.append("g")
    .attr("transform", "translate(40,10)")
    .call(d3.axisLeft(y));

svg.selectAll("dot")
  .data(data)
  .join("circle")
  .attr("cx", d => d[0])
  .attr("cy", d => d[1])
  .attr("r", 2.5)
  .attr("fill", "steelblue");

  ///////////////////////////////////////

const width = 500;
const height = 500;
const margin = 50;

const radius = Math.min(width, height) / 2 - margin;

var svg1 = d3.select("body")
    .append("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(250, 250)");

d3.csv("/data/titanic.csv").then(function(data) {
    const ageGroups = d3.rollup(data, v=> v.length, d => Math.floor(d.Age / 10));
    
    const pie = d3.pie()
        .value(d => d[1])
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
    
    const slices = svg1.selectAll("path")
        .data(pie(ageGroups))
        .join("path")
        .attr("d", arc)
        .attr("fill", d => d3.schemeCategory10[d.index]);
    
    svg1.append("g")
        .attr("transform", "translate(" + (width / 2 - 310) + ","+ 230 +")")
        .append("text")
        .text("Titanic Age groups")
        .attr("class", "title")
});
    

// function pie (){    
//     var data = [1.1,2.2,4.46,2.12,1.36,5.002445,4.1242];

// const { text } = require("d3-fetch");

// // Selecting SVG using d3.select()
// var svg = d3.select("svg");

// let g = svg.append("g")
//        .attr("transform", "translate(150,120)");
  
// // Creating Pie generator
// var pie = d3.pie();

// // Creating arc
// var arc = d3.arc()
//             .innerRadius(0)
//             .outerRadius(100);

// // Grouping different arcs
// var arcs = g.selectAll("arc")
//             .data(pie(data))
//             .enter()
//             .append("g");

// // Appending path 
// arcs.append("path")
//     .attr("fill", (data, i)=>{
//         let value=data.data;
//         return d3.schemeSet3[i];
//     })
//     .attr("d", arc);
// }

// function circleChart (){
//     var width = 400;
//     var height = 400;
//     var data = [10, 20, 30];
//     var colors = ['green', 'purple', 'yellow'];
//     var svg = d3
//         .select("body")
//         .append ("div")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);
    
//     var g = svg.selectAll("g")
//         .data(data) 
//         .enter()
//         .append("g")
//         .attr("transform", function(d, i) {
//         return "translate(0,0)";
//         })
    
//     g.append("circle").attr("cx", function(d, i) {
//         return i*75 + 50;
//     })
    
//     .attr("cy", function(d, i) {
//         return 75;
//     })

//     .attr("r", function(d) {
//         return d * 1.5;
//     })
    
//     .attr("fill", function(d, i){
//         return colors[i];
//     })
    
//     g.append("text").attr("x", function(d, i) {
//         return i * 75 + 25;
//     })
//     .attr("y", 80)
//     .attr("stroke", "teal")
//     .attr("font-size", "10px")
//     .attr("font-family", "sans-serif").text(function(d) {
//         return d;
//     });
// }
// function barChart (){
//     var data = [100, 400, 300, 900, 850, 1000, 300]
//     var colors = ["#444123","#121212","#431111","#121212","#555555","#901212","#121212"]
//     var width = 500,
//         barHeight = 20,
//         margin = 1;
//     var scale = d3.scaleLinear()
//                 .domain([d3.min(data), d3.max(data)])
//                 .range([50, 450]);
//     var svg = d3.select("body")
//                 .append("svg")
//                 .attr("width", width)
//                 .attr("height", barHeight * data.length);
//     var g = svg.selectAll("g")
//                 .data(data)
//                 .enter()
//                 .append("g")
//                 .attr("transform", function (d, i) {
//                     return "translate(0," + i * barHeight + ")";
//                 });
//     g.append("rect")
//     .style ("fill", function (d, i){
//         console.log (colors [i]);
//         return colors [i]; 
//     })
//     .attr("width", function (d) {
//         return scale(d);
//     })
//     .attr("height", barHeight - margin)
//     g.append("text")
//     .style ("fill","brown")
//     .attr("x", function (d) { return (scale(d)); })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function (d) { return d; });
// }

// function load () {
//     barChart ();

//     // Example 2. Circular Chart
//     circleChart ();

//     // Example 3. Pie chart
//     pieChart ();

//     // Example 4. Pie
//     pie ();
    
// }  


// // Assuming the "Age" column in the CSV file contains the passenger ages
// var ageData = d3.nest()
//   .key(function(d) { return d.Age; })
//   .entries(data);

// // Define the pie chart dimensions
// var pieWidth = 500;
// var pieHeight = 500;

// // Define the pie chart color scale
// var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// // Define the pie chart arc generator
// var arcGenerator = d3.arc()
//   .outerRadius(pieWidth / 2 - 10)
//   .innerRadius(0);

// // Define the pie chart layout
// var pieLayout = d3.pie()
//   .sort(null)
//   .value(function(d) { return d.Age.length; });

// // Create the SVG canvas for the pie chart
// var pieSvg = d3.select("body").append("svg")
//   .attr("width", pieWidth)
//   .attr("height", pieHeight);

// // Create the group element for the pie chart
// var pieGroup = svg.append("g")
//   .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

// // Add the pie chart arcs
// pieGroup.selectAll("path")
//   .data(pieLayout(ageData))
//   .enter().append("path")
//   .attr("d", arcGenerator)
//   .attr("fill", function(d) { return colorScale(d.data.key); })
//   .attr("stroke", "#fff")
//   .style("stroke-width", "2px")
//   .style("opacity", 0.8);

// function pieChart (){
//     var svg = d3.select("body").append("div").append("svg"),
//     width = svg.attr("width"),
//     height = svg.attr("height"),
//     radius = Math.min(width, height) / 2.5;
    
//     var g = svg.append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var color = d3.scaleOrdinal([
//         'gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple'
//     ]);
    
//     var pie = d3.pie().value(function(d) { 
//         return d.percent * 100; 
//     });
    
//     var path = d3.arc()
//         .outerRadius(radius - 10).innerRadius(20);
    
//     var label = d3.arc()
//         .outerRadius(radius).innerRadius(radius - 80);
    
    
//     d3.csv("titanic.csv").then (
//           function (data){
//           arc = g.selectAll ('.arc')
//                 .data (pie (data))
//                 .enter ().append ('g')
//                 .attr ('class','arc');
//           arc.append ('path')
//               .attr ('d',path)
//               .attr ('fill', function(d) {console.log ("log:"+d.data.name);return color(d.data.name); });      

//           arc.append("text").attr("transform", function(d) { 
//             return "translate(" + label.centroid(d) + ")"; 
//         })         
//         .text(function(d) { return d.data.name; })
//     });
   
//     svg.append("g")
//         .attr("transform", "translate(" + (width / 2 - 120) + "," + 30 + ")")
//         .append("text").text("Population of Kazakhstan")
//         .attr("class", "title")
// }

// pieChart()
