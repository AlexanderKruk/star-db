import React, { Component } from 'react';

import Header from '../header';

import ErrorIndicator from '../error-indicator';

import SwapiService from '../../services/swapi-service';

import './app.css';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import RandomPlanet from '../random-planet';

import { PeoplePage,
         PlanetsPage,
         StarshipsPage } from '../pages';

import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService()
  }

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return  <ErrorIndicator />
    }

    return(
        <ErrorBoundry>
          <SwapiServiceProvider value={this.state.swapiService}>
            <HashRouter >
              <Header onSeviceChange={this.onServiceChange}/>

              <RandomPlanet/>
              <Switch>
              <Route path='/' 
                      render={() => <Redirect to="/star-db/" />}
                      exact/>
                <Route path='/star-db/' 
                      render={() => <Redirect to="/people/3" />}
                      exact/>
                <Route path='/people/:id?' component={PeoplePage}/>
                <Route path='/starships/:id?' component={StarshipsPage}/>
                <Route path='/planets/:id?' component={PlanetsPage}/>
                <Route render = {() => <h2>Page not found</h2>}/>
              </Switch>
            </HashRouter>
          </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};