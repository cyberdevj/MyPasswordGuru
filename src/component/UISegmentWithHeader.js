import React from "react";
import UISegment from "./UISegment";

const UISegmentWithHeader = (props) => {
    return (
        <UISegment>
            <h2 className="ui header">
                <div className="content">
                    {props.header}
                </div>
                {props.backButton ?
                <div className="content right floated cursor-pointer">
                    <i className="arrow alternate circle left outline icon" onClick={props.backOnClick}></i>
                </div> 
                : null}
            </h2>
            <div className="content">
                {props.children}
            </div>
        </UISegment>
    );  
};

export default UISegmentWithHeader;