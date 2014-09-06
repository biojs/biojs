require("d3");
var parser = require("biojs-io-snipspector");

function d3_show() {

    var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

    var color = d3.scale.category10();

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 150);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
            return d.number;
        });

    function converter(genome) {
        var data_res = [];

        for (var k = 0; k < 25; k++) {
            var data = [{
                category: "del",
                number: genome[k].del
            }, {
                category: "hetero",
                number: genome[k].hetero
            }, {
                category: "homo",
                number: genome[k].homo
            }];


            var data_wrapper = [{
                name: genome[k].name,
                data: data
            }];

            data_res = data_res.concat(data_wrapper);

        }

        return data_res;
    }

    parser.read("http://files.biojs.net/chromosomes/manny", function (result) {
        var data_res = converter(result);

        var X_data = data_res[22].data;

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var g = svg.selectAll(".arc")
            .data(pie(X_data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.category);
            });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return d.data.category;
            });

    })

}

module.exports = d3_show;