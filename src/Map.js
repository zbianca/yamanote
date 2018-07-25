import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const MyGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{ lat: 35.68141812463663, lng: 139.73452655992435 }}
    defaultZoom={12}
  >
    {props.stations.map(station => (
      <Marker
        key={station.id}
        name={station.name}
        position={station.position}
        visible={station.visible}
        onClick={() => props.showInfo(station.id,station.wiki)}
      >
        {station.visible &&
          props.infoWindow === station.id && (
            <InfoWindow key={station.id}>
              <div className="Info">
                <h2 className="Info-title">{station.name}</h2>
                <img src="samehere" alt="{station.name}" />
                <p>somehow get props.content[station.wiki].paragraph after mount</p>
              </div>
            </InfoWindow>
          )}
      </Marker>
    ))}
  </GoogleMap>
));

class Map extends Component {

  render() {
    const mapWidth = window.innerWidth - 215
    return (
      <MyGoogleMap
        containerElement={<div style={{ height: '100vh', width: `${mapWidth}px` }} />}
        mapElement={<div style={{ height: '100%' }} />}
        showInfo={this.props.showInfo}
        stations={this.props.stations}
        infoWindow={this.props.infoWindow}
        content={this.props.content}
        />
    );
  }
}

export default Map;