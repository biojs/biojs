=head1 LICENSE

Copyright [1999-2014] Wellcome Trust Sanger Institute and the EMBL-European Bioinformatics Institute

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

=cut

package CAFETreeHash;

use POSIX ();
use Moose;
use namespace::autoclean;
use Bio::EnsEMBL::Utils::Scalar qw(check_ref);

use Data::Dumper;

has 'source'          => ( isa => 'Str', is => 'rw', default => 'ensembl');
has 'type'            => ( isa => 'Str', is => 'rw', default => 'cafe tree');

sub convert {
  my ($self, $tree) = @_;

  return $self->_head_node($tree);
}

sub _head_node {
  my ($self, $tree) = @_;
  my $hash = {
    type => $self->type(),
    rooted => 1,
  };

  if($tree->can('stable_id')) {
    $hash->{id} = $tree->stable_id();
  }

  $hash->{tree} = 
    $self->_recursive_conversion($tree->root());

  return $hash;
}

sub _recursive_conversion {
  my ($self, $tree) = @_;;
  my $new_hash = $self->_convert_node($tree);
  if($tree->get_child_count()) {
    my @converted_children;
    foreach my $child (@{$tree->sorted_children()}) {
      my $converted_child = $self->_recursive_conversion($child);
      push(@converted_children, $converted_child);
    }
    $new_hash->{children} = \@converted_children;
  }
  return $new_hash;
}

sub _convert_node {
  my ($self, $node) = @_;
  my $hash;

  my $NCBITaxon_adaptor = $node->adaptor->db->get_NCBITaxonAdaptor();
  my $taxon_id   = $node->taxon_id();
  my $taxon = $NCBITaxon_adaptor->fetch_node_by_taxon_id($taxon_id);
  if ($taxon) {
    $hash->{tax} = {
		    'id' => $taxon_id + 0,
		    'scientific_name' => $taxon->scientific_name,
		    'alias_name' => $taxon->ensembl_alias_name,
		    'timetree_mya' => $taxon->get_tagvalue('ensembl timetree mya') || 0 + 0
		   }
  }

  my $node_id = $node->node_id();
  if (defined ($node_id)) {
    $hash->{id} = $node_id + 0;
  }

  my $n_members = $node->n_members();
  if (defined $n_members) {
    $hash->{n_members} = $n_members + 0;
  }

  my $pvalue = $node->pvalue();
  if ($pvalue) {
    $hash->{pvalue} = $pvalue + 0;
  }

  my $lambdas = $node->lambdas();
  if ($lambdas) {
    $hash->{lambda} = $lambdas + 0;
  }

  my $p_value_lim = $node->pvalue_lim();
  if ($p_value_lim) {
    $hash->{p_value_lim} = $p_value_lim;
  }

  my $is_node_significant = $node->is_node_significant();
  if ($is_node_significant) {
    $hash->{is_node_significant} = $is_node_significant + 0;
  }

  my $is_contraction = $node->is_contraction();
  if ($is_contraction) {
    $hash->{is_contraction} = $is_contraction + 0;
  }

  my $is_expansion = $node->is_expansion();
  if ($is_expansion) {
    $hash->{is_expansion} = $is_expansion + 0;
  }

  my $name = $node->node_name();
  if ($name) {
    $hash->{name} = $name;
  }

  return $hash;
}

__PACKAGE__->meta()->make_immutable();

1;
