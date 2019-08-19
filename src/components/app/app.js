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
         StarshipsPage,
         LoginPage,
         SecretPage } from '../pages';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true })
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

    const { isLoggedIn } = this.state;

    if (this.state.hasError) {
      return  <ErrorIndicator />
    }

    return(
        <ErrorBoundry>
          <SwapiServiceProvider value={this.state.swapiService}>
            <Router>
              <Header onSeviceChange={this.onServiceChange}/>

              <RandomPlanet/>
              <Switch>
              <Route path='/' 
                      render={() => <Redirect to="/star-db/" />}
                      exact/>
                <Route path='/star-db/' 
                      render={() => <Redirect to="/people/1" />}
                      exact/>
                <Route path='star-db/planets'
                      render={() => <h2>Planets</h2>}
                      exact/>
                <Route path='/star-db/people/:id?' component={PeoplePage}/>
                <Route path='/star-db/starships/:id?' component={StarshipsPage}/>
                <Route path='/star-db/planets/:id?' component={PlanetsPage}/>
                <Route path='/star-db/login'
                      render={() => {
                        return (
                          <LoginPage isLoggedIn={isLoggedIn}
                                    onLogin={this.onLogin}/>
                        );
                      }}/>
                <Route path='/star-db/secret'
                      render={() => {
                          return (
                            <SecretPage isLoggedIn={isLoggedIn}/>
                          );
                      }}/>
                <Route render = {() => <h2>Page not found</h2>}/>
              </Switch>
            </Router>
          </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};