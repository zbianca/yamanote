import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class StationMarker extends Component {
  render() {
    let isActive =
      this.props.station.visible &&
      this.props.infoWindow === this.props.station.id;
    return (
      <Marker
        position={this.props.station.position}
        visible={this.props.station.visible}
        onClick={() => this.props.showInfo(this.props.station)}
        animation={isActive ? 1 : 0} // bounce || no animation
      >
        {isActive && (
          <InfoWindow
            key={this.props.station.id}
            content={this.props}
            onCloseClick={this.props.closeInfo}
          >
            <div className="Info">
              <h2 className="Info-title">{this.props.station.name}</h2>
              {this.props.content[this.props.station.wiki] && (
                <React.Fragment>
                  {/* fetched content */}
                  <img
                    className="Info-image"
                    src={this.props.content[this.props.station.wiki].thumb}
                    alt={this.props.station.name}
                  />
                  <p>{this.props.content[this.props.station.wiki].paragraph}</p>
                </React.Fragment>
              )}
              <p>Read more at{' '} <a
                  href={`https://en.wikipedia.org/wiki/${this.props.station.wiki}`}
                  className="Source-link"
                >Wikipedia</a>
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default StationMarker;