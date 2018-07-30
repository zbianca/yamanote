import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import StationMarker from './Marker';

const Map = withScriptjs(
  withGoogleMap(props => {
    const zoom = props.zoom;
    const center = props.center;
    const markers = props.stations.map(station => (
      <StationMarker
        key={station.id}
        visible={station.visible}
        station={station}
        showInfo={props.showInfo}
        closeInfo={props.closeInfo}
        infoWindow={props.infoWindow}
        content={props.content}
      />
    ));

    return (
      <GoogleMap zoom={zoom} center={center}>
        {markers}
      </GoogleMap>
    );
  })
);

export default Map;