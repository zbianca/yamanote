import React, { Component } from 'react';
import logo from './logo.svg';

class List extends Component {
  state = {
    query: '',
    filteredStations: this.props.stations,
  };

  componentDidMount() {
    this.props.adjustMapHeight();
  }

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
      <section
        id="List"
        className="List-section"
        aria-hidden={this.props.ariaHidden}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Yamanote&nbsp;Line</h1>
        <input
          className="Search-input"
          aria-label="Search station by name"
          tabIndex={0}
          type="text"
          placeholder="Search station"
          value={this.state.query}
          onChange={event => this.updateQuery(event.target.value)}
        />
        <ul className="List-titles">
          {this.state.filteredStations.map(station => (
            <li
              className="List-item"
              key={station.id}
              tabIndex={0}
              onClick={() => this.props.showInfo(station)}
              onKeyPress={() => this.props.showInfo(station)}
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