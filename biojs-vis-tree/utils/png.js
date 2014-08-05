tnt.utils.png = function () {

    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

    var scale_factor = 1;
    var filename = 'image.png';

    var exporter = function (div) {
	var svg = div.querySelector('svg');

	var inline_images = function (cbak) {
	    var images = d3.select(svg)
		.selectAll('image');

	    var remaining = images[0].length;
	    if (remaining === 0) {
		cbak();
	    }

	    images
		.each (function () {
		    var image = d3.select(this);
		    var img = new Image();
		    img.src = image.attr('href');
		    img.onload = function () {
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			var uri = canvas.toDataURL('image/png');
			image.attr('href', uri);
			remaining--;
			if (remaining === 0) {
			    cbak();
			}
		    }
		});
	}

	var move_children = function (src, dest) {
	    while (src.children.length > 0) {
		var child = src.children[0];
		dest.appendChild(child);
	    }
	    return dest;
	};

	var styling = function (dom) {
	    var used = "";
	    var sheets = document.styleSheets;
	    for (var i = 0; i < sheets.length; i++) {
		var rules = sheets[i].cssRules || [];
		for (var j = 0; j < rules.length; j++) {
		    var rule = rules[j];
		    if (typeof(rule.style) != "undefined") {
			var elems = dom.querySelectorAll(rule.selectorText);
			if (elems.length > 0) {
			    used += rule.selectorText + " { " + rule.style.cssText + " }\n";
			}
		    }
		}
	    }

	    var s = document.createElement('style');
	    s.setAttribute('type', 'text/css');
	    s.innerHTML = "<![CDATA[\n" + used + "\n]]>";

	    var defs = document.createElement('defs');
	    defs.appendChild(s);
	    return defs;
	};

	inline_images (function () {
	    var svg = div.querySelector('svg');
	    var outer = document.createElement("div");
	    var clone = svg.cloneNode(true);
	    var width = parseInt(clone.getAttribute('width'));
	    var height = parseInt(clone.getAttribute('height'));

	    clone.setAttribute("version", "1.1");
	    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	    clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	    clone.setAttribute("width", width * scale_factor);
	    clone.setAttribute("height", height * scale_factor);
	    var scaling = document.createElement("g");
	    scaling.setAttribute("transform", "scale(" + scale_factor + ")");
	    clone.appendChild(move_children(clone, scaling));
	    outer.appendChild(clone);

	    clone.insertBefore (styling(clone), clone.firstChild);

	    var svg = doctype + outer.innerHTML;
	    var image = new Image();
	    image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
	    image.onload = function() {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);
		
		var a = document.createElement('a');
		a.download = filename;
		a.href = canvas.toDataURL('image/png');
		document.body.appendChild(a);
		a.click();
	    };
	});

    }
    exporter.scale_factor = function (f) {
	if (!arguments.length) {
	    return scale_factor;
	}
	scale_factor = f;
	return exporter;
    };

    exporter.filename = function (f) {
	if (!arguments.length) {
	    return filename;
	}
	filename = f;
	return exporter;
    };

    return exporter;
};
