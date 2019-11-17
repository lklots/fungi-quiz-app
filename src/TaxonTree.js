import React from 'react';
import _ from 'lodash';
import { useQuery } from 'graphql-hooks';

import Grid from '@material-ui/core/Grid';

import './TaxonAvatar.css';

const GET_TAXON_TREE = `
  query {
    getTaxonTree {
      taxonId
      name
      commonName
      photoUrl
    }
  }
`;

export default function TaxonTree({ onSelected }) {

  const { loading, error, data } = useQuery(GET_TAXON_TREE);
  if (loading) return 'Loading...';

  const taxons = data.getTaxonTree.map((taxon) =>
    <Grid item>
      <TaxonAvatar onClick={()=>onSelected(taxon.taxonId)} taxon={taxon} />
    </Grid>
  );
  return (
    <Grid container direction="column" alignItems="center" spacing={5}>
      {taxons}
    </Grid>
  );
}

function TaxonAvatar({ taxon, onClick }) {
  return (
    <div class="taxon-avatar">
      <div class="taxon-avatar-frame" onClick={onClick}>
        <div class="taxon-avatar-crop">
          <img alt="" src={taxon.photoUrl} />
        </div>
      </div>
      <span>{taxon.commonName}</span>
    </div>
  );
}
