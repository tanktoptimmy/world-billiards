import React, { Component } from "react";
import Player from "./Player";
import PlayerIndicator from "./PlayerIndicator";

class Scoreboard extends Component {

    render() {
        const { homePlayer, awayPlayer, score, breakScore, playing } = this.props;
        return (
        <div className="scoreboard-wrapper">
            <div className="wrapper">
                <PlayerIndicator playing={playing === 'home'}/>
                <div className="player-score">
                    { score.home }
                </div>
                <Player name={homePlayer}/>
                <Player name={awayPlayer} away />
                <div className="player-score player-score-right">
                    { score.away }
                </div>
                <PlayerIndicator playing={playing === 'away'}/>
            </div>

            <div className="wrapper bottom-line">
                <div className="bottom-row-spacer">&nbsp;</div>
                <div className="player-break">
                    {playing === 'home' && breakScore}
                </div>

                <div className="bottom-spacer-two"></div>
                <div className="tournament-detail">
                    tournament
                </div>
                <div className="bottom-spacer-two"></div>

                <div className="player-break text-right">
                    {playing === 'away' && breakScore}
                </div>

                <div className="bottom-row-spacer">&nbsp;</div>

            </div>

        </div>)
    }
}

Scoreboard.defaultProps = {
    players: {
        home: null,
        away: null
    },
    score: {
        home: 0,
        away: 0
    },
    breakScore: 0,
    playing: "home"
  };
export default Scoreboard;
