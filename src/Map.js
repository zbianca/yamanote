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
        onClick={() => props.showInfo(station.id)}
      >
        {station.visible &&
          props.infoWindow === station.id && (
            <InfoWindow key={station.id}>
              <div className="Info">
              <h2>{station.name}</h2>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tamachistation-mitaentrance-westentrance-jan27-2015.jpg/320px-Tamachistation-mitaentrance-westentrance-jan27-2015.jpg"alt="{station.name}" />
              <p><b>Tokyo Station</b> is a railway station in the Chiyoda City, Tokyo, Japan. The original station is located in Chiyoda's Marunouchi business district near the Imperial Palace grounds. The newer Eastern extension is not far from the Ginza commercial district. Due to its large area covered, the station is divided into Marunouchi and Yaesu sides in its directional signage.</p>
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
        />
    );
  }
}

export default Map;