import React from "react";

const UICardItem = (props) => {
    return (
        <div className={`ui card ${props.className}`}>
            <div className="content">
                <div className="header">{props.title}</div>
                <div className="meta">{props.meta}</div>
            </div>
        </div>
    )
};

export default UICardItem;