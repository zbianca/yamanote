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
        <h1 className="App-title">Yamanote&nbsp;Line</h1>
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
              className="List-item"
              key={station.id}
              onClick={() => this.props.showInfo(station.id,station.wiki)}
            >
              {station.name}
            </li>
          ))}
        </ul>
        <div className="Slider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 22" className="Arrow"><path fill="#7caf52" fillRule="evenodd" d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z" className="Arrow-path"></path></svg>
        </div>
      </section>
    );
  }
}

export default List;