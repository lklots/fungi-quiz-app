import React from 'react';
import _ from 'lodash';
import { useQuery } from 'graphql-hooks';
import { Link } from 'react-router-dom';

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

export default function TaxonTree() {

  const { loading, error, data } = useQuery(GET_TAXON_TREE);
  if (loading) return 'Loading...';

  const taxons = data.getTaxonTree.map((taxon) =>
    <Grid item>
      <TaxonAvatar taxon={taxon} />
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
      <Link to={`/quiz/${taxon.taxonId}`}>
        <div class="taxon-avatar-frame">
          <div class="taxon-avatar-crop">
            <img alt="" src={taxon.photoUrl} />
          </div>
        </div>
      </Link>
      <span>{taxon.commonName}</span>
    </div>
  );
}
