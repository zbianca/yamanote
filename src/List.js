import React, { Component } from 'react';
import logo from './logo.svg';

class List extends Component {

  render() {

    return(
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Yamanote Line Stations</h1>
        <ul>
          {this.props.stations.map(station => <li key={station.id}>{station.name}</li>)}
        </ul>
      </section>
    );

  }
};

export default List;