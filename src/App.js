import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import List from './List';
import stations from './stations.js';

class App extends Component {
  state = {
    stations,
    infoWindow: '',
    content: {},
  };

  filterMarkers = filteredStations => {
    let updatedStations = JSON.parse(JSON.stringify(this.state.stations));
    updatedStations.forEach(station => {
      if (filteredStations.find(st => st.id === station.id))
        station['visible'] = true;
      else station['visible'] = false;
    });
    this.setState({ stations: updatedStations });
  };

  showInfo = (id, wiki) => {
    this.setState({ infoWindow: id });
    if (!this.state.content.hasOwnProperty(wiki)) {
      this.getWiki(wiki);
    }
  };

  getWiki = station => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${station}`)
      .then(r => r.json())
      .then(r => this.saveWiki(station, r.thumbnail.source, r.extract))
      .catch(e => console.error(e));
  };

  saveWiki = (station, thumb, paragraph) => {
    const content = { ...this.state.content };
    content[station] = { thumb, paragraph };
    this.setState({ content });
  };

  render() {
    return (
      <div className="App">
        <List
          stations={this.state.stations}
          filterMarkers={this.filterMarkers}
          showInfo={this.showInfo}
          infoWindow={this.state.infoWindow}
        />
        { (navigator.onLine) && (
          <MapContainer
          stations={this.state.stations}
          showInfo={this.showInfo}
          infoWindow={this.state.infoWindow}
          content={this.state.content}
        />
        )}
        {(!navigator.onLine) && (
          <h2 className="Offline-alert">Map is offline</h2>
        )}
      </div>
    );
  }
}

export default App;