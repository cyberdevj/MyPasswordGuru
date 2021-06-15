import React from "react";

const UITextField = (props) => {
    if (props.label == null) {
        return (
            <div className="field">
                <input type={props.type} name={props.name} placeholder={props.placeholder} defaultValue={props.defaultValue}/>
            </div>
        );
    }
    return (
        <div className="field">
            <label>{props.label}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} defaultValue={props.defaultValue}/>
        </div>
    );
};

export default UITextField;