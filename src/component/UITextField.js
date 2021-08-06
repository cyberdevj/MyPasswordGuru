import React from "react";

const UITextField = (props) => {
    return (
        <div className={`field ${props.className}`}>
            {(props.label) ? <label>{props.label}</label> : null}
            <div className="ui action input">
                <input type={props.type} name={props.name} placeholder={props.placeholder} min={props.min} max={props.max} value={props.value} defaultValue={props.defaultValue} onChange={props.onChange} onBlur={props.onBlur} readOnly={props.isReadOnly} />
                {props.children}
            </div>
        </div>
    );
};

export default UITextField;