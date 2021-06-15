import React from "react";
import UISegment from "./UISegment";

const UISegmentWithHeader = (props) => {
    return (
        <UISegment>
            <h2 className="ui header">
                <div className="content">{props.header}</div>
            </h2>
            <div className="content">
                {props.children}
            </div>
        </UISegment>
    );  
};

export default UISegmentWithHeader;