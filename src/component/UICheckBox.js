import React from "react";

const UICheckBox = (props) => {
    return (
        <div className={`${props.className}`}>
            <div className="ui segment" onClick={props.onClick}>
                <div className={`ui checkbox ${props.checked}`}>
                    <input type="checkbox" value={props.value} onChange={props.onChange} checked={props.checked} />
                    <label className="text-bold cursor-default">{props.label}</label>
                </div>
            </div>
        </div>
    );
};

export default UICheckBox;