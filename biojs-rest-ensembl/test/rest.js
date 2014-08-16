var eRest = require('../rest')
var should = require('should')
var _ = require('underscore');

require('mocha')
var assert = require("chai").assert;


describe('BioJS2 REST', function () {
    this.timeout(5000);

    it("Exists and is called eRest", function () {
        assert.isDefined(eRest);
    })
    var rest = eRest();
    it("Has a region limit", function () {
        assert.isDefined(rest.limits);
        assert.isDefined(rest.limits.region);
    })

    it("Has a url submodule", function () {
        assert.isDefined(rest.url)
    })

    describe('Data retrieval', function () {
        // Being friendly with the REST API. The tests are delayed this time
        var delay = 50;
        describe('Ensembl External Ids', function () {
            it("Has a url.xref field", function () {
                assert.isDefined(rest.url.xref);
            })
            var name = "BRCA2"
            var xref_url = rest.url.xref({
                species: "human",
                name: name
            });
            it("Has the correct url", function () {
                assert.equal(xref_url, "http://beta.rest.ensembl.org/xrefs/symbol/human/BRCA2.json?object_type=gene");
            })
            it("Retrieves xrefs from the REST server", function (done) {
                rest.call({
                    url: xref_url,
                    success: function (resp) {
                        assert.isArray(resp);
                        assert.isObject(resp[0]);
                        _.each(resp, function (el) {
                            assert.isObject(el);
                            assert.property(el, "type");
                            assert.equal(el.type, "gene");
                            assert.property(el, "id");
                        });
                        setTimeout(done, delay);
                        // done();
                    }
                })
            })
            describe('Species names', function () {
                it("Accepts scientific species names", function (done) {
                    var species = "homo_sapiens";
                    var name = "BRCA2";
                    rest.call({
                        url: rest.url.xref({
                            species: species,
                            name: name
                        }),
                        success: function (resp) {
                            assert.isArray(resp);
                            assert.isObject(resp[0]);
                            setTimeout(done, delay);
                            // done();
                        }
                    })
                })
                it("Accepts scientific species names without underscores", function (done) {
                    var species = "homo sapiens";
                    var name = "BRCA2";
                    rest.call({
                        url: rest.url.xref({
                            species: species,
                            name: name
                        }),
                        success: function (resp) {
                            assert.isArray(resp);
                            assert.isObject(resp[0]);
                            setTimeout(done, delay);
                            // done();
                        }
                    })
                })
                it("Accepts common names", function (done) {
                    var species = "human";
                    var name = "BRCA2";
                    rest.call({
                        url: rest.url.xref({
                            species: species,
                            name: name
                        }),
                        success: function (resp) {
                            assert.isArray(resp);
                            assert.isObject(resp[0]);
                            setTimeout(done, delay);
                            // done();
                        }
                    })
                })
            })
            it("Fires the error callback on wrong url", function (done) {
                rest.call({
                    url: xref_url + "xxx", /// wrong url
                    error: function (err) {
                        assert.isDefined(err);
                        //assert.equal(err.status, 400);
                        //assert.equal(err.readyState, 4);
                        //assert.equal(err.statusText, "Bad Request");
                        setTimeout(done, delay);
                        // done();
                    }
                })
            })
        });

        describe('Chromosome info', function () {
            it("Has a url.chr_info field", function () {
                assert.isDefined(rest.url.chr_info);
            })
            var chr_info_url = rest.url.chr_info({
                species: "human",
                chr: "13"
            });
            it("Has the correct url", function () {
                assert.equal(chr_info_url, "http://beta.rest.ensembl.org/assembly/info/human/13.json?format=full");
            })
            it("Retrieves chr info", function (done) {
                rest.call({
                    url: chr_info_url,
                    success: function (resp) {
                        assert.isObject(resp);
                        assert.property(resp, "is_chromosome");
                        assert.equal(resp.is_chromosome, 1);
                        assert.property(resp, "length");
                        setTimeout(done, delay);
                        // done();
                    }
                })
            })
        });

        describe('Genomic alignment blocks', function () {
            it("Has a url.aln_block field", function () {
                assert.isDefined(rest.url.aln_block);
            });
            var aln_block_url = rest.url.aln_block({
                species: 'homo_sapiens',
                chr: 2,
                from: 106040000,
                to: 106041500,
                method: 'LASTZ_NET',
                species_set: ['human', 'mouse']
            });
            it("Has the correct url", function () {
                assert.equal(aln_block_url, "http://beta.rest.ensembl.org/alignment/block/region/homo_sapiens/2:106040000-106041500.json?method=LASTZ_NET&species_set=human&species_set=mouse");
            });
            it("Retrieves genomic align blocks", function (done) {
                rest.call({
                    url: aln_block_url,
                    success: function (resp) {
                        assert.isArray(resp);
                        assert.strictEqual(resp.length, 1);
                        assert.property(resp[0], "tree");
                        assert.property(resp[0], "alignments");
                        assert.isArray(resp[0].alignments);
                        assert.isObject(resp[0].alignments[0]);
                        assert.property(resp[0].alignments[0], "start");
                        assert.property(resp[0].alignments[0], "end");
                        assert.strictEqual(resp[0].alignments[0].species, "homo_sapiens");
                        assert.isObject(resp[0].alignments[1]);
                        assert.property(resp[0].alignments[1], "start");
                        assert.property(resp[0].alignments[1], "end");
                        assert.strictEqual(resp[0].alignments[1].species, "mus_musculus");
                        setTimeout(done, delay);
                    }
                });
            });
            it("Fires the error callback on wrong url", function (done) {
                rest.call({
                    url: aln_block_url + "xxx",
                    error: function (err) {
                        assert.isDefined(err);
                        //assert.equal(err.status, 400);
                        //assert.equal(err.readyState, 4);
                        //assert.equal(err.statusText, "Bad Request");
                        setTimeout(done, delay);
                    }
                })
            });
        });

        describe('Ensembl GeneTrees', function () {
            it("Has a url.gene_tree field", function () {
                assert.isDefined(rest.url.gene_tree);
            });

            var gene_tree_url = rest.url.gene_tree({
                id: "ENSGT00390000003602"
            });

            it("Has the correct url", function () {
                assert.equal(gene_tree_url, "http://beta.rest.ensembl.org/genetree/id/ENSGT00390000003602.json?sequence=none");
            });

            it("Retrieves gene trees", function (done) {
                rest.call({
                    url: gene_tree_url,
                    success: function (resp) {
                        assert.isObject(resp);
                        // TODO: Include more structural tests
                        setTimeout(done, delay);
                    }
                });
            });

            it("Doesn't retrieve aligned sequences by default", function (done) {
                rest.call({
                    url: gene_tree_url,
                    success: function (resp) {
                        var check_seq = function (node) {
                            if (node.children === undefined) {
                                assert.isDefined(node.sequence);
                                assert.isUndefined(node.sequence.mol_seq);
                            } else {
                                for (var i = 0; i < node.children.length; i++) {
                                    check_seq(node.children[i]);
                                }
                            }
                        }
                        check_seq(resp.tree);
                        setTimeout(done, delay);
                    }
                });
            });

            it("Retrieves un-aligned sequences when sequence flag is passed", function (done) {
                var gene_tree_url = rest.url.gene_tree({
                    id: "ENSGT00390000003602",
                    sequence: 1
                });
                rest.call({
                    url: gene_tree_url,
                    success: function (resp) {
                        var check_seq = function (node) {
                            if (node.children === undefined) {
                                assert.isDefined(node.sequence);
                                assert.isDefined(node.sequence.mol_seq);
                                assert.strictEqual(node.sequence.mol_seq.is_aligned, 0);
                            } else {
                                for (var i = 0; i < node.children.length; i++) {
                                    check_seq(node.children[i]);
                                }
                            }
                        }
                        check_seq(resp.tree);
                        setTimeout(done, delay);
                    }
                });
            });

            it("Retrieves aligned sequences when align flag is passed", function (done) {
                var gene_tree_url = rest.url.gene_tree({
                    id: "ENSGT00390000003602",
                    aligned: 1
                });
                rest.call({
                    url: gene_tree_url,
                    success: function (resp) {
                        var check_seq = function (node) {
                            if (node.children === undefined) {
                                assert.isDefined(node.sequence);
                                assert.isDefined(node.sequence.mol_seq);
                                assert.strictEqual(node.sequence.mol_seq.is_aligned, 1);
                            } else {
                                for (var i = 0; i < node.children.length; i++) {
                                    check_seq(node.children[i]);
                                }
                            }
                        }
                        check_seq(resp.tree);
                        setTimeout(done, delay);
                    }
                });
            });
        });

        describe('Ensembl Gene Ids', function () {
            it("Has a url.gene field", function () {
                assert.isDefined(rest.url.gene)
            })
            var gene_url = rest.url.gene({
                id: "ENSG00000139618"
            });
            it("Has the correct url", function () {
                assert.equal(gene_url, "http://beta.rest.ensembl.org/lookup/id/ENSG00000139618.json?format=full")
            })
            it("Retrieves gene from ensembl ID", function (done) {
                rest.call({
                    url: gene_url,
                    success: function (resp) {
                        assert.isObject(resp);
                        assert.property(resp, "id");
                        assert.equal(resp.id, "ENSG00000139618");
                        assert.property(resp, "display_name");
                        assert.equal(resp.display_name, "BRCA2");
                        assert.property(resp, "species");
                        assert.equal(resp.species, "homo_sapiens");
                        assert.property(resp, "object_type");
                        assert.equal(resp.object_type, "Gene");
                        assert.property(resp, "biotype");
                        assert.equal(resp.biotype, "protein_coding");
                        assert.property(resp, "strand");
                        assert.equal(resp.strand, 1);
                        assert.property(resp, "seq_region_name");
                        assert.equal(resp.seq_region_name, 13);
                        setTimeout(done, delay);
                        // done();
                    }
                })
            })
            it("Fires the error callback on wrong url", function (done) {
                rest.call({
                    url: gene_url + "xxxxx", // wrong url
                    error: function (err) {
                        assert.isDefined(err);
                        //assert.equal(err.status, 400);
                        //assert.equal(err.readyState, 4);
                        //assert.equal(err.statusText, "Bad Request");
                        setTimeout(done, delay);
                        // done();
                    }
                });
                assert.isTrue(rest.connections() > 0);
            })
        })

        describe('Gene Homologues', function () {
            it("Has a url.homologues field", function () {
                assert.isDefined(rest.url.homologues);
            })
            var homologues_url = rest.url.homologues({
                id: "ENSG00000139618"
            });
            it("Has the correct url", function () {
                assert.equal(homologues_url, "http://beta.rest.ensembl.org/homology/id/ENSG00000139618.json?format=condensed;sequence=none;type=all");
            })
            it("Retrieves homologues", function (done) {
                rest.call({
                    url: homologues_url,
                    success: function (resp) {
                        assert.isObject(resp);
                        assert.property(resp, "data");
                        assert.isArray(resp.data);
                        assert.lengthOf(resp.data, 1);
                        assert.property(resp.data[0], "homologies");
                        assert.isArray(resp.data[0].homologies);
                        _.each(resp.data[0].homologies, function (el) {
                            assert.match(el.type, /ortholog|paralog/);
                        });
                        var ids = _.pluck(resp.data[0].homologies, "id");
                        assert.isArray(ids),
                        assert.equal(ids.length, resp.data[0].homologies.length);
                        _.each(ids, function (el) {
                            assert.isDefined(el);
                        })
                        setTimeout(done, delay);
                    }
                })
            })
        })

        describe("Ensembl Region", function () {
            it("Has a url.region field", function () {
                assert.isDefined(rest.url.region);
            })
            var region_url = rest.url.region({
                "species": "homo_sapiens",
                "chr": 13,
                "from": 32889611,
                "to": 32973805
            });
            it("Has the correct url", function () {
                assert.equal(region_url, "http://beta.rest.ensembl.org/feature/region/homo_sapiens/13:32889611-32973805.json?feature=gene");
            })
            it("Retrieves regions correctly", function (done) {
                rest.call({
                    url: region_url,
                    success: function (resp) {
                        assert.isArray(resp);
                        var ids = _.pluck(resp, 'id');
                        assert.isArray(ids);
                        assert.equal(ids.length, resp.length);
                        _.each(ids, function (el) {
                            assert.isDefined(el);
                        })
                        setTimeout(done, delay);
                        // done();
                    }
                });
            })
            it("Fires the error callback on wrong url", function (done) {
                rest.call({
                    url: region_url + "xxxxx", // wrong url
                    error: function (err) {
                        assert.isDefined(err);
                        //assert.equal(err.status, 400);
                        //assert.equal(err.readyState, 4);
                        //assert.equal(err.statusText, "Bad Request");
                        setTimeout(done, delay);
                        // done();
                    }
                });
                assert.isTrue(rest.connections() > 0);
            })
        })
    })
})
