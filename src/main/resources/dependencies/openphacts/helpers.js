Handlebars.registerHelper('targetComponentLink', function (component) {
    if (component.label != null && component.uri != null) {
        var aLink = '<a href="' + component.uri + '" target="_blank">' + component.label + '</a>'
        return new Handlebars.SafeString(aLink);
    } else if (component.label != null) {
        return new Handlebars.SafeString(component.label);
    } else if (component.uri != null) {
        var id = component.uri.split('/').pop();
        var aLink = '<a href="' + component.uri + '" target="_blank" title="No label available for this target component">' + id + '</a>';
        return new Handlebars.SafeString(aLink);
    }
});
Handlebars.registerHelper('targetOrganismLink', function (target) {
    if (target.targetOrganismNames != null && target.uri != null) {
        var aLink = '<a href="' + target.uri + '" target="_blank">' + target.targetOrganismNames + '</a>'
        return new Handlebars.SafeString(aLink);
    } else if (target.targetOrganismNames != null) {
        return new Handlebars.SafeString(target.targetOrganismNames);
    } else if (target.uri != null) {
        var id = target.uri.split('/').pop();
        var aLink = '<a href="' + target.uri + '" target="_blank" title="No organism name available for this target">' + id + '</a>';
        return new Handlebars.SafeString(aLink);
    }
});
Handlebars.registerHelper('assayOrganismLink', function (pharma) {
    if (pharma.get('assayOrganismName') != null && pharma.get('assayURI') != null) {
        var aLink = '<a href="' + pharma.get('assayURI') + '" target="_blank">' + pharma.get('assayOrganismName') + '</a>'
        return new Handlebars.SafeString(aLink);
    } else if (pharma.get('assayOrganismName') != null) {
        return new Handlebars.SafeString(pharma.get('assayOrganismName'));
    } else if (pharma.get('assayURI') != null) {
        var id = pharma.get('assayURI').split('/').pop();
        var aLink = '<a href="' + pharma.get('assayURI') + '" target="_blank" title="No organism name available for this assay">' + id + '</a>';
        return new Handlebars.SafeString(aLink);
    }
});
Handlebars.registerHelper('pdbLink', function (link) {
    if (link != null) {
        var id = link.split("/").pop();
        var aLink = '<a href="' + link + '" target="_blank">' + id + '</a>'
        return new Handlebars.SafeString(aLink);
    }
});
Handlebars.registerHelper('insertKetcherIframe', function (structure) {
    if (structure != null) {
        return new Handlebars.SafeString('<iframe src="/ketcher/ketcher.html?smiles=' + structure.smiles + '&path=' + structure.path + '" id="ketcher-iframe"></iframe>');
    } else {
        return new Handlebars.SafeString('<iframe src="/ketcher/ketcher.html" id="ketcher-iframe"></iframe>');
    }
});
Handlebars.registerHelper('structureSearchHasRelevance', function (type) {
    if (type === "substructure" || type === "similarity") {
        return true;
    }
});
Handlebars.registerHelper('pathwayOrganismLink', function (link, label) {
    if (link != null && label != null) {
        return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + label + '</a>');
    }
});
Handlebars.registerHelper('pathwayRevision', function (link) {
    if (link != null) {
        var text = link.split('/').pop();
        var rev = text.split('_')[1];
        return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + rev + '</a>');
    }
});
Handlebars.registerHelper('textLink', function (link) {
    if (link != null) {
        var text = link.split('/').pop();
        return new Handlebars.SafeString('<a href="' + link + '" target="_blank">' + text + '</a>');
    }
});
Handlebars.registerHelper('getLabelWithTooltip', function (job) {
    return new Handlebars.SafeString('<td title="' + job.filters + '">' + job.label + '</td>');
});
Handlebars.registerHelper('progressBar', function (percentage) {
    return new Handlebars.SafeString('<div class="progress progress-striped active no-margin" title="' + percentage + '%"><div class="bar" style="width: ' + percentage + '%;"></div></div>');
});
Handlebars.registerHelper('completedJob', function (status, uuid) {
    var html = "";
    if (status == "complete") {
        return new Handlebars.SafeString("<a class='btn' target='_blank' href='" + tsvDownloadUrl + "uuid=" + uuid + "' title='TSV file ready. Click button to download.'>Download</a>");
    } else {
        return new Handlebars.SafeString("<button type='button' class='btn btn-disabled' disabled='disabled' title='TSV file still being created. Download button disabled until ready.'>Download</button>");
    }
});
Handlebars.registerHelper("log", function (context) {
    return console.log(context);
});
Handlebars.registerHelper('ontologyLink', function (ontology) {
    if (ontology) {
        return new Handlebars.SafeString('<a href="' + ontology + '">' + ontology.split('/').pop() + '</a>');
    }
});
Handlebars.registerHelper('vocabPart', function (part) {
    if (part) {
        return new Handlebars.SafeString(part.split('#').pop());
    }
});
Handlebars.registerHelper('cs_image_src', function (csURL, options) {
    if (options && csURL) {
        return new Handlebars.SafeString('<img width="128" height="128" src="'+ csURL + '/image">');
    }
});
Handlebars.registerHelper('target_image_src', function (target, options) {
    if (options && target && target.length >= 1) {
        return new Handlebars.SafeString('<img width="128" height="128" src="http://www.rcsb.org/pdb/images/' + target[0].split('/').pop() + '_asr_r_250.jpg"&amp;w=128&amp;h=128/>');
    } else {
        return new Handlebars.SafeString('<img width="128" height="128" src="data:image/png;base64,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"/>');
    }
});
Handlebars.registerHelper('formatMolecularFormula', function (molform) {
    if (molform) {
        return new Handlebars.SafeString(molform.replace(/(\d+)?\s*/g, "<sub>$1</sub>"));
    }
});
Handlebars.registerHelper('linkablePubmedId', function (pubmedId) {
    if (pubmedId) {
        var justId = pubmedId.split("/").pop();
        return new Handlebars.SafeString('<a href="' + pubmedId + '" target="_blank">' + justId + '</a>');
    }
});
Handlebars.registerHelper('linkableChemspiderID', function (chemspiderId) {
    if (chemspiderId) {
        var id = chemspiderId.split("/").pop();
        var fullLink = '<a href="' + chemspiderId + '" target="_blank">' + id + '</a>'
        return new Handlebars.SafeString(fullLink);;
    }
});

Handlebars.registerHelper('linkableOrganism', function (organism) {
    if (organism) {
        var id = organism.split("/").pop();
        var fullLink = '<a href="' + organism + '" target="_blank">' + id + '</a>'
        return new Handlebars.SafeString(fullLink);;
    }
});
Handlebars.registerHelper('linkableExistence', function (existence) {
    if (existence) {
        var id = existence.split("/").pop();
        id = id.replace(/_/g, " ");
        var fullLink = '<a href="' + existence + '" target="_blank">' + id + '</a>'
        return new Handlebars.SafeString(fullLink);;
    }
});

Handlebars.registerHelper('pdbLinkouts', function (pdb) {
    if (pdb) {
        var url = new String();

        $.each(pdb, function (i, item) {
            var id = item.split("/").pop();
            var aLink = '<a href="' + item + '" target="_blank">' + id + '</a>   '
            url += aLink;
        });
        return new Handlebars.SafeString(url);
    }
});
