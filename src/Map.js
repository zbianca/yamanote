import React, { Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

class Map extends Component {

  state = {
    infoOpen: false,
    infoWindow: '',
  }

  showInfo = station => {
    this.setState({infoOpen: true, infoWindow: station});
  };

  render() {
    const infoOpen = this.state.infoOpen;
    const infoWindow = this.state.infoWindow;
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 35.69406568779301, lng: 139.7380327592773 }}
        defaultZoom={12}
      >
        {this.props.stations.map(station => (
          <Marker
            key={station.id}
            name={station.name}
            position={station.position}
            visible={station.visible}
            onClick={()=> this.showInfo(station.id)}
          >
            {station.visible && infoOpen && infoWindow === station.id && (
              <InfoWindow>
                <div>{station.name}</div>
              </InfoWindow>
            )};
          </Marker>
        ))}
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: '100vh', width: '80vw' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default Map;