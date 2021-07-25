import React from "react";

const UICardItem = (props) => {
    return (
        <div className={`ui card ${props.className}`} onClick={props.onClick}>
            <div className="content">
                {props.close ? <div className="right floated icon" onClick={props.closeOnClick}><i className="close icon"></i></div> : null}
                <div className="header">{props.title}</div>
                <div className="meta">{props.meta}</div>
            </div>
        </div>
    )
};

export default UICardItem;