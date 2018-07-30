import React, { Component } from 'react';
import Map from './Map';

class MapContainer extends Component {
  render() {
    return (
      <Map
        stations={this.props.stations}
        zoom={this.props.zoom}
        center={this.props.center}
        showInfo={this.props.showInfo}
        closeInfo={this.props.closeInfo}
        infoWindow={this.props.infoWindow}
        content={this.props.content}
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyCmjYJxeyTbnrm0SFEGJea05tIc9LdHkS0'
        }
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={
          <div
            className="Map-section"
            role="application"
            tabIndex={0}
            style={{
              height: `${this.props.mapHeight}`,
              width: `${window.innerWidth}px`,
            }}
          />
        }
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default MapContainer;