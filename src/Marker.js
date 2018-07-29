import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class StationMarker extends Component {
  render() {
    return (
      <Marker
        position={this.props.station.position}
        visible={this.props.station.visible}
        onClick={() => this.props.showInfo(this.props.station.id, this.props.station.wiki)}
      >
        {this.props.station.visible &&
          this.props.infoWindow === this.props.station.id && (
            <InfoWindow key={this.props.station.id} content={this.props}>
              <div className="Info">
                <h2 className="Info-title">{this.props.station.name}</h2>
                {this.props.content[this.props.station.wiki] && (
                  <React.Fragment>
                    <img
                      className="Info-image"
                      src={this.props.content[this.props.station.wiki].thumb}
                      alt={this.props.station.name}
                    />
                    <p>{this.props.content[this.props.station.wiki].paragraph}</p>
                  </React.Fragment>
                )}
                <p>Read more at <a href={`https://en.wikipedia.org/wiki/${this.props.station.wiki}`}
                    className="Source-link">Wikipedia</a>
                </p>
              </div>
            </InfoWindow>
          )}
      </Marker>
    );
  }
}

export default StationMarker;