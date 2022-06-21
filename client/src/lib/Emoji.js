import React from 'react';

const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol.repeat(props.N ? props.N : 1)}
    </span>
);

export default Emoji;