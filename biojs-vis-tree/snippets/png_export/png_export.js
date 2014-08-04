var tnt_theme_tree_png_export = function() {
    "use strict";

    var tree_theme = function (tree_vis, div) {

	var newick = "(((((homo_sapiens:9,pan_troglodytes:9)207598:34,callithrix_jacchus:43)314293:52,mus_musculus:95)314146:215,taeniopygia_guttata:310)32524:107,danio_rerio:417)117571:135;"

	var path = tnt.utils.script_path("png_export.js");
	var pics_path = path + "/pics/";

	var scientific_to_common = {
	    "homo_sapiens" : "human",
	    "pan_troglodytes" : "chimpanzee",
	    "callithrix_jacchus" : "marmoset",
	    "mus_musculus" : "mouse",
	    "taeniopygia_guttata" : "zebra finch",
	    "danio_rerio" : "zebrafish"
	};

	var names_to_pics = {
	    "homo_sapiens" : pics_path + "homo_sapiens.png",
	    "pan_troglodytes" : pics_path + "pan_troglodytes.png",
	    "callithrix_jacchus" : pics_path + "callithrix_jacchus.png",
	    "mus_musculus" : pics_path + "mus_musculus.png",
	    "taeniopygia_guttata" : pics_path + "taeniopygia_guttata.png",
	    "danio_rerio" : pics_path + "danio_rerio.png"
	};

	// Different labels

	// The empty label shows no label
	var empty_label = tnt.tree.label.text()
	    .text(function (d) {
		return "";
	    })

	// The original label shows the name of the node (default)
	var original_label = tnt.tree.label.text(); // Default options (ie. unchanged names)

	// The clean label shows the names substituting underscores with spaces
	var clean_label = tnt.tree.label.text() // Same as default but without underscores
	    .text(function (d) {
		return d.name.replace(/_/g, ' ');
	    });

	// The prefix label shows the first 7 characters of the labels appending '...' at the end
	var prefix_label = tnt.tree.label.text() // Showing only 7 characters
	    .text(function (d) {
		return d.name.substr(0,6) + "...";
	    });

	// The common label shows the common name of the species
	var common_label = tnt.tree.label.text()
	    .text(function (d) {
		return scientific_to_common[d.name]
	    })

	var separated_label = tnt.tree.label.text()
	    .text(function (d) {
		return scientific_to_common[d.name]
	    })
	    .height(function (d) {
		return 50;
	    });

	// The image label shows a picture of the species
	var image_label = tnt.tree.label.img()
	    .src(function (d) {
		return names_to_pics[d.name];
	    })
	    .width(function () {
		return 50;
	    })
	    .height(function () {
		return 50;
	    });

	// The mixed label shows a picture for the leaves and the name of the internal nodes
	// var mixed_label = function (node) {
	//     if (node.branchset !== undefined) { // internal node
	// 	original_label.call(this, node);
	//     } else { // leaf
	// 	image_label.call(this, node);
	//     }
	// }
	// mixed_label.remove = image_label.remove;

	// var internal_label = tnt.tree.label.text()
	//     .text(function (node) {
	// 	if (node.is_leaf()) {
	// 	    return ""
	// 	}
	// 	return node.name;
	//     })
	//     .width(function (node) {
	// 	console.log("NODE:");
	// 	console.log(node);
	// 	if (node.children === undefined) {
	// 	    return 0;
	// 	}
	// 	return node.name.length * this.fontsize();
	//     });
	// var mixed_label = tnt.tree.label.composite()
	//     .add_label(original_label)
	//     .add_label(image_label);

	// The joined label shows a picture + the common name
	var joined_label = tnt.tree.label.composite()
	    .add_label(image_label)
	// This is the same 'common label' as the one above
	// but we are not reusing that one because add_label
	// adjusts automatically the transform of the labels
	    .add_label(tnt.tree.label.text()
		       .text(function (d) {
			   return scientific_to_common[d.name]
		       }));

	// The menu to change the labels dynamically
	var menu_pane = d3.select(div)
	    .append("div")
	    .append("span")
	    .text("Label display:   ");

	var label_type_menu = menu_pane
	    .append("select")
	    .on("change", function (d) {
		switch (this.value) {
		case "empty" :
		    tree_vis.label(empty_label);
		    break;
		case "original" :
		    tree_vis.label(original_label);
		    break;
		case "clean" :
		    tree_vis.label(clean_label);
		    break;
		case "prefix" :
		    tree_vis.label(prefix_label);
		    break;
		case "common" :
		    tree_vis.label(common_label);
		    break;
		case "separated" :
		    tree_vis.label(separated_label);
		    break;
		case "image" :
		    tree_vis.label(image_label);
		    break;
		// case "mixed" :
		//     tree_vis.label(mixed_label);
		//     break;
		case "joined" :
		    tree_vis.label(joined_label);
		    break;
		}

		tree_vis.update();
	    });

	label_type_menu
	    .append("option")
	    .attr("value", "empty")
	    .text("empty");

	label_type_menu
	    .append("option")
	    .attr("value", "original")
	    .attr("selected", 1)
	    .text("original");

	label_type_menu
	    .append("option")
	    .attr("value", "clean")
	    .text("clean");

	label_type_menu
	    .append("option")
	    .attr("value", "prefix")
	    .text("prefix");

	label_type_menu
	    .append("option")
	    .attr("value", "common")
	    .text("common name");

	label_type_menu
	    .append("option")
	    .attr("value", "separated")
	    .text("Vertical separation");

	label_type_menu
	    .append("option")
	    .attr("value", "image")
	    .text("species image");

	// label_type_menu
	//     .append("option")
	//     .attr("value", "mixed")
	//     .text("text + image");

	label_type_menu
	    .append("option")
	    .attr("value", "joined")
	    .text("joined img + text");

	var png_export = tnt.utils.png()
	    .filename('tnt_tree.png');

	var export_button = d3.select(div)
	    .append("button")
	    .text("Export as PNG")
	    .on('click', function () {
		png_export(div);
	    });

	tree_vis
	    .data(tnt.tree.parse_newick(newick))
	    .duration(2000)
	    .layout(tnt.tree.layout.vertical().width(600).scale(false))
	    .label(original_label);

	// The visualization is started at this point
	tree_vis(div);
    };

    return tree_theme;
};


// (function() {
//     var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

//     function inlineImages(callback) {
// 	var images = document.querySelectorAll('svg image');
// 	var left = images.length;
// 	if (left == 0) {
// 	    callback();
// 	}
// 	for (var i = 0; i < images.length; i++) {
// 	    var image = images[i];
// 	    var img = new Image();
// 	    img.src = image.getAttribute('href');
// 	    // For some reason, img and image are re-used in the img.onload, so we have an async problem
// 	    // that I had to solved creating a new scope with a new anon function passing img and image as arguments
// 	    (function (img, image) {
// 		img.onload = function() {
// 		    var canvas = document.createElement('canvas');
// 		    var ctx = canvas.getContext('2d');
// 		    canvas.width = img.width;
// 		    canvas.height = img.height;
// 		    ctx.drawImage(img, 0, 0);
// 		    var uri = canvas.toDataURL('image/png');
// 		    image.setAttribute('href', uri);
// 		    left--;
// 		    if (left == 0) {
// 			callback();
// 		    }
// 		}
// 	    })(img, image);
// 	}
//     }

//   function moveChildren(src, dest) {
//     while (src.children.length > 0) {
//       var child = src.children[0];
//       dest.appendChild(child);
//     }
//     return dest;
//   }

//   function styles(dom) {
//     var used = "";
//     var sheets = document.styleSheets;
//     for (var i = 0; i < sheets.length; i++) {
//       var rules = sheets[i].cssRules || [];
//       for (var j = 0; j < rules.length; j++) {
//         var rule = rules[j];
//         if (typeof(rule.style) != "undefined") {
//           var elems = dom.querySelectorAll(rule.selectorText);
//           if (elems.length > 0) {
//             used += rule.selectorText + " { " + rule.style.cssText + " }\n";
//           }
//         }
//       }
//     }

//     var s = document.createElement('style');
//     s.setAttribute('type', 'text/css');
//     s.innerHTML = "<![CDATA[\n" + used + "\n]]>";

//     var defs = document.createElement('defs');
//     defs.appendChild(s);
//     return defs;
//   }

//   window.saveSvgAsPng = function(el, name, scaleFactor) {
//     scaleFactor = scaleFactor || 1;

//     inlineImages( function() {
//       var outer = document.createElement("div");
//       var clone = el.cloneNode(true);
//       var width = parseInt(clone.getAttribute("width"));
//       var height = parseInt(clone.getAttribute("height"));

//       clone.setAttribute("version", "1.1");
//       clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//       clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
//       clone.setAttribute("width", width * scaleFactor);
//       clone.setAttribute("height", height * scaleFactor);
//       var scaling = document.createElement("g");
//       scaling.setAttribute("transform", "scale(" + scaleFactor + ")");
//       clone.appendChild(moveChildren(clone, scaling));
//       outer.appendChild(clone);

//       clone.insertBefore(styles(clone), clone.firstChild);

//       var svg = doctype + outer.innerHTML;
//       var image = new Image();
//       image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
// 	console.log(svg);
//       image.onload = function() {
//         var canvas = document.createElement('canvas');
//         canvas.width = image.width;
//         canvas.height = image.height;
//         var context = canvas.getContext('2d');
//         context.drawImage(image, 0, 0);

//         var a = document.createElement('a');
//         a.download = name;
//         a.href = canvas.toDataURL('image/png');
//         document.body.appendChild(a);
//         a.click();
//       }
//     });
//   }
// })();

