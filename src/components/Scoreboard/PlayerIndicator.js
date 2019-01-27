import React from "react";
import PropTypes from "prop-types";
// import './scoreboard.css';

export const PlayerIndicator = ({playing}) => {
    const indicatorClass = playing ? "player-indicator player-active" : "player-indicator";
    return (
        <div className={`${indicatorClass}`}></div>
    );
}

export default PlayerIndicator;

PlayerIndicator.displayName = "PlayerIndicator";
PlayerIndicator.propTypes = {
    playing: PropTypes.bool
};
