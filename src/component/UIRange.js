import React from "react";

const UIRange = (props) => {
    return(
        <div className="ui segment grid">
            <div className="four wide column">
                <div className="ui labeled input">
                    <div className="ui label">{props.label}</div>
                    <input id={props.id} type="text" max={props.max} value={props.value} onChange={props.onChange} />
                </div>
            </div>
            <div className="twelve wide column">
                <div className="ui input pl-50 w-100">
                    <input type="range" max={props.max} value={props.value} onChange={props.onChange} />
                </div>
            </div>
        </div>
    );
};

export default UIRange;