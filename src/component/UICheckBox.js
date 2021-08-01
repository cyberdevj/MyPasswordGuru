import React from "react";

const UICheckBox = (props) => {
    return (
        <div className={`${props.className}`}>
            <div className="ui segment" onClick={props.onClick}>
                <div className={`ui checkbox`}>
                    <input type="checkbox" name={props.name} value={props.value} onChange={props.onChange} checked={props.checked} defaultChecked={props.defaultChecked} readOnly={props.readOnly} disabled={props.disabled} />
                    <label className="cursor-default">
                        <span className="text-bold">{props.label}</span>
                        <br />
                        <span className="sub header">{props.sub}</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default UICheckBox;