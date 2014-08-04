#!/usr/bin/env perl

use strict;
use warnings;
use Data::Dumper;
use JSON::PP;

# use Bio::EnsEMBL::Registry;
use Bio::EnsEMBL::Compara::DBSQL::DBAdaptor;

use FindBin;
use lib $FindBin::Bin;
use CAFETreeHash;

# my $reg = "Bio::EnsEMBL::Registry";
# $reg->load_registry_from_db (
# 			     -host => '127.0.0.1',
# 			     -port => 2902,
# 			     -user => 'ensro',
# 			     -verbose => 0,
# 			     -db_version => 75
# 			    );

my $tree_id = 'ENSGT00550000074414';
my $compara_dba = Bio::EnsEMBL::Compara::DBSQL::DBAdaptor->new(-url=>'mysql://ensro@127.0.0.1:2916/lg4_ensembl_compara_75');
# my $compara_dba = $reg->get_DBAdaptor("Multi", "compara");

my $genetree_adaptor = $compara_dba->get_GeneTreeAdaptor();
my $genetree = $genetree_adaptor->fetch_by_stable_id ($tree_id);

my $cafetree_adaptor = $compara_dba->get_CAFEGeneFamilyAdaptor();
my $cafetree = $cafetree_adaptor->fetch_by_GeneTree($genetree);
$cafetree->multifurcate_tree();

my $treehash = CAFETreeHash->new();

my $hash = $treehash->convert($cafetree);
my $json = JSON::PP->new();

$json->pretty(0);
my $str = $json->encode($hash);
print "$str\n";

