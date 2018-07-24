import React, { Component } from 'react';
import logo from './logo.svg';

class List extends Component {
  state = {
    query: '',
    filteredStations: this.props.stations,
  };

  updateQuery = query => {
    this.setState({ query });
    // TODO: check possibilities to filter using a regular expression
    const filteredStations = this.props.stations.filter(station => {
      const stationNorm = station.name
        .toLowerCase()
        .replace('ō', 'o')
        .replace('ū', 'u');
      const queryNorm = query
        .toLowerCase()
        .replace('ō', 'o')
        .replace('ū', 'u');
      return (
        stationNorm.indexOf(queryNorm) !== -1 &&
        stationNorm.startsWith(queryNorm)
      );
    });
    this.setState({ filteredStations });
    this.props.filterMarkers(filteredStations);
  };

  render() {
    return (
      <section className="List-section">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Yamanote Line Stations</h1>
        <input
          className="Search-input"
          type="text"
          placeholder="Search station"
          value={this.state.query}
          onChange={event => this.updateQuery(event.target.value)}
        />
        <ul className="List-titles">
          {this.state.filteredStations.map(station => (
            <li
              key={station.id}
              onClick={() => this.props.showInfo(station.id)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default List;