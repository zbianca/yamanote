import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer';
import List from './List';
import stations from './stations.js';

class App extends Component {
  state = {
    stations,
    infoWindow: '', // active infowindow
    content: {}, // stores fetched content
    ariaHiddenList: false,
    mapHeight: '', // 100vh => List component height
    zoom: 12, // default zoom
    center: { lat: 35.68141812463663, lng: 139.73452655992435 }, // default center
    hasError: false,
  };

  componentDidMount() {
    // More zoom for bigger screens
    if (window.innerHeight >= 980) {
      this.setState({ zoom: 13 });
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  /**
   * Sets map height to 100vh and then to <List> height
   */
  adjustMapHeight = () => {
    let mapHeight = '100vh';
    if (this.state.mapHeight === '') {
      this.setState({ mapHeight });
    }
    mapHeight = `${document.getElementById('List').clientHeight}px`;
    // TODO: Chrome is ignoring padding. Find another solution! Refactor flex layout?
    this.setState({ mapHeight });
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

  /**
   * Sets map height to 100vh and then to <List> height
   */
  showInfo = station => {
    // Google Map offers smooth transition til 3 units
    const zoom = this.state.zoom + 2;
    if (zoom < 16) {
      this.setState({ zoom });
    }
    // TODO: implement re-center on Infowindow display
    // const center = JSON.parse(JSON.stringify(station.position));
    // center.lat -= 0.6; // gives extra screen space to the infowindow
    // this.setState({ center });  RESEARCH: smooth transition?

    // set active infowindow
    this.setState({ infoWindow: station.id });
    // for usability in smaller screens
    if (window.innerWidth <= 650) {
      this.closeList();
    }
    // if content is not already on state, fetch it
    if (!this.state.content.hasOwnProperty(station.wiki)) {
      this.getWiki(station.wiki);
    }
  };

  closeInfo = () => {
    this.setState({ infoWindow: '' });
    //this.setState({ lat: 35.68141812463663, lng: 139.73452655992435 }); TODO: smooth transition?
    const zoom = this.state.zoom - 2;
    if (zoom > 11) {
      this.setState({ zoom });
    }
  };

  getWiki = station => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${station}`)
      .catch(e => {
        this.saveWiki(
          station,
          '',
          "Sorry! An error occured and we couldn't obtain the content requested. Please check your network and reload this page."
        );
        console.error(e);
      })
      .then(r => r.json())
      .then(r => this.saveWiki(station, r.thumbnail.source, r.extract));
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
    // adjust aria-hidden
    let ariaHiddenList = !this.state.ariaHiddenList;
    this.setState({ ariaHiddenList });
  };

  closeList = () => {
    let el = document.querySelector('.List-section');
    el.classList.add('closed-List');
    el = document.querySelector('.Slider');
    el.classList.add('closed-Slider');
    el = document.querySelector('.Map-section');
    el.classList.add('closed-Map');
    // adjust aria-hidden
    let ariaHiddenList = true;
    this.setState({ ariaHiddenList });
  };

  render() {
    return (
      <div className="App">
        <button className="Slider" tabIndex={0} onClick={this.toggleList}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 13 22"
            className="Arrow"
            aria-labelledby="sliderTitle"
          >
            <title id="sliderTitle">Hide/show list of stations</title>
            <path
              fill="#7caf52"
              fillRule="evenodd"
              d="M4 11l8 8c.6.5.6 1.5 0 2-.5.6-1.5.6-2 0l-9-9c-.6-.5-.6-1.5 0-2l9-9c.5-.6 1.5-.6 2 0 .6.5.6 1.5 0 2l-8 8z"
              className="Arrow-path"
            />
          </svg>
        </button>
        <List
          ariaHidden={this.state.ariaHiddenList}
          stations={this.state.stations}
          filterMarkers={this.filterMarkers}
          showInfo={this.showInfo}
          adjustMapHeight={this.adjustMapHeight}
          infoWindow={this.state.infoWindow}
        />
        {navigator.onLine &&
          !this.state.hasError && (
            <MapContainer
              stations={this.state.stations}
              mapHeight={this.state.mapHeight}
              zoom={this.state.zoom}
              center={this.state.center}
              showInfo={this.showInfo}
              closeInfo={this.closeInfo}
              infoWindow={this.state.infoWindow}
              content={this.state.content}
            />
          )}
        {!navigator.onLine && <h2 className="Offline-alert">Map is offline</h2>}
        {this.state.hasError && (
          <h2 className="Offline-alert">Ops, something went wrong!</h2>
        )}
      </div>
    );
  }
}

export default App;