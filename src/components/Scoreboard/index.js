import React, { Component } from 'react';
import io from "socket.io-client";

import Scoreboard from "./Scoreboard";

const socket = io('http://localhost',{ transports: ['websocket'] });
class App extends Component {
  constructor(props) {
    super(props);
    socket.on('scoreboard_update', data => {
      this.setState({
        ...this.state,
        ...data
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Scoreboard {...this.state}/>
      </div>
    );
  }
}

export default App;
