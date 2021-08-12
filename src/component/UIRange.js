import React from "react";

const UIRange = (props) => {
    return(
        <div className="ui form">            
            <div className="ui segment grid">
                <div className="five wide column">
                    <div className="field">
                        <div className="ui labeled input">
                            <div className="ui label">{props.label}</div>
                            <input id={props.id} type={props.type} max={props.max} value={props.value} onChange={props.onChange} />
                        </div>
                    </div>
                </div>
                <div className="right floated nine wide column">
                    <div className="ui input w-100">
                        <input type="range" max={props.max} value={props.value} onChange={props.onChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UIRange;