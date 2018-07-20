import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import List from './List';
import stations from './stations.js';

class App extends Component {
  state = {
    stations,
  }

  filterMarkers = (filteredStations) => {
    let updatedStations = JSON.parse(JSON.stringify(this.state.stations));
    updatedStations.forEach( station => {
      if(filteredStations.find(st => st.id === station.id))
        station['visible'] = true;
      else
        station['visible'] = false;
    });
    this.setState({ stations: updatedStations });
  };

  render() {
    return (
      <div className="App">
        <List stations={this.state.stations} filterMarkers={this.filterMarkers} />
        <Map stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
