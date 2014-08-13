BioJS 2 REST API for accessing Ensembl.org
----------------

Example code: 

```javascript
var rest = biojs.rest.ensembl.eRest();

	var gene_tree_id = "ENSGT00390000003602";
	var gene_tree_url = rest.url.gene_tree({
	    id : gene_tree_id
	});
	rest.call ({url : gene_tree_url,
		    success : data;
		   });
    };
```
