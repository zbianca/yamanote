import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import stations from './stations.js';

class App extends Component {
  state = {
    stations,
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Map stations={this.state.stations}/>
      </div>
    );
  }
}

export default App;
