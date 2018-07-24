import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const MyGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultCenter={{ lat: 35.69406568779301, lng: 139.7380327592773 }}
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
              <div>{station.name}</div>
            </InfoWindow>
          )};
      </Marker>
    ))}
  </GoogleMap>
));

class Map extends Component {
  render() {
    return (
      <div>
        <MyGoogleMap
          containerElement={<div style={{ height: '100vh', width: '80vw' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          showInfo={this.props.showInfo}
          stations={this.props.stations}
          infoWindow={this.props.infoWindow}
        />
      </div>
    );
  }
}

export default Map;