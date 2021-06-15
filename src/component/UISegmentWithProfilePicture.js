import React from "react";
import UISegment from "./UISegment";

const UISegmentWithProfilePicture = (props) => {
    return (
        <UISegment>
            <div className="ui items">
                <div className="item">
                    <div className="ui tiny image">
                        <img alt="ProfilePicture" src={props.src} />
                    </div>
                    <div className="content">
                        {props.children}
                    </div>
                </div>
            </div>
        </UISegment>
    );
};

export default UISegmentWithProfilePicture;