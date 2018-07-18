import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import List from './List';
import stations from './stations.js';

class App extends Component {
  state = {
    stations,
  }
  render() {
    return (
      <div className="App">
        <List stations={this.state.stations}/>
        <Map stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
