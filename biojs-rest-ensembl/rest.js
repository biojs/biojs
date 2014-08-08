//REST API for ensemble.org written by Miguel Pignatelli for TnT
var xhr = require('nets');

var eRest = function() {

  // Prefixes to use the REST API.
  // These are modified in the localREST setter
  var prefix = "http://beta.rest.ensembl.org";
  var prefix_region = prefix + "/feature/region/";
  var prefix_ensgene = prefix + "/lookup/id/";
  var prefix_xref = prefix + "/xrefs/symbol/";
  var prefix_homologues = prefix + "/homology/id/";
  var prefix_chr_info = prefix + "/assembly/info/";
  var prefix_aln_region = prefix + "/alignment/block/region/";
  var prefix_gene_tree = prefix + "/genetree/id/";

  // Number of connections made to the database
  var connections = 0;

  var eRest = function() {
  };

  // Limits imposed by the ensembl REST API
  eRest.limits = {
    region : 5000000
  };


  /** <strong>localREST</strong> points the queries to a local REST service to debug.
    TODO: This method should be removed in "production"
    */
  eRest.localREST = function() {
    prefix = "http://127.0.0.1:3000";
    prefix_region = prefix + "/feature/region/";
    prefix_ensgene = prefix + "/lookup/id/";
    prefix_xref = prefix + "/xrefs/symbol/";
    prefix_homologues = prefix + "/homology/id/";

    return eRest;
  };

  /** <strong>call</strong> makes an asynchronous call to the ensembl REST service.
    @param {Object} object - A literal object containing the following fields:
    <ul>
    <li>url => The rest URL. This is returned by {@link eRest.url}</li>
    <li>success => A callback to be called when the REST query is successful (i.e. the response from the server is a defined value and no error has been returned)</li>
    <li>error => A callback to be called when the REST query returns an error
    </ul>
    */
  eRest.call = function (obj) {
    var url = obj.url;
    var on_success = obj.success;
    var on_error   = obj.error;
    connections++;
    xhr({uri: url,method:'GET', json:true}, function (error, xhrc, resp) {
      connections--;
      if (error !== null && on_error !== undefined) {
        on_error(error);
      }
      else if (resp !== undefined  ) {
        if(resp.error !== undefined){
          on_error(resp.error);
        }else if(on_success !== undefined){
          on_success(resp);
        }
      } 
    });
  };


  eRest.url = {};
  //var url_api = tnt.utils.api (eRest.url);
  /** eRest.url.<strong>region</strong> returns the ensembl REST url to retrieve the genes included in the specified region
    @param {object} obj - An object literal with the following fields:<br />
    <ul>
    <li>species : The species the region refers to</li>
    <li>chr     : The chr (or seq_region name)</li>
    <li>from    : The start position of the region in the chr</li>
    <li>to      : The end position of the region (from < to always)</li>
    </ul>
    @returns {string} - The url to query the Ensembl REST server. For an example of output of these urls see the {@link http://beta.rest.ensembl.org/feature/region/homo_sapiens/13:32889611-32973805.json?feature=gene|Ensembl REST API example}
    @example
    eRest.call ( url     : eRest.url.region ({ species : "homo_sapiens", chr : "13", from : 32889611, to : 32973805 }),
    success : callback,
    error   : callback
    );
    */
  eRest.url.region = function(obj) {
    return prefix_region +
      obj.species +
      "/" +
      obj.chr +
      ":" + 
      obj.from + 
      "-" + obj.to + 
      ".json?feature=gene";
  };

  /** eRest.url.<strong>species_gene</strong> returns the ensembl REST url to retrieve the ensembl gene associated with
    the given name in the specified species.
    @param {object} obj - An object literal with the following fields:<br />
    <ul>
    <li>species   : The species the region refers to</li>
    <li>gene_name : The name of the gene</li>
    </ul>
    @returns {string} - The url to query the Ensembl REST server. For an example of output of these urls see the {@link http://beta.rest.ensembl.org/xrefs/symbol/human/BRCA2.json?object_type=gene|Ensembl REST API example}
    @example
    eRest.call ( url     : eRest.url.species_gene ({ species : "human", gene_name : "BRCA2" }),
    success : callback,
    error   : callback
    );
    */
  eRest.url.xref = function (obj) {
    return prefix_xref +
      obj.species  +
      "/" +
      obj.name +
      ".json?object_type=gene";
  };

  /** eRest.url.<strong>homologues</strong> returns the ensembl REST url to retrieve the homologues (orthologues + paralogues) of the given ensembl ID.
    @param {object} obj - An object literal with the following fields:<br />
    <ul>
    <li>id : The Ensembl ID of the gene</li>
    </ul>
    @returns {string} - The url to query the Ensembl REST server. For an example of output of these urls see the {@link http://beta.rest.ensembl.org/homology/id/ENSG00000139618.json?format=condensed;sequence=none;type=all|Ensembl REST API example}
    @example
    eRest.call ( url     : eRest.url.homologues ({ id : "ENSG00000139618" }),
    success : callback,
    error   : callback
    );

*/
  eRest.url.homologues = function(obj) {
    return prefix_homologues +
      obj.id + 
      ".json?format=condensed;sequence=none;type=all";
  };

  /** eRest.url.<strong>gene</strong> returns the ensembl REST url to retrieve the ensembl gene associated with
    the given ID
    @param {object} obj - An object literal with the following fields:<br />
    <ul>
    <li>id : The name of the gene</li>
    </ul>
    @returns {string} - The url to query the Ensembl REST server. For an example of output of these urls see the {@link http://beta.rest.ensembl.org/lookup/ENSG00000139618.json?format=full|Ensembl REST API example}
    @example
    eRest.call ( url     : eRest.url.gene ({ id : "ENSG00000139618" }),
    success : callback,
    error   : callback
    );
    */
  eRest.url.gene = function(obj) {
    return prefix_ensgene +
      obj.id +
      ".json?format=full";
  };

  /** eRest.url.<strong>chr_info</strong> returns the ensembl REST url to retrieve the information associated with the chromosome (seq_region in Ensembl nomenclature).
    @param {object} obj - An object literal with the following fields:<br />
    <ul>
    <li>species : The species the chr (or seq_region) belongs to
    <li>chr     : The name of the chr (or seq_region)</li>
    </ul>
    @returns {string} - The url to query the Ensembl REST server. For an example of output of these urls see the {@link http://beta.rest.ensembl.org/assembly/info/homo_sapiens/13.json?format=full|Ensembl REST API example}
    @example
    eRest.call ( url     : eRest.url.chr_info ({ species : "homo_sapiens", chr : "13" }),
    success : callback,
    error   : callback
    );
    */
  eRest.url.chr_info = function(obj) {
    return prefix_chr_info +
      obj.species +
      "/" +
      obj.chr +
      ".json?format=full";
  };

  // TODO: For now, it only works with species_set and not species_set_groups
  // Should be extended for wider use
  eRest.url.aln_block= function (obj) {
    var url = prefix_aln_region + 
      obj.species +
      "/" +
      obj.chr +
      ":" +
      obj.from +
      "-" +
      obj.to +
      ".json?method=" +
      obj.method;

    for (var i=0; i<obj.species_set.length; i++) {
      url += "&species_set=" + obj.species_set[i];
    }

    return url;
  };

  eRest.url.gene_tree = function (obj) {
    return prefix_gene_tree +
      obj.id + 
      ".json?sequence=" +
      ((obj.sequence || obj.aligned) ? 1 : "none") +
      (obj.aligned ? '&aligned=1' : '');
  };

  eRest.connections = function() {
    return connections;
  };

  return eRest;
};


module.exports = eRest;
