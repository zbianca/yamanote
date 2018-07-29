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
    ariaHiddenList: false,
    //center:,
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
    if (window.innerWidth <= 650) {
    // for smaller screens
      this.toggleList();
    }
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

  toggleList = () => {
    let el = document.querySelector('.List-section');
    el.classList.toggle('closed-List');
    el = document.querySelector('.Slider');
    el.classList.toggle('closed-Slider');
    el = document.querySelector('.Map-section');
    el.classList.toggle('closed-Map');
    // toggle aria-hidden
    let ariaHiddenList = !this.state.ariaHiddenList;
    this.setState({ ariaHiddenList });
  };

  render() {
    return (
      <div className="App">
         <button className="Slider" onClick={this.toggleList}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 22" className="Arrow" aria-labelledby="sliderTitle" role="img">
            <title id="sliderTitle">Hide/show list of stations</title>
            <path fill="#7caf52" fillRule="evenodd" d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z" className="Arrow-path"></path>
          </svg>
        </button>
        <List
          ariaHidden={this.state.ariaHiddenList}
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