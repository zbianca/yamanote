import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import StationMarker from './Marker';

const Map = withScriptjs(
  withGoogleMap(props => {
    const markers = props.stations.map(station => (
      <StationMarker
        key={station.id}
        visible={station.visible}
        station={station}
        showInfo={props.showInfo}
        infoWindow={props.infoWindow}
        content={props.content}
      />
    ));

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 35.68141812463663, lng: 139.73452655992435 }}
      >
        {markers}
      </GoogleMap>
    );
  })
);

export default Map;