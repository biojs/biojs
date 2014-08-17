BioJS Tooltip Plugin
------------

Biojs Tooltip is a Visualization Plugin for BioJS Components.
It allows the creation of tooltip windows on specific events.

Call the `tooltip.table()` method for a table template and design by editing `obj.header` and `obj.rows`

For example this is how `biojs-vis-track` implements tooltip:

```javascript
var tooltip = function () {
        var tooltip = biojs.vis.tooltip.table();
        var gene_tooltip = function (gene) {
            var obj = {};
            obj.header = {
                label: "HGNC Symbol",
                value: gene.external_name
            };
            obj.rows = [];
            obj.rows.push({
                label: "Name",
                value: "<a href=''>" + gene.ID + "</a>"
            });
            obj.rows.push({
                label: "Gene Type",
                value: gene.biotype
            });
            obj.rows.push({
                label: "Location",
                value: "<a href=''>" + gene.seq_region_name + ":" + gene.start + "-" + gene.end + "</a>"
            });
            obj.rows.push({
                label: "Strand",
                value: (gene.strand === 1 ? "Forward" : "Reverse")
            });
            obj.rows.push({
                label: "Description",
                value: gene.description
            });

            tooltip.call(this, obj);
        };

        return gene_tooltip;
    };
```

Use `tnt.css` or your custom CSS file to design the tooltip.
