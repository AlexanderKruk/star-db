import React from 'react';
import Row from '../row';
import { withRouter } from 'react-router-dom';

import { PersonList,
         PersonDetails,
        } from '../sw-components';
        
import ErrorBoundry from '../error-boundry';


const PeoplePage = ( { history, match }) => {

    const { id } = match.params;

    return (
      <ErrorBoundry >
      <Row left={<PersonList onItemSelected={(id) => {history.push(id)}}/>}
          right={<PersonDetails id={id} />}
       />
      </ErrorBoundry>
    );
  }

export default withRouter(PeoplePage);