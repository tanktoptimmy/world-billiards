import React from "react";
import PropTypes from "prop-types";

export const Player = ({name, away}) => {
    const playerClass = away ? "player-name text-right" : "player-name";
    return (
        <div className={`${playerClass}`}>{ name }</div>
    );
}

export default Player;

Player.displayName = "Player";
Player.propTypes = {
    name: PropTypes.string,
    away: PropTypes.bool
};
