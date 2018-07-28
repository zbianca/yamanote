import React, { Component } from 'react';
import Map from './Map';

class MapContainer extends Component {
  render() {
    const mapWidth = window.innerWidth - 230;
    return (
      <Map
        stations={this.props.stations}
        showInfo={this.props.showInfo}
        infoWindow={this.props.infoWindow}
        content={this.props.content}
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE'
        }
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={
          <div className="Map-section" role="application" style={{ height: '100vh', width: `${mapWidth}px` }} />
        }
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default MapContainer;