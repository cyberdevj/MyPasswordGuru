import React from "react";

const UISegment = (props) => {
    return (
        <div className="ui segment">
            {props.children}
        </div>
    );
};

export default UISegment;