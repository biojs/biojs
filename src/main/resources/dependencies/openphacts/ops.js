//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

var Openphacts = Openphacts || {};
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.Constants = function() {};

Openphacts.Constants.prototype.SRC_CLS_MAPPINGS = {
  'http://www.conceptwiki.org': 'conceptWikiValue',
  'http://www.conceptwiki.org/': 'conceptWikiValue',
  'http://ops.conceptwiki.org': 'conceptWikiValue',
  'http://ops.conceptwiki.org/': 'conceptWikiValue',
  'http://data.kasabi.com/dataset/chembl-rdf': 'chemblValue',
  'http://rdf.ebi.ac.uk/resource/chembl/molecule' : 'chemblValue',
  'http://www.ebi.ac.uk/chembl' : 'chemblValue',
  'http://www4.wiwiss.fu-berlin.de/drugbank': 'drugbankValue',
  'http://linkedlifedata.com/resource/drugbank': 'drugbankValue',
  'http://www.chemspider.com': 'chemspiderValue',
  'http://www.chemspider.com/': 'chemspiderValue',
  'http://ops.rsc-us.org': 'chemspiderValue',
  'http://ops.rsc.org': 'chemspiderValue',
  'http://rdf.chemspider.com': 'chemspiderValue',
  'http://rdf.chemspider.com/': 'chemspiderValue',
  'http://ops.rsc-us.org' : 'chemspiderValue',
  'http://purl.uniprot.org' : 'uniprotValue',
  'http://purl.uniprot.org/' : 'uniprotValue'
};

Openphacts.Constants.prototype.IN_DATASET =  'inDataset';
Openphacts.Constants.prototype.ABOUT = '_about';
Openphacts.Constants.prototype.LABEL = 'label';
Openphacts.Constants.prototype.PREF_LABEL = 'prefLabel';
Openphacts.Constants.prototype.COMPOUND_PHARMACOLOGY_COUNT = 'compoundPharmacologyTotalResults';
Openphacts.Constants.prototype.TARGET_PHARMACOLOGY_COUNT = 'targetPharmacologyTotalResults';
Openphacts.Constants.prototype.ENZYME_FAMILY_COUNT = 'enzymePharmacologyTotalResults';
Openphacts.Constants.prototype.ON_ASSAY = 'hasAssay';
Openphacts.Constants.prototype.ON_TARGET = 'hasTarget';
Openphacts.Constants.prototype.EXACT_MATCH = 'exactMatch';
Openphacts.Constants.prototype.PRIMARY_TOPIC = 'primaryTopic';
Openphacts.Constants.prototype.RESULT = 'result';
Openphacts.Constants.prototype.ACTIVITY = 'activity';
Openphacts.Constants.prototype.FOR_MOLECULE = 'hasMolecule';
Openphacts.Constants.prototype.ASSAY_TARGET = 'target';
Openphacts.Constants.prototype.ITEMS = 'items';
Openphacts.Constants.prototype.PAGINATED_NEXT = 'next';
Openphacts.Constants.prototype.PAGINATED_PREVIOUS = 'prev';
Openphacts.Constants.prototype.PAGINATED_PAGE_SIZE = 'itemsPerPage';
Openphacts.Constants.prototype.PAGINATED_START_INDEX = 'startIndex';
Openphacts.Constants.prototype.TARGET_OF_ASSAY = 'targetOfAssay';
Openphacts.Constants.prototype.ASSAY_OF_ACTIVITY = 'assayOfActivity';
Openphacts.Constants.prototype.HAS_TARGET_COMPONENT = 'hasTargetComponent';
Openphacts.Constants.prototype.MOLFORM = 'molformula';
Openphacts.Constants.prototype.FULL_MWT = 'full_mwt';
Openphacts.Constants.prototype.INCHI = 'inchi';
Openphacts.Constants.prototype.INCHIKEY = 'inchikey';
Openphacts.Constants.prototype.RO5_VIOLATIONS = 'ro5_violations';
Openphacts.Constants.prototype.SMILES = 'smiles';
Openphacts.Constants.prototype.RELEVANCE = 'relevance';
Openphacts.Constants.prototype.PATHWAY_COUNT = 'pathway_count';
Openphacts.Constants.prototype.MOLWT = 'molweight';
Openphacts.Constants.prototype.EBILINK = 'http://www.ebi.ac.uk';
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
Openphacts.CompoundSearch = function CompoundSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.CompoundSearch.prototype.fetchCompound = function(compoundURI, lens, callback) {
	params = {};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['uri'] = compoundURI;
	lens ? params['lens'] = lens : '';
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound',
		dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.CompoundSearch.prototype.compoundPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
	params = {};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['uri'] = URI;
	assayOrganism ? params['assay_organism'] = assayOrganism : '';
	targetOrganism ? params['target_organism'] = targetOrganism : '';
	activityType ? params['activity_type'] = activityType : '';
	activityValue ? params['activity_value'] = activityValue : '';
	minActivityValue ? params['min-activity_value'] = minActivityValue : '';
	minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
	maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
	maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
	activityUnit ? params['activity_unit'] = activityUnit : '';
	activityRelation ? params['activity_relation'] = activityRelation : '';
	pChembl ? params['pChembl'] = pChembl : '';
	minpChembl ? params['min-pChembl'] = minpChembl : '';
	minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
	maxpChembl ? params['max-pChembl'] = maxpChembl : '';
	maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
	targetType ? params['target_type'] = targetType : '';
	page ? params['_page'] = page : '';
	pageSize ? params['_pageSize'] = pageSize : '';
	orderBy ? params['_orderBy'] = orderBy : '';
	lens ? params['_lens'] = lens : '';

	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/pages',
		dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.CompoundSearch.prototype.compoundPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
	params = {};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['uri'] = URI;
	assayOrganism ? params['assay_organism'] = assayOrganism : '';
	targetOrganism ? params['target_organism'] = targetOrganism : '';
	activityType ? params['activity_type'] = activityType : '';
	activityValue ? params['activity_value'] = activityValue : '';
	minActivityValue ? params['min-activity_value'] = minActivityValue : '';
	minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
	maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
	maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
	activityUnit ? params['activity_unit'] = activityUnit : '';
	activityRelation ? params['activity_relation'] = activityRelation : '';
	pChembl ? params['pChembl'] = pChembl : '';
	minpChembl ? params['min-pChembl'] = minpChembl : '';
	minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
	maxpChembl ? params['max-pChembl'] = maxpChembl : '';
	maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
	targetType ? params['target_type'] = targetType : '';
	lens ? params['_lens'] = lens : '';

	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/pharmacology/count',
		dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.CompoundSearch.prototype.compoundClassifications = function(URI, tree, callback) {
	var compoundQuery = $.ajax({
		url: this.baseURL + '/compound/classifications',
		dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: URI,
			app_id: this.appID,
			app_key: this.appKey,
			tree: tree
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.CompoundSearch.prototype.parseCompoundResponse = function(response) {
	var constants = new Openphacts.Constants();
	var id = null,
		prefLabel = null,
		cwURI = null,
		description = null,
		biotransformationItem = null,
		toxicity = null,
		proteinBinding = null,
		csURI = null,
		hba = null,
		hbd = null,
		inchi = null,
		logp = null,
		psa = null,
		ro5Violations = null,
		smiles = null,
		chemblURI = null,
		fullMWT = null,
		molform = null,
		mwFreebase = null,
		rtb = null,
		inchiKey = null,
		drugbankURI = null,
		molweight = null,
		molformula = null;
	var drugbankData, chemspiderData, chemblData, conceptWikiData;
	uri = response.primaryTopic[constants.ABOUT];

    // check if we already have the CS URI
    var possibleURI = 'http://' + new URL(uri).hostname;
    csURI = constants.SRC_CLS_MAPPINGS[possibleURI] === 'chemspiderValue' ? uri : null;

	var drugbankProvenance, chemspiderProvenance, chemblProvenance;
	var descriptionItem, toxicityItem, proteinBindingItem, hbaItem, hbdItem, inchiItem, logpItem, psaItem, ro5VioloationsItem, smilesItem, inchiKeyItem, molformItem, fullMWTItem, mwFreebaseItem;
	var drugbankLinkout, chemspiderLinkOut, chemblLinkOut;

	// this id is not strictly true since we could have searched using a chemspider id etc
	id = uri.split("/").pop();
	prefLabel = response.primaryTopic.prefLabel ? response.primaryTopic.prefLabel : null;
        cwURI = constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] == 'conceptWikiValue' ? response.primaryTopic[constants.ABOUT] : cwURI; 
	//if an ops.rsc.org uri is used then the compound chemistry details are found in the top level
	hba = response.primaryTopic.hba != null ? response.primaryTopic.hba : null;
	hbd = response.primaryTopic.hbd != null ? response.primaryTopic.hbd : null;
	inchi = response.primaryTopic.inchi != null ? response.primaryTopic.inchi : null;
	inchiKey = response.primaryTopic.inchikey != null ? response.primaryTopic.inchikey : null;
	logp = response.primaryTopic.logp != null ? response.primaryTopic.logp : null;
	molform = response.primaryTopic.molformula != null ? response.primaryTopic.molformula : null;
	fullMWT = response.primaryTopic.molweight != null ? response.primaryTopic.molweight : null;
	psa = response.primaryTopic.psa != null ? response.primaryTopic.psa : null;
	ro5Violations = response.primaryTopic.ro5_violations != null ? response.primaryTopic.ro5_violations : null;
	rtb = response.primaryTopic.rtb !== null ? response.primaryTopic.rtb : null;
	smiles = response.primaryTopic.smiles != null ? response.primaryTopic.smiles : null;

	$.each(response.primaryTopic.exactMatch, function(i, match) {
		var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
			drugbankData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
			chemspiderData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
			chemblData = match;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
			conceptWikiData = match;
		}
	});
	if (drugbankData) {
		description = drugbankData.description != null ? drugbankData.description : description;
		biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
		toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
		proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
		drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

		// provenance
		drugbankLinkout = drugbankURI;
		drugbankProvenance = {};
		drugbankProvenance['source'] = 'drugbank';
		drugbankProvenance['description'] = drugbankLinkout;
		drugbankProvenance['biotransformation'] = drugbankLinkout;
		drugbankProvenance['toxicity'] = drugbankLinkout;
		drugbankProvenance['proteinBinding'] = drugbankLinkout;

	}
	if (chemspiderData) {
		csURI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : csURI;
		hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
		hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
		inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
		logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
		psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
		ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
		smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
		inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : inchikey;
		rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
		fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : molweight;
		molform = chemspiderData.molformula != null ? chemspiderData.molformula : molformula;

		// provenance 
		chemspiderLinkOut = csURI;
		chemspiderProvenance = {};
		chemspiderProvenance['source'] = 'chemspider';
		chemspiderProvenance['hba'] = chemspiderLinkOut;
		chemspiderProvenance['hbd'] = chemspiderLinkOut;
		chemspiderProvenance['inchi'] = chemspiderLinkOut;
		chemspiderProvenance['logp'] = chemspiderLinkOut;
		chemspiderProvenance['psa'] = chemspiderLinkOut;
		chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
		chemspiderProvenance['smiles'] = chemspiderLinkOut;
		chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
		chemspiderProvenance['molform'] = chemspiderLinkOut;

	}
	if (chemblData) {
		chemblURI = chemblData["_about"] != null ? chemblData["_about"] : chemblURI;
		mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

		// provenance
		chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblURI.split("/").pop();
		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';
		chemblProvenance['fullMWT'] = chemblLinkOut;
		chemblProvenance['mwFreebase'] = chemblLinkOut;
		chemblProvenance['rtb'] = chemblLinkOut;
	}
	if (conceptWikiData) {
		prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
		cwURI = conceptWikiData["_about"] != null ? conceptWikiData["_about"] : cwURI;
	}
	return {
		"id": id,
		"cwURI": cwURI,
		"prefLabel": prefLabel,
		"URI": uri,
		"description": description,
		"biotransformationItem": biotransformationItem,
		"toxicity": toxicity,
		"proteinBinding": proteinBinding,
		"csURI": csURI,
		"hba": hba,
		"hbd": hbd,
		"inchi": inchi,
		"logp": logp,
		"psa": psa,
		"ro5Violations": ro5Violations,
		"smiles": smiles,
		"chemblURI": chemblURI,
		"fullMWT": fullMWT,
		"molform": molform,
		"mwFreebase": mwFreebase,
		"rtb": rtb,
		"inchiKey": inchiKey,
		"drugbankURI": drugbankURI,

		"drugbankProvenance": drugbankProvenance,
		"chemspiderProvenance": chemspiderProvenance,
		"chemblProvenance": chemblProvenance,

	};
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyResponse = function(response) {
	var drugbankProvenance, chemspiderProvenance, chemblProvenance, conceptwikiProvenance;
	var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(i, item) {

		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';

		var chembl_activity_uri = item[constants.ABOUT];
		var chembl_src = item[constants.IN_DATASET];
		// according to the API docs pmid can be an array but an array of what?
		var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
		var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
		var activity_unit_block = item['activity_unit'];
		var activity_standard_units = activity_unit_block ? activity_unit_block.prefLabel : null;
		//var activity_standard_units = item['standardUnits'] ? item['standardUnits'] : null;
		var activity_standard_value = item['standardValue'] ? item['standardValue'] : null;
		var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
		//TODO seems to be some confusion about what the value is called
		var activity_activity_value = item['activity_value'] ? item['activity_value'] : null;
		var pChembl = item['pChembl'] ? item['pChembl'] : null;

		var compound_full_mwt_item = null;

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';
		if (forMolecule != null) {
			var chembl_compound_uri = forMolecule[constants.ABOUT];
			var compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			var em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null,
			compound_pref_label = null,
			cw_src = null,
			cs_compound_uri = null,
			compound_inchi = null,
			compound_inchikey = null,
			compound_smiles = null,
			cs_src = null,
			drugbank_compound_uri = null,
			compound_drug_type = null,
			compound_generic_name = null,
			drugbank_src = null,
			csid = null,
			compound_smiles_item = null,
			compound_inchi_item = null,
			compound_inchikey_item = null,
			compound_pref_label_item = null;
		//during testing there have been cases where em is null
		var chemblMolecule = em != null ? em[constants.ABOUT] : null;
		if (em != null) {
			$.each(em, function(index, match) {
				var src = match[constants.IN_DATASET];
				if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
					cw_compound_uri = match[constants.ABOUT];
					compound_pref_label = match[constants.PREF_LABEL];
					compound_pref_label_item = cw_compound_uri;
					cw_src = match["inDataset"];
				} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
					cs_compound_uri = match[constants.ABOUT];
					csid = cs_compound_uri.split('/').pop();
					compound_inchi = match['inchi'];
					compound_inchikey = match['inchikey'];
					compound_smiles = match['smiles'];
					var chemSpiderLink = 'http://www.chemspider.com/' + csid;
					compound_smiles_item = chemSpiderLink;
					compound_inchi_item = chemSpiderLink;
					compound_inchikey_item = chemSpiderLink;
					cs_src = match["inDataset"];
				} else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
					drugbank_compound_uri = match[constants.ABOUT];
					compound_drug_type = match['drugType'];
					compound_generic_name = match['genericName'];
					drugbank_src = match[constants.ABOUT];
				}
			});
		}

		var target_title_item = null,
			target_organism_item = null,
			activity_activity_type_item = null,
			activity_standard_value_item = null,
			activity_standard_units_item = null,
			activity_relation_item = null,
			assay_description = null,
			assay_description_item = null,
			assay_organism = null,
			assay_organism_src = null,
			assay_organism_item = null;

		var onAssay = item[constants.ON_ASSAY];
		if (onAssay != null) {
			var chembl_assay_uri = onAssay[constants.ABOUT];
			var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';
			assay_description = onAssay['description'];
			var chembleAssayLink = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description_item = chembleAssayLink;
			assay_organism = onAssay['assayOrganismName'] ? onAssay['assayOrganismName'] : null;
			assay_organism_item = chembleAssayLink;
			chemblProvenance['assayOrganism'] = chembleAssayLink;
			chemblProvenance['assayDescription'] = chembleAssayLink;

			var target = onAssay[constants.ON_TARGET];
			var targets = [];
			var target_organisms = [];

			if ($.isArray(target)) {
				$.each(target, function(index, target_item) {
					// For Target
					var target_inner = {};
					target_inner['title'] = target_item['title']
					target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
					if (target_item["_about"]) {
						target_inner['about'] = target_item['_about'];
						var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
						target_inner['item'] = targetLink;
					} else {
						target_inner['item'] = '';
					}
					targets.push(target_inner);

					// For Organism
					var organism_inner = {};
					organism_inner['organism'] = target_item.targetOrganismName ? target_item.targetOrganismName : '';
					organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
					if (target_item["_about"]) {
						var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target_item["_about"].split('/').pop();
						organism_inner['item'] = organismLink;
					} else {
						organism_inner['item'] = '';
					}
					target_organisms.push(organism_inner);
				});
			} else {
				// For Target
				var target_inner = {};
				target_inner['title'] = target['title']
				target_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
				if (target["_about"]) {
					target_inner['about'] = target['_about'];
					var targetLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
					target_inner['item'] = targetLink;
					chemblProvenance['targetTitle'] = targetLink;
				} else {
					target_inner['item'] = '';
				}
				targets.push(target_inner);

				// For Organism
				var organism_inner = {};
				organism_inner['organism'] = target.targetOrganismName ? target.targetOrganismName : '';
				organism_inner['src'] = onAssay["inDataset"] ? onAssay["inDataset"] : '';
				if (target["_about"]) {
					var organismLink = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target["_about"].split('/').pop();
					organism_inner['item'] = organismLink;
					chemblProvenance['organismTitle'] = organismLink;
				} else {
					organism_inner['item'] = '';
				}
				target_organisms.push(organism_inner);
			}
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

		activity_activity_type_item = chemblActivityLink;
		activity_standard_value_item = chemblActivityLink;
		activity_standard_units_item = chemblActivityLink;
		activity_relation_item = chemblActivityLink;
		records.push({
			//for compound
			compoundInchikey: compound_inchikey,
			compoundDrugType: compound_drug_type,
			compoundGenericName: compound_generic_name,
			targets: targets,
			compoundInchikeySrc: cs_src,
			compoundDrugTypeSrc: drugbank_src,
			compoundGenericNameSrc: drugbank_src,
			targetTitleSrc: chembl_src,
			//for target
			chemblActivityUri: chembl_activity_uri,
			chemblCompoundUri: chembl_compound_uri,
			compoundFullMwt: compound_full_mwt,
			cwCompoundUri: cw_compound_uri,
			compoundPrefLabel: compound_pref_label,
			csCompoundUri: cs_compound_uri,
			csid: csid,
			compoundInchi: compound_inchi,
			compoundSmiles: compound_smiles,
			chemblAssayUri: chembl_assay_uri,
			targetOrganisms: target_organisms,
			assayOrganism: assay_organism,
			assayDescription: assay_description,
			activityRelation: activity_relation,
			activityStandardUnits: activity_standard_units,
			activityStandardValue: activity_standard_value,
			activityActivityType: activity_activity_type,
			activityValue: activity_activity_value,

			compoundFullMwtSrc: chembl_src,
			compoundPrefLabel_src: cw_src,
			compoundInchiSrc: cs_src,
			compoundSmilesSrc: cs_src,
			targetOrganismSrc: chembl_src,
			assayOrganismSrc: chembl_src,
			assayDescriptionSrc: chembl_src,
			activityRelationSrc: chembl_src,
			activityStandardUnitsSrc: chembl_src,
			activityStandardValueSrc: chembl_src,
			activityActivityTypeSrc: chembl_src,
			activityPubmedId: activity_pubmed_id,
			assayDescriptionItem: assay_description_item,
			assayOrganismItem: assay_organism_item,
			activityActivityTypeItem: activity_activity_type_item,
			activityRelationItem: activity_relation_item,
			activityStandardValueItem: activity_standard_value_item,
			activityStandardUnitsItem: activity_standard_units_item,
			compoundFullMwtItem: compound_full_mwt_item,
			compoundSmilesItem: compound_smiles_item,
			compoundInchiItem: compound_inchi_item,
			compoundInchikeyItem: compound_inchikey_item,
			compoundPrefLabelItem: compound_pref_label_item,
			pChembl: pChembl,
			chemblProvenance: chemblProvenance
		});
	});
	return records;
}

Openphacts.CompoundSearch.prototype.parseCompoundPharmacologyCountResponse = function(response) {
	return response.primaryTopic.compoundPharmacologyTotalResults;
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.ConceptWikiSearch = function(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.ConceptWikiSearch.prototype.byTag = function(query, limit, branch, type, callback) {
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: {
			q: query,
			limit: limit,
			branch: branch,
			uuid: type,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ConceptWikiSearch.prototype.freeText = function(query, limit, branch, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['limit'] = limit : '';
    branch ? params['branch'] = branch : '';

	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/freetext",
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ConceptWikiSearch.prototype.findCompounds = function(query, limit, branch, callback) {
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: {
			q: query,
			limit: limit,
			branch: branch,
			uuid: '07a84994-e464-4bbf-812a-a4b96fa3d197',
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ConceptWikiSearch.prototype.findTargets = function(query, limit, branch, callback) {
	var conceptWikiSearcher = $.ajax({
		url: this.baseURL + "/search/byTag",
                dataType: 'json',
		cache: true,
		data: {
			q: query,
			limit: limit,
			branch: branch,
			uuid: 'eeaec894-d856-4106-9fa1-662b1dc6c6f1',
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ConceptWikiSearch.prototype.findConcept = function(uuid, callback) {
	var conceptWikiSearcher = $.ajax({
                dataType: 'json',
		url: this.baseURL + "/getConceptDescription",
		cache: true,
		data: {
			uuid: uuid,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ConceptWikiSearch.prototype.parseResponse = function(response) {
	var uris = [];
	//response can be either array or singleton.
    if (response.primaryTopic.result) {
	    if (response.primaryTopic.result instanceof Array) {
		    $.each(response.primaryTopic.result, function(i, match) {
			    uris.push({
				   'uri': match["_about"],
				   'prefLabel': match["prefLabel"],
				   'match': match["match"]
			    });
		    });
	    } else {
            uris.push({
			    'uri': response.primaryTopic.result["_about"],
			    'prefLabel': response.primaryTopic.result["prefLabel"],
			    'match': response.primaryTopic.result["match"]
		    });
        }
    }
	return uris;
}

Openphacts.ConceptWikiSearch.prototype.parseFindConceptResponse = function(response) {
	var prefLabel = response.primaryTopic.prefLabel_en;
	var definition = response.primaryTopic.definition;
	var altLabels = [];
	if (response.primaryTopic.altLabel_en) {
		$.each(response.primaryTopic.altLabel_en, function(index, altLabel) {
			altLabels.push(altLabel);
		});
	}
	return {
		prefLabel: prefLabel,
		definition: definition,
		altLabels: altLabels
	};
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.TargetSearch = function TargetSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TargetSearch.prototype.fetchTarget = function(targetURI, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = targetURI;
    lens ? params['lens'] = lens : '';
	var targetQuery = $.ajax({
		url: this.baseURL + '/target',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.compoundsForTarget = function(targetURI, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/classificationsForCompounds',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			uri: targetURI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.targetPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';

	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.targetPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    lens ? params['_lens'] = lens : '';

	var targetQuery = $.ajax({
		url: this.baseURL + '/target/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.targetTypes = function(lens, callback) {
	var targetQuery = $.ajax({
		url: this.baseURL + '/target/types',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			lens: lens,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TargetSearch.prototype.parseTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
	var drugbankData = null, chemblData = null, uniprotData = null, cellularLocation = null, molecularWeight = null, numberOfResidues = null, theoreticalPi = null, drugbankURI = null, functionAnnotation  =null, alternativeName = null, existence = null, organism = null, sequence = null, uniprotURI = null, URI = null, cwUri = null;
	var drugbankProvenance, chemblProvenance, uniprotProvenance, conceptwikiProvenance;
	var URI = response.primaryTopic[constants.ABOUT];
	var id = URI.split("/").pop();
	var keywords = [];
	var classifiedWith = [];
	var seeAlso = [];
    var chemblItems = [];
    var label = response.primaryTopic[constants.PREF_LABEL];
	$.each(response.primaryTopic[constants.EXACT_MATCH], function(i, exactMatch) {
        var src = exactMatch[constants.IN_DATASET];
		if (src) {
			if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
				drugbankData = exactMatch;
                cellularLocation = drugbankData.cellularLocation ? drugbankData.cellularLocation : null;
                numberOfResidues = drugbankData.numberOfResidues ? drugbankData.numberOfResidues : null;
                theoreticalPi = drugbankData.theoreticalPi ? drugbankData.theoreticalPi : null;
                drugbankURI = drugbankData[constants.ABOUT] ? drugbankData[constants.ABOUT] : null;

                var drugbankLinkOut = drugbankURI;
                drugbankProvenance = {};
                drugbankProvenance['source'] = 'drugbank';
                drugbankProvenance['cellularLocation'] = drugbankLinkOut;
                drugbankProvenance['numberOfResidues'] = drugbankLinkOut;
                drugbankProvenance['theoreticalPi'] = drugbankLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                // there can be multiple proteins per target response
			    chemblData = exactMatch;
                var chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
                chemblDataItem = {};
                chemblDataItem['chembl_src'] = chemblData[constants.IN_DATASET];
                chemblUri = chemblData[constants.ABOUT];
                chemblLinkOut += chemblUri.split('/').pop();
                chemblDataItem['linkOut'] = chemblLinkOut;
                // synomnys
                var synonymsData;
                if (chemblData[constants.LABEL]) {
                    synonymsData = chemblData[constants.LABEL];
                }
                chemblDataItem['synonyms'] = synonymsData;
                var targetComponents = {};
                if (chemblData[constants.HAS_TARGET_COMPONENT]) {
                    $.each(chemblData[constants.HAS_TARGET_COMPONENT], function(index, targetComponent) {
                      targetComponents[targetComponent[constants.ABOUT]] = targetComponent.description;
                    });
                }
                chemblDataItem['targetComponents'] = targetComponents;
                chemblDataItem['type'] = chemblData.type;
                if (chemblData.keyword) {
				  $.each(chemblData.keyword, function(j, key) {
				 keywords.push(key);
				  });
                }
                chemblDataItem['keywords'] = keywords;
                chemblItems.push(chemblDataItem);

                chemblProvenance = {};
                chemblProvenance['source'] = 'chembl';
                chemblProvenance['synonymsData'] = chemblLinkOut;
                chemblProvenance['targetComponents'] = chemblLinkOut;
                chemblProvenance['type'] = chemblLinkOut;
                chemblProvenance['keywords'] = chemblLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'uniprotValue') {
				uniprotData = exactMatch;
                uniprotURI = uniprotData[constants.ABOUT];
				if (uniprotData.classifiedWith) {
					$.each(uniprotData.classifiedWith, function(j, classified) {
						classifiedWith.push(classified);
					});
				}
				if (uniprotData.seeAlso) {
                    if ($.isArray(uniprotData.seeAlso)) {
					  $.each(uniprotData.seeAlso, function(j, see) {
						  seeAlso.push(see);
					  });
                    } else {
				      seeAlso.push(uniprotData.seeAlso);
                    }
				}
                molecularWeight =  uniprotData.molecularWeight ? uniprotData.molecularWeight: null;
	            functionAnnotation = uniprotData.Function_Annotation ? uniprotData.Function_Annotation : null;
                alternativeName = uniprotData.alternativeName ? uniprotData.alternativeName : null;
	            existence = uniprotData.existence ? uniprotData.existence : null;
	            organism = uniprotData.organism ? uniprotData.organism : null;
	            sequence = uniprotData.sequence ? uniprotData.sequence : null;

	            uniprotProvenance = {};
	            uniprotLinkOut = uniprotURI;
				uniprotProvenance['source'] = 'uniprot';
	            uniprotProvenance['classifiedWith'] = uniprotLinkOut;
	            uniprotProvenance['seeAlso'] = uniprotLinkOut;
	            uniprotProvenance['molecularWeight'] = uniprotLinkOut;
	            uniprotProvenance['functionAnnotation'] = uniprotLinkOut;
	        	uniprotProvenance['alternativeName'] = uniprotLinkOut;
	            uniprotProvenance['existence'] = uniprotLinkOut;
	            uniprotProvenance['organism'] = uniprotLinkOut;
	            uniprotProvenance['sequence'] = uniprotLinkOut;
			} else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                  // if using a chembl id to search then the about would be a chembl id rather than the
                  // cw one which we want
                  //id = exactMatch[constants.ABOUT].split("/").pop();
                  cwUri = exactMatch[constants.ABOUT];
                  label = exactMatch[constants.PREF_LABEL];
                  conceptWikiLinkOut = exactMatch[constants.ABOUT];
                  conceptwikiProvenance = {};
                  conceptwikiProvenance['source'] = 'conceptwiki';
                  conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
            }
		}
	});

	return {
		'id': id,
		'cellularLocation': cellularLocation,
		'molecularWeight': molecularWeight,
		'numberOfResidues': numberOfResidues,
		'theoreticalPi': theoreticalPi,
		'drugbankURI': drugbankURI,
		'keywords': keywords,
		'functionAnnotation': functionAnnotation,
		'alternativeName': alternativeName,
		'existence': existence,
		'organism': organism,
		'sequence': sequence,
		'classifiedWith': classifiedWith,
		'seeAlso': seeAlso,
        'prefLabel': label,
        'chemblItems': chemblItems,
        'cwURI': cwUri,
        'URI': URI,
        'chemblProvenance': chemblProvenance,
    	'drugbankProvenance': drugbankProvenance,
    	'uniprotProvenance': uniprotProvenance,
    	'conceptwikiProvenance': conceptwikiProvenance
	};
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyResponse = function(response) {
    var constants = new Openphacts.Constants();
	var records = [];

	$.each(response.items, function(index, item) {

		chemblProvenance = {};
		chemblProvenance['source'] = 'chembl';

		var chembl_activity_uri = item["_about"];
		var chembl_src = item["inDataset"];

		//big bits
		var forMolecule = item[constants.FOR_MOLECULE];
		var chembl_compound_uri;
		var compound_full_mwt;
		var compound_full_mwt_item;

		var em;
		var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';

		if (forMolecule != null) {
			chembl_compound_uri = forMolecule["_about"];
			//compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
			chembleMoleculeLink += chembl_compound_uri.split('/').pop();
			compound_full_mwt_item = chembleMoleculeLink;
			em = forMolecule["exactMatch"];
		}

		var cw_compound_uri = null, compound_pref_label = null, cw_src = null, cs_compound_uri = null, compound_inchi = null, compound_inchikey = null, compound_smiles = null, cs_src = null, drugbank_compound_uri = null, compound_drug_type = null, compound_generic_name = null, drugbank_src = null, csid = null, compound_pref_label_item = null, compound_inchi_item = null, compound_inchikey_item = null, compound_smiles_item = null, assay_description = null, assay_description_item = null, compound_ro5_violations = null;

		$.each(em, function(index, match) {
          var src = match[constants.IN_DATASET];
          if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
              cw_compound_uri = match["_about"];
              compound_pref_label = match['prefLabel'];
              cw_src = match["inDataset"];
              compound_pref_label_item = cw_compound_uri;
          } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
              cs_compound_uri = match["_about"];
              csid = cs_compound_uri.split('/').pop();
              compound_inchi = match['inchi'];
              compound_inchikey = match['inchikey'];
              compound_smiles = match['smiles'];
              compound_full_mwt = match.molweight;
              compound_ro5_violations = match.ro5_violations;
              cs_src = match["inDataset"];
              var chemSpiderLink = 'http://www.chemspider.com/' + csid;
              compound_inchi_item = chemSpiderLink;
              compound_inchikey_item = chemSpiderLink;
              compound_smiles_item = chemSpiderLink;
          }// else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
           //   drugbank_compound_uri = match["_about"];
           //   compound_drug_type = match['drugType'];
           //   compound_generic_name = match['genericName'];
           //   drugbank_src = match["_about"];
          //}
        });

		var onAssay = item[constants.ON_ASSAY];
		var chembl_assay_uri;
		var assay_organism;
		var assay_organism_item;
		var target;
		var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';

		if (onAssay != null) {
			chembl_assay_uri = onAssay[constants.ABOUT];
			assay_organism = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
			assay_organism_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			assay_description = onAssay['description'] ? onAssay['description'] : null;
			//assay_description_item = chembldAssayLink + chembl_assay_uri.split('/').pop();
			target = onAssay[constants.ON_TARGET];
		}
		var chembl_target_uri;
		var target_pref_label;
		var target_pref_label_item;
		var targetMatch;
		var target_title = null;
		var target_organism;
		var target_organism_item;
		var target_concatenated_uris;
		var chemblTargetLink = 'https://www.ebi.ac.uk/chembldb/target/inspect/';
		var target_organisms = new Array();
		var targets = new Array();
		if (target != null) {
			chembl_target_uri = target["_about"];
			//target_pref_label = target['prefLabel'];
            //TODO The exact match stuff does not seem to exist any more
			//targetMatch = target['exactMatch'];
            target_title = target.title;
			//if (targetMatch != null) {
			//	var targetMatchURI = targetMatch["_about"];
			//	target_pref_label = targetMatch['prefLabel'];
			//	target_pref_label_item = targetMatchURI;
			//	target_title = target_pref_label ? target_pref_label : null;
			//}

			target_organism = target['targetOrganismName'];
			target_organism_item = chemblTargetLink + chembl_target_uri.split('/').pop();
			//target_concatenated_uris = target['concatenatedURIs'];
			var target_organisms_inner = {};
			target_organisms_inner['organism'] = target_organism;
			target_organisms_inner['src'] = target_organism_item;
			target_organisms.push(target_organisms_inner);
			var targets_inner = {};
			targets_inner['title'] = target_title;
			targets_inner['cw_uri'] = target_pref_label_item ? target_pref_label_item : null;
            targets_inner['URI'] = target[constants.ABOUT];
			targets.push(targets_inner);
		}

		var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/crossrefsearch.ebi?id=' + chembl_activity_uri.split('/a').pop() + '&db=chembl-activity&ref=chembl-compound';

		var activity_activity_type_item, activity_standard_value_item, activity_standard_units_item, activity_relation_item;

		var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
		activity_activity_type_item = chemblActivityLink;
		var activity_standard_value = item['activity_value'] ? item['activity_value'] : null;
		activity_standard_value_item = chemblActivityLink;
		var activity_standard_units = item.activity_unit ? item.activity_unit.prefLabel : null;
		activity_standard_units_item = chemblActivityLink;
		var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
		activity_relation_item = chemblActivityLink;
		var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
        var pChembl = item.pChembl;
		records.push({ //for compound
			'compoundInchikey': compound_inchikey,
			//compoundDrugType: compound_drug_type,
			//compoundGenericName: compound_generic_name,
			'targetTitle': target_title,
			//targetConcatenatedUris: target_concatenated_uris,

			'compoundInchikeySrc': cs_src,
			//compoundDrugTypeSrc: drugbank_src,
			//compoundGenericNameSrc: drugbank_src,
			'targetTitleSrc': chembl_src,
			//targetConcatenatedUrisSrc: chembl_src,


			//for target
			'chemblActivityUri': chembl_activity_uri,
			'chemblCompoundUri': chembl_compound_uri,
			'compoundFullMwt': compound_full_mwt,
			'cwCompoundUri': cw_compound_uri,
			'compoundPrefLabel': compound_pref_label,
			'csCompoundUri': cs_compound_uri,
			'csid': csid,
			'compoundInchi': compound_inchi,
			'compoundSmiles': compound_smiles,
			'chemblAssayUri': chembl_assay_uri,
			'chemblTargetUri': chembl_target_uri,

			//targetOrganism: target_organism,
			'targetOrganisms': target_organisms,
			//targetPrefLabel: target_pref_label,

			'assayOrganism': assay_organism,
			'assayDescription': assay_description,
			'activityRelation': activity_relation,
			'activityStandardUnits': activity_standard_units,
			'activityStandardValue': activity_standard_value,
			'activityActivityType': activity_activity_type,
			'activityPubmedId': activity_pubmed_id,

			'compoundFullMwtSrc': chembl_src,
			'compoundPrefLabelSrc': cw_src,
			'compoundInchiSrc': cs_src,
			'compoundSmilesSrc': cs_src,
			//targetOrganismSrc: chembl_src,
			'targetPrefLabelSrc': cw_src,
			'assayOrganismSrc': chembl_src,
			'assayDescriptionSrc': chembl_src,
			'activityRelationSrc': chembl_src,
			'activityStandardUnits_src': chembl_src,
			'activityStandardValue_src': chembl_src,
			'activityActivityType_src': chembl_src,

			'compoundPrefLabelItem': compound_pref_label_item,
			'activityActivityTypeItem': activity_activity_type_item,
			'activityRelationItem': activity_relation_item,
			'activityStandardValueItem': activity_standard_value_item,
			'activityStandardUnitsItem': activity_standard_units_item,
			'compoundFullMwtItem': compound_full_mwt_item,
			'compoundSmilesItem': compound_smiles_item,
			'compoundInchiItem': compound_inchi_item,
			'compoundInchikeyItem': compound_inchikey_item,
			//targetPrefLabelItem: target_pref_label_item,
			'assayOrganismItem': assay_organism_item,
			//assayDescriptionItem: assay_description_item,
		    //targetOrganismItem: target_organism_item,
			'targets': targets,
            'pChembl': pChembl,
            'compoundRO5Violations': compound_ro5_violations,
            'chemblProvenance': chemblProvenance
		});
	});
	return records;
}

Openphacts.TargetSearch.prototype.parseTargetPharmacologyCountResponse = function(response) {
    return response.primaryTopic.targetPharmacologyTotalResults;
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.StructureSearch = function StructureSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.StructureSearch.prototype.exact = function(smiles, matchType, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        matchType != null ? params['searchOptions.MatchType'] = matchType : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/exact',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.substructure = function(smiles, molType, start, count, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['searchOptions.Molecule'] = smiles;
    molType != null ? params['searchOptions.MolType'] = molType : '';
    start != null ? params['resultOptions.Start'] = start : '';
    count != null ? params['resultOptions.Count'] = count : '';
    var exactQuery = $.ajax({
		url: this.baseURL + '/structure/substructure',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.inchiKeyToURL = function(inchiKey, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
		    _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    inchi_key: inchiKey
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.inchiToURL = function(inchi, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
	            _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    inchi: inchi
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.similarity = function(smiles, type, threshold, alpha, beta, start, count, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        type != null ? params['searchOptions.SimilarityType'] = type : params['searchOptions.SimilarityType'] = 0;
        threshold != null ? params['searchOptions.Threshold'] = threshold : params['searchOptions.Threshold'] = 0.99;
        alpha != null ? params['searchOptions.Alpha'] = alpha : '';
        beta != null ? params['searchOptions.Beta'] = beta : '';
        start != null ? params['resultOptions.Start'] = start : '';
        count != null ? params['resultOptions.Count'] = count : '';
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure/similarity',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.smilesToURL = function(smiles, callback) {
	var exactQuery = $.ajax({
		url: this.baseURL + '/structure',
                dataType: 'json',
		cache: true,
		data: {
	            _format: "json",
                    app_id: this.appID,
                    app_key: this.appKey,
                    smiles: smiles
                },
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.StructureSearch.prototype.parseExactResponse = function(response) {
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push(result);
        });
    } else {
        results.push(response.primaryTopic.result);
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseSubstructureResponse = function(response) {
    var constants = new Openphacts.Constants();
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
    } else {
        results.push({"about": response.primaryTopic.result[constants.ABOUT], "relevance": response.primaryTopic.result[constants.RELEVANCE]});
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseInchiKeyToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

Openphacts.StructureSearch.prototype.parseInchiToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

Openphacts.StructureSearch.prototype.parseSimilarityResponse = function(response) {
    var constants = new Openphacts.Constants();
    var results = [];
    if ($.isArray(response.primaryTopic.result)) {
        $.each(response.primaryTopic.result, function(i, result) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
    } else {
        results.push({"about": response.primaryTopic.result[constants.ABOUT], "relevance": response.primaryTopic.result[constants.RELEVANCE]});
    }
	return results;
}

Openphacts.StructureSearch.prototype.parseSmilesToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.ActivitySearch = function ActivitySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.ActivitySearch.prototype.getTypes = function(activityUnit, page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    activityUnit ? params['activity_unit'] = activityUnit : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
	var activityQuery = $.ajax({
		url: this.baseURL + '/pharmacology/filters/activities',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ActivitySearch.prototype.getUnits = function(activityType, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    lens ? params['_lens'] = lens : '';
    var unitsURL = null;
    activityType != null ? unitsURL = '/pharmacology/filters/units/' + activityType : unitsURL = '/pharmacology/filters/units';
	var activityQuery = $.ajax({
		url: this.baseURL + '/pharmacology/filters/units/' + activityType,
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ActivitySearch.prototype.getAllUnits = function(page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';

    var unitsURL = null;
	var activityQuery = $.ajax({
		url: this.baseURL + '/pharmacology/filters/units',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.ActivitySearch.prototype.parseTypes = function(response) {
    var activityTypes = [];
    if ($.isArray(response.items)) {
	    $.each(response.items, function(i, item) {
          activityTypes.push({uri: item["_about"], label: item.label});
	    });
    } else {
        activityTypes.push({uri: response.items["_about"], label: response.items.label});
    }
	return activityTypes;
}

Openphacts.ActivitySearch.prototype.parseUnits = function(response) {
    var units = [];
	$.each(response.primaryTopic.unit, function(i, type) {
            units.push({uri: type["_about"], label: type.label});
	});
	return units;
}

Openphacts.ActivitySearch.prototype.parseAllUnits = function(response) {
    var units = [];
	$.each(response.items, function(i, item) {
            units.push({uri: item["_about"], label: item.label});
	});
	return units;
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.TreeSearch = function TreeSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.TreeSearch.prototype.getRootNodes = function(root, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree',
                dataType: 'json',
		cache: true,
		data: {
            root: root,
			_format: "json",
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getChildNodes = function(URI, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree/children',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: URI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getParentNodes = function(URI, callback) {
	var query = $.ajax({
		url: this.baseURL + '/tree/parents',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: URI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}


Openphacts.TreeSearch.prototype.getTargetClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
	var query = $.ajax({
		url: this.baseURL + '/target/tree/pharmacology/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getTargetClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var query = $.ajax({
		url: this.baseURL + '/target/tree/pharmacology/pages',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getCompoundClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        lens != null ? params['lens'] = lens : '';
	var query = $.ajax({
		url: this.baseURL + '/compound/tree/pharmacology/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.getCompoundClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        relation != null ? params['relation'] = relation : '';
        pChembl != null ? params['pChembl'] = pChembl : '';
        minpChembl != null ? params['min-pChembl'] = minpChembl : '';
        minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
        maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
        maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
        targetType != null ? params['target_type'] = targetType : '';
        lens != null ? params['lens'] = lens : '';
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var query = $.ajax({
		url: this.baseURL + '/compound/tree/pharmacology/pages',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.TreeSearch.prototype.parseRootNodes = function(response) {
    var enzymeRootClasses = [];
    if ($.isArray(response.primaryTopic.hasPart.rootNode)) {
	    $.each(response.primaryTopic.hasPart.rootNode, function(i, member) {
          enzymeRootClasses.push({uri: member["_about"], name: member.prefLabel});
	    });
    } else {
        enzymeRootClasses.push({uri: response.primaryTopic.hasPart.rootNode["_about"], name: response.primaryTopic.hasPart.rootNode.prefLabel});
    }
	return enzymeRootClasses;
}

Openphacts.TreeSearch.prototype.parseChildNodes = function(response) {
	var constants = new Openphacts.Constants();
	var childResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    if ($.isArray(label)) {
	  label = label[0];
    }
    childResponse['label'] = label;
    if ($.isArray(response.primaryTopic.childNode)) {
	  $.each(response.primaryTopic.childNode, function(i, member) {
                var about = member["_about"];
                var names = [];
                if ($.isArray(member.prefLabel)) {
                    $.each(member.prefLabel, function(j, label) {
                        names.push(label);
                    });
                } else {
                   names.push(member.prefLabel);
                }
                treeClasses.push({uri: about, names: names});
	        });
        } else {
	        var about = response.primaryTopic.childNode["_about"];
            var names = [];
            if ($.isArray(response.primaryTopic.childNode.prefLabel)) {
                $.each(response.primaryTopic.childNode.prefLabel, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(response.primaryTopic.childNode.prefLabel);
            }
            treeClasses.push({uri: about, names: names});
        }
        childResponse['children'] = treeClasses;
	    return childResponse;
}

Openphacts.TreeSearch.prototype.parseParentNodes = function(response) {
	var constants = new Openphacts.Constants();
	var parentResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    if ($.isArray(label)) {
	  label = label[0];
    }
    parentResponse['label'] = label;
    if ($.isArray(response.primaryTopic.parentNode)) {
	  $.each(response.primaryTopic.parentNode, function(i, member) {
                var about = member["_about"];
                var names = [];
                if ($.isArray(member.prefLabel)) {
                    $.each(member.prefLabel, function(j, label) {
                        names.push(label);
                    });
                } else {
                   names.push(member.prefLabel);
                }
                treeClasses.push({uri: about, names: names});
	        });
        } else {
	        var about = response.primaryTopic.parentNode["_about"];
            var names = [];
            if ($.isArray(response.primaryTopic.parentNode.prefLabel)) {
                $.each(response.primaryTopic.parentNode.prefLabel, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(response.primaryTopic.parentNode.prefLabel);
            }
            treeClasses.push({uri: about, names: names});
        }
        parentResponse['parents'] = treeClasses;
	    return parentResponse;
}


Openphacts.TreeSearch.prototype.parseTargetClassPharmacologyCount = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.TARGET_PHARMACOLOGY_COUNT];
}

Openphacts.TreeSearch.prototype.parseTargetClassPharmacologyPaginated = function(response) {
    var constants = new Openphacts.Constants();
    var records = [];
    $.each(response.items, function(i, item) {
      var targets = [];
      var chemblActivityURI = null, pmid = null, relation = null, standardUnits = null, standardValue = null, activityType = null, inDataset = null, fullMWT = null, chemblURI = null, cwURI = null, prefLabel = null, csURI = null, inchi = null, inchiKey = null, smiles = null, ro5Violations = null, targetURI = null, targetTitle = null, targetOrganism = null, assayURI = null, assayDescription = null, assayOrganism = null, publishedRelation = null, publishedType = null, publishedUnits = null, publishedValue = null, standardUnits = null, standardValue = null, pChembl = null, activityType = null, activityRelation = null, activityValue = null, activityUnits = null, conceptwikiProvenance = {}, chemspiderProvenance = {}, assayTargetProvenance = {}, assayProvenance = {};
      chemblActivityURI = item["_about"];
      pmid = item.pmid;

      activityType = item.activity_type;
      activityRelation = item.activity_relation;
      activityValue = item.activity_value;
      var units = item.activity_unit;
      if (units) {
          activityUnits = units.prefLabel;
      }

      relation = item.relation ? item.relation : null;
      standardUnits = item.standardUnits;
      standardValue = item.standardValue ? item.standardValue : null;
      activityType = item.activity_type;
      inDataset = item[constants.IN_DATASET];
      forMolecule = item[constants.FOR_MOLECULE];
      chemblURI = forMolecule[constants.ABOUT] ? forMolecule[constants.ABOUT] : null;
      pChembl = item.pChembl ? item.pChembl : null;
      $.each(forMolecule[constants.EXACT_MATCH], function(j, match) {
        var src = match[constants.IN_DATASET];
		if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
            cwURI = match[constants.ABOUT];
            prefLabel = match[constants.PREF_LABEL];
            var conceptWikiLinkOut = cwURI;
            conceptwikiProvenance['source'] = 'conceptwiki';
            conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
		} else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
            csURI = match[constants.ABOUT];
            inchi = match[constants.INCHI];
            inchiKey = match[constants.INCHIKEY];
            smiles = match[constants.SMILES];
            ro5Violations = match[constants.RO5_VIOLATIONS] !== null ? match[constants.RO5_VIOLATIONS] : null;
            fullMWT = match[constants.MOLWT] ? match[constants.MOLWT] : null;
		    var chemspiderLinkOut = csURI;
		    chemspiderProvenance['source'] = 'chemspider';
		    chemspiderProvenance['hba'] = chemspiderLinkOut;
		    chemspiderProvenance['hbd'] = chemspiderLinkOut;
		    chemspiderProvenance['inchi'] = chemspiderLinkOut;
		    chemspiderProvenance['logp'] = chemspiderLinkOut;
		    chemspiderProvenance['psa'] = chemspiderLinkOut;
		    chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
		    chemspiderProvenance['smiles'] = chemspiderLinkOut;
		    chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
		    chemspiderProvenance['molform'] = chemspiderLinkOut;
		}
      });
      var targets = item.hasAssay.hasTarget;
      var assayTargets = [];
      if ($.isArray(targets)) {
          $.each(targets, function(index, target) {
            var targetURI = target[constants.ABOUT];
            var targetTitle = target.title;
            var targetOrganismNames = target.targetOrganismName;
            var targetComponents = target.hasTargetComponent;
            var assayTargetComponents = [];
            if (targetComponents) {
                if ($.isArray(targetComponents)) {
                    $.each(targetComponents, function(j, targetComponent) {
                      var targetComponentLabel = targetComponent[constants.EXACT_MATCH].prefLabel;
                      var targetComponentURI = targetComponent[constants.EXACT_MATCH];
                      assayTargetComponents.push({"label": targetComponentLabel, "uri": targetComponentURI});
                    });
                } else {
	                var targetComponentLabel = null;
	                if (targetComponents[constants.EXACT_MATCH]) {
		                targetComponentLabel = targetComponents[constants.EXACT_MATCH].prefLabel;
	                }
                    //var targetComponentLabel = targetComponents[constants.EXACT_MATCH].prefLabel;
                    var targetComponentURI = targetComponents[constants.ABOUT];
                    assayTargetComponents.push({"label": targetComponentLabel, "uri": targetComponentURI});
                }
            }   
            assayTargets.push({"uri": targetURI, "title": targetTitle, "targetComponents": assayTargetComponents,"targetOrganismNames": targetOrganismNames});
          });
      } else {
          var targetURI = targets[constants.ABOUT];
          var targetTitle = targets.title;
          var targetOrganismNames = targets.targetOrganismName;    
          var targetComponents = targets.hasTargetComponent;
          var assayTargetComponents = [];
          if (targetComponents) {
              if ($.isArray(targetComponents)) {
                  $.each(targetComponents, function(j, targetComponent) {
                    var targetComponentLabel = targetComponent[constants.EXACT_MATCH].prefLabel;
                    var targetComponentURI = targetComponent[constants.EXACT_MATCH];
                    assayTargetComponents.push({"label": targetComponentLabel, "uri": targetComponentURI});
                  });
              } else {
	              var targetComponentLabel = null;
	              if (targetComponents[constants.EXACT_MATCH]) {
		              targetComponentLabel = targetComponents[constants.EXACT_MATCH].prefLabel;
	              }
                  //var targetComponentLabel = targetComponents[constants.EXACT_MATCH].prefLabel;
                  var targetComponentURI = targetComponents[constants.ABOUT];
                  assayTargetComponents.push({"label": targetComponentLabel, "uri": targetComponentURI});
              }
          }
          var assayTargetLinkOut = targetURI;
          assayTargetProvenance['targetOrganismName'] = targetURI;
          assayTargetProvenance['targetComponents'] = targetURI;
          assayTargetProvenance['targetTitle'] = targetURI;
          assayTargets.push({"uri": targetURI, "title": targetTitle, "targetComponents": assayTargetComponents,"targetOrganismNames": targetOrganismNames});
      }
      var onAssay = item[constants.ON_ASSAY];
      assayURI = onAssay["_about"] ? onAssay["_about"] : null;
      assayDescription = onAssay.description ? onAssay.description : null;
      assayOrganismName = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
      var assayOrganismLinkOut = assayURI;
      assayProvenance['assayDescription'] = assayOrganismLinkOut;
      assayProvenance['assayOrganismName'] = assayOrganismLinkOut;
      publishedRelation = item.publishedRelation ? item.publishedRelation : null;
      publishedType = item.publishedType ? item.publishedType : null;
      publishedUnits = item.publishedUnits ? item.publishedUnits : null;
      publishedValue = item.publishedValue ? item.publishedValue : null;
      standardUnits = item.standardUnits ? item.standardUnits : null;
      records.push({
          'targets': assayTargets,
          'chemblActivityURI': chemblActivityURI,
          'pmid': pmid,
          'relation': relation,
          'standardUnits': standardUnits,
          'standardValue': standardValue,
          'activityType': activityType,
          'activityRelation': activityRelation,
          'activityUnits': activityUnits,
          'activityValue': activityValue,
          'inDataset': inDataset,
          'fullMWT': fullMWT,
          'chemblURI': chemblURI,
          'cwURI': cwURI,
          'prefLabel': prefLabel,
          'csURI': csURI,
          'inchi': inchi,
          'inchiKey': inchiKey,
          'smiles': smiles,
          'ro5Violations': ro5Violations,
          //targetURI: targetURI,
          //targetTitle: targetTitle,
          //targetOrganism: targetOrganism,
          'assayURI': assayURI,
          'assayDescription': assayDescription,
          'assayOrganismName': assayOrganismName,
          'publishedRelation': publishedRelation,
          'publishedType': publishedType,
          'publishedUnits': publishedUnits,
          'publishedValue': publishedValue,
          'pChembl': pChembl,
          'conceptWikiProvenance' : conceptwikiProvenance,
          'chemspiderProvenance': chemspiderProvenance,
          'assayTargetProvenance': assayTargetProvenance,
          'assayProvenance': assayProvenance
      });
    });
    return records;
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.PathwaySearch = function PathwaySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.PathwaySearch.prototype.information = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.byCompound = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['organism'] = organism : '';
        lens ? params['lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? params['_orderBy'] = orderBy : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.countPathwaysByCompound = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byCompound/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.byTarget = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byTarget',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.countPathwaysByTarget = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byTarget/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.getTargets = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getTargets',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.getCompounds = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getCompounds',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.byReference = function(URI, organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byReference',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.countPathwaysByReference = function(URI, organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/byReference/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.getReferences = function(URI, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathway/getReferences',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.countPathways = function(organism, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/count',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.list = function(organism, lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        organism ? params['pathway_organism'] = organism : '';
        lens ? params['lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.organisms = function(lens, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        lens ? params['lens'] = lens : '';
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        //TODO order by neeeds an RDF like syntax to work eg ?cw_uri or DESC(?cw_uri), need to hide that
        //from users by having a descending flag and creating the correct syntax here
        orderBy ? orderBy = params['_orderBy'] : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/pathways/organisms',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.PathwaySearch.prototype.parseInformationResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, identifier, revision, title, description, parts, inDataset, pathwayOntology, organism, organismLabel, about, URI = null;
        latest_version = response.primaryTopic.latest_version;
        identifier = response.primaryTopic[constants.ABOUT];
        URI = response.primaryTopic[constants.ABOUT];;
        title = latest_version.title ? latest_version.title : null;
        organism = latest_version.organism[constants.ABOUT] ? latest_version.organism[constants.ABOUT] : null;
        organismLabel = latest_version.organism.label ? latest_version.organism.label : null;
        pathwayOntology = latest_version.pathwayOntology ? latest_version.pathwayOntology : null;
        var pathwayOntologies = [];
        if (pathwayOntology) {
            if ($.isArray(pathwayOntology)) {
	            $.each(pathwayOntology, function(i, ontology) {
                  pathwayOntologies.push(ontology);
	            });
            } else {
                pathwayOntologies.push(pathwayOntology);
            }
        }
        description = latest_version.description ? latest_version.description : null;
        revision = latest_version[constants.ABOUT] ? latest_version[constants.ABOUT] : null;
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var parts = [];
	$.each(partsComplete, function(i, part) {
            parts.push({about: part["_about"], type: part.type});
	});
	// provenance
	var wikipathwaysProvenance = {};
    wikipathwaysProvenance['source'] = 'wikipathways';
    wikipathwaysProvenance['title'] = identifier;
    wikipathwaysProvenance['description'] = identifier;
    wikipathwaysProvenance['organismLabel'] = organism;
	return {
                   'URI': URI,
                   'title': title, 
                   'description': description, 
                   'identifier': identifier,
                   'revision': revision, 
                   'pathwayOntologies': pathwayOntologies,
                   'organism': organism, 
                   'organismLabel': organismLabel, 
                   'parts': parts,
                   'wikipathwaysProvenance': wikipathwaysProvenance
                };
}

Openphacts.PathwaySearch.prototype.parseByCompoundResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          about = parts[constants.ABOUT];
          type = parts.type;
          geneProductLabel = parts.exactMatch.prefLabel;
          geneProductURI = parts[constants.ABOUT];
          geneProductCWURI = parts.exactMatch[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'geneProductLabel': geneProductLabel,
                           'geneProductURI': geneProductURI,
                           'geneProductCWURI': geneProductCWURI,
                           'about': about
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByCompoundResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseByTargetResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, about, type, prefLabel, description, pathwayOntology, geneProductLabel, geneProductURI, geneProductCWURI;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          about = parts[constants.ABOUT];
          type = parts.type;
          geneProductLabel = parts.exactMatch.prefLabel;
          geneProductURI = parts[constants.ABOUT];
          geneProductCWURI = parts.exactMatch[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'geneProductLabel': geneProductLabel,
                           'geneProductURI': geneProductURI,
                           'geneProductCWURI': geneProductCWURI,
                           'about': about
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByTargetResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseGetTargetsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var geneProducts = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              geneProducts.push(part);
	        });
        } else {
            geneProducts.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'geneProducts': geneProducts
            };
}

Openphacts.PathwaySearch.prototype.parseGetCompoundsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var metabolites = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              metabolites.push(part);
	        });
        } else {
            //TODO check this out since the api docs are not really clear if this is true
            metabolites.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'metabolites': metabolites
            };
}

Openphacts.PathwaySearch.prototype.parseByReferenceResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
          title = item.title;
          identifier = item.identifier;
          parts = item.hasPart;
          publication = parts[constants.ABOUT];
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                           'publication': publication,
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseCountPathwaysByReferenceResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseGetReferencesResponse = function(response) {
        var constants = new Openphacts.Constants();
        var latest_version, revision, title, parts;
        latest_version = response.primaryTopic.latest_version;
        title = latest_version.title;
        revision = latest_version[constants.ABOUT];
        var partsComplete = latest_version.hasPart ? latest_version.hasPart : null;
        var references = [];
        if ($.isArray(partsComplete)) {
	        $.each(partsComplete, function(i, part) {
              references.push(part);
	        });
        } else {
            references.push(partsComplete);
        }
	return {
                'title': title, 
                'revision': revision,  
                'references': references
            };
}
Openphacts.PathwaySearch.prototype.parseCountPathwaysResponse = function(response) {
    var constants = new Openphacts.Constants();
	return response.primaryTopic[constants.PATHWAY_COUNT];
}

Openphacts.PathwaySearch.prototype.parseListResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var pathways = [];
        $.each(items, function(i, item) {
          var title, identifier, organism, organismLabel, parts, publication, prefLabel, description, pathwayOntology;
          title = item.title;
          identifier = item.identifier;
          organism = item.pathway_organism[constants.ABOUT];
          organismLabel = item.pathway_organism.label;
          description = item.description ? item.description : null;
          pathwayOntology = item.pathwayOntology ? item.pathwayOntology : null;
          pathways.push({
                           'title': title, 
                           'identifier': identifier,
                           'description': description, 
                           'pathwayOntology': pathwayOntology,
                           'organism': organism, 
                           'organismLabel': organismLabel, 
                        });
        });
	return pathways;
}

Openphacts.PathwaySearch.prototype.parseOrganismsResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.items;
        var organisms = [];
        if ($.isArray(items)) {
            $.each(items, function(i, item) {
              var URI, count, label;
              URI = item[constants.ABOUT];;
              count = item.pathway_count;
              label = item.label;
              organisms.push({
                           'URI': URI, 
                           'count': count,
                           'label': label
                            });
            });
        } else {
            organisms.push({
                         'URI': items[constants.ABOUT], 
                         'count': items.pathway_count,
                         'label': items.label
                          });
        }
	return organisms;
}
//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.MapSearch = function MapSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.MapSearch.prototype.mapURL = function(URI, targetUriPattern, graph, lens, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['Uri'] = URI;
        targetUriPattern ? params['targetUriPattern'] = targetUriPattern : '';
        graph ? params['graph'] = graph : '';
        lens ? params['lens'] = lens : '';
	var pathwayQuery = $.ajax({
		url: this.baseURL + '/mapUri',
        dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.MapSearch.prototype.parseMapURLResponse = function(response) {
        var constants = new Openphacts.Constants();
        var items = response.primaryTopic[constants.EXACT_MATCH];
        var urls = [];
        if ($.isArray(items)) {
	        $.each(items, function(i, item) {
              urls.push(item);
	        });
        } else {
            urls.push(items);
        }
	return urls;
}
Openphacts.DataSources = function DataSources(baseURL, appID, appKey) {
        this.baseURL = baseURL;
        this.appID = appID;
        this.appKey = appKey;
}

Openphacts.DataSources.prototype.getSources = function(callback) {
        var sourcesQuery = $.ajax({
                url: this.baseURL + '/sources',
                dataType: 'json',
                cache: true,
                data: {
                        _format: "json",
                        app_id: this.appID,
                        app_key: this.appKey
                },
                success: function(response, status, request) {
                        callback.call(this, true, request.status, response.result.primaryTopic);
                },
                error: function(request, status, error) {
                        callback.call(this, false, request.status);
                }
        });
}

Openphacts.Version = function Version() {
 
};

Openphacts.Version.prototype.information = function() {
	return {
               "version": "2.0.1", 
               "author": "Ian Dunlop",
               "title": "OPS.js",
               "description": "Javascript library for accessing the Open PHACTS Linked Data API",
               "project": "Open PHACTS",
               "organization": "School of Computer Science",
               "address": "University of Manchester, UK",
               "year": "2013",
               "month": "December",
               "url": "http://github.com/openphacts/ops.js",
               "LDA-version": "1.3"
           }; 
};
