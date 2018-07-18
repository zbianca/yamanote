import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

  render() {

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 35.69406568779301, lng: 139.7380327592773 } }
        defaultZoom = { 12 }
      >

        {this.props.stations.map(station => <Marker key={station.id} name={station.name} position={station.position} visible={true} />)}

      </GoogleMap>
    ));

    return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: '100vh', width: '80vw' }} /> }
          mapElement={ <div style={{ height: '100%' }} /> }
        />
      </div>
    );

  }
};

export default Map;