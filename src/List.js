import React, { Component } from 'react';
import logo from './logo.svg';

class List extends Component {

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  render() {

    const filteredStations = this.props.stations.filter(
      (station) => {
        const stationNorm = station.name.toLowerCase().replace('ō', 'o').replace('ū', 'u');
        const queryNorm = this.state.query.toLowerCase().replace('ō', 'o').replace('ū', 'u');
        return stationNorm.indexOf(queryNorm) !== -1 && stationNorm.startsWith(queryNorm);
      }
    );

    return(
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Yamanote Line Stations</h1>
        <input
              type="text"
              placeholder="Search station"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
        <ul>
          {filteredStations.map(station => <li key={station.id}>{station.name}</li>)}
        </ul>
      </section>
    );

  }
};

export default List;