var tnt_theme_track_resize = function() {

    var pathToScript = tnt.utils.script_path("resize.js");

    var theme = function(gB, div) {
	var div_theme = d3.select(div);
	var div_id = div_theme.attr("id");

	div_theme
	    .style("border", "1px solid gray");

	var gene_track = tnt.track()
	    .height(200)
	    .display(tnt.track.feature.gene()
		     .foreground_color("#586471")
		    )
	    .data(tnt.track.data.gene());

	var table = div_theme
	    .append("table")
	    .attr("border", "0px")
	    .attr("margin", "0px")
	    .style("border-spacing", "0px");

	var table_row1 = table
	    .append("tr");
	table_row1
	    .append("td")
	    .append("div")
	    .attr("id", "ePeek_browser_comes_here");
	gB(document.getElementById("ePeek_browser_comes_here"));

	table_row1
	    .append("td")
	    .append("img")
	    .attr("src", pathToScript + "../../pics/chevron_active_right.png")
	    .on("click", function() {
		gB.width(900);
	    });

	var table_row2 = table
	    .append("tr");
	table_row2
	    .append("td")
	    .style("text-align", "center")
	    .append("img")
	    .attr("src", pathToScript + "../../pics/chevron_active_right.png")
	    .on("click", function() {
		gene_track.height(300);
	    });

	gB.add_track(gene_track);
	gB.start();

    };
    return theme;

};