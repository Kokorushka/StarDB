import React, { Component } from 'react';
import './app.css';
import Header from '../header/header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service'
import ErrorBoundry from '../error-boundry';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    hasError: false,
    swapiService: new SwapiService()
  }

  onChangeContext = () => {
    this.setState(({ swapiService }) => {
     const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
     return {
       swapiService: new Service()
     };
    });
  };

componentDidCatch() {
  this.setState({ hasError: true});
}
  render() {

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onChangeContext={this.onChangeContext}/>
              <RandomPlanet />
                <Route path="/"
                       render={() => <h2>Welcome to StarDB</h2>}
                       exact/>
                <Route path="/people" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route path="/starships" exact component={StarshipsPage} />
                <Route path="/starships/:id"
                render={({ match }) => {
                  const { id } =match.params;
                  return <StarshipDetails itemId={id}/>
                }} />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
