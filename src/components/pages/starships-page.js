import React from 'react';
import Row from '../row';
import { withRouter } from 'react-router-dom';

import { StarshipList,
         StarshipDetails,
        } from '../sw-components';


const StarshipsPage = ( { history, match }) => {

    const { id } = match.params;

    return (
      <Row left={<StarshipList onItemSelected={(id) => {history.push(id)}}/>}
          right={<StarshipDetails id={id} />}
       />
    );
  }

export default withRouter(StarshipsPage);