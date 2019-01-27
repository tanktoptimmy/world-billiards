import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { map } from "ramda";

const socket = openSocket('http://localhost:8000');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSetup: {
        player1: "",
        player2: "",
        tournament: ""
      },
      action:{
        score: {
          home: 0,
          away: 0
        },
        playing: "home",
        breakScore: 0
      }
    }
    this.updateGameAttribute = this.updateGameAttribute.bind(this);
    this.addScore = this.addScore.bind(this);
    this.changePlayer = this.changePlayer.bind(this);
    this.sendGameSetup = this.sendGameSetup.bind(this)
    this.sendFoul = this.sendFoul.bind(this)
  }

  updateGameAttribute(ev)
  {
    this.setState({
      gameSetup:{
        ...this.state.gameSetup,
        [ev.target.dataset.attr]: ev.target.value
      }
    })
  }
  addScore(ev) {
    const additionalScore = parseInt(ev.target.dataset.num, 10);
    this.setState(prevState => {
      const playing = prevState.action.playing;
      const newScore = prevState.action.score[playing] + additionalScore;
      const breakScore = prevState.action.breakScore + additionalScore;
      return {
          action:{
            ...prevState.action,
            score: {
              ...prevState.action.score,
              [prevState.action.playing]: newScore
            },
            breakScore
          }
        }

    },() => {
      return socket.emit('send_scoreboard_update', this.state.action)
    })
    ev.preventDefault();
  }

  changePlayer(ev) {
    this.setState(prevState => {
      const changingPlayer = prevState.action.playing;
      const playing = changingPlayer === "home" ? "away" : "home";
      return {
          action:{
            ...prevState.action,
            playing,
            breakScore: 0
          }
        }

    },() => {
      return socket.emit('send_scoreboard_update', this.state.action)
    })
    ev.preventDefault();
  }

  sendFoul(ev) {
    this.setState(prevState => {
      const foulingPlayer = prevState.action.playing;
      const playing = foulingPlayer === "home" ? "away" : "home";
      const newScore = prevState.action.score[playing] + 2;
      return {
          action:{
            ...prevState.action,
            score: {
              ...prevState.action.score,
              [playing]: newScore
            },
            playing,
            breakScore: 0
          }
        }

    },() => {
      return socket.emit('send_scoreboard_update', this.state.action)
    })
    ev.preventDefault();
  }

  sendGameSetup(ev){
    socket.emit('send_scoreboard_update', this.state.gameSetup)
    ev.preventDefault();
  }

  createScoreButton(num){
    return <div key={num}><button className="score-btn" data-num={num} onClick={this.addScore}>{num}</button></div>
  }

  render() {
    return (
      <>
        <div className="config-area">
          <h1>WORLD BILLIARDS SCOREBOARD</h1>
          <div className="config">
            <div className="wrapper">
                <div>
                  Player 1 Name:<br />
                    <input type="text" data-attr="homePlayer" onChange={this.updateGameAttribute}>
                      {this.props.player1}
                    </input>
                </div>
                <div>
                  Player 2 Name:<br />
                  <input type="text" data-attr="awayPlayer" onChange={this.updateGameAttribute}>
                    {this.props.player2}
                  </input>
                </div>
                <div>
                  Tournament &amp; Duration/Long-Up:<br />
                  <input type="text" data-attr="tournament" onChange={this.updateGameAttribute}>
                    {this.props.tournament}
                  </input>
                </div>
            </div>

            <div className="config-btn">
                <button onClick={this.sendGameSetup}>Set Up Game</button>
            </div>
          </div>
        </div>

        <div className="wrapper ">
          <div className="score-input">
            <div className="wrapper buttons-wrapper">
              {map(num => this.createScoreButton(num), [2,3,4,5,6,7,8,9,10])}
            </div>

            <div className="wrapper buttons-wrapper">
              <div><button className="control-btn" data-attr="foul" onClick={this.sendFoul}>FOUL</button></div>
              <div><button className="control-btn" data-attr="miss" onClick={this.sendFoul}>MISS</button></div>
              <div><button className="control-btn">UNDO</button></div>
            </div>

            <div className="wrapper buttons-wrapper">
              <div><button onClick={this.changePlayer} className="change-btn">CHANGE PLAYER</button></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
